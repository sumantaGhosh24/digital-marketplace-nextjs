"use server";

import {revalidatePath} from "next/cache";
import {SortOrder} from "mongoose";

import connectDB from "@/lib/db";
import {destroyFromCloudinary, uploadToCloudinary} from "@/lib/cloudinary";
import {dynamicBlurDataUrl} from "@/lib/utils";
import ProductModel from "@/models/productModel";
import CategoryModel from "@/models/categoryModel";
import UserModel from "@/models/userModel";

import getServerUser from "./getServerUser";

interface FetchProductsParams {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
  category?: string;
}

interface CreateProductParams {
  title: string;
  description: string;
  formData: any;
  formData2: any;
  category: string;
  price: string;
}

interface UpdateProductParams {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  formData?: any;
  public_id?: string;
  formData2?: any;
  public_id2?: string;
  path: string;
}

const getCategoryByName = async (name: any) => {
  return CategoryModel.findOne({name: {$regex: name, $options: "i"}});
};

const populateProduct = (query: any) => {
  return query
    .populate({
      path: "owner",
      model: UserModel,
      select: "_id name email image",
    })
    .populate({
      path: "category",
      model: CategoryModel,
      select: "_id name image",
    });
};

export async function getAdminProduct(id: string) {
  try {
    connectDB();

    const product = await ProductModel.findById(id)
      .populate("owner", "_id name email image")
      .populate("category", "_id name image");

    return JSON.parse(JSON.stringify(product));
  } catch (error: any) {
    throw new Error(`Failed to get product data: ${error.message}`);
  }
}

export async function getProduct(id: string) {
  try {
    connectDB();

    const product = await ProductModel.findById(id)
      .select("-asset")
      .populate("owner", "_id name email image")
      .populate("category", "_id name image");

    return JSON.parse(JSON.stringify(product));
  } catch (error: any) {
    throw new Error(`Failed to get product data: ${error.message}`);
  }
}

export async function getProducts({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  searchString = "",
  category,
}: FetchProductsParams) {
  try {
    connectDB();

    const titleCondition = searchString
      ? {title: {$regex: searchString, $options: "i"}}
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? {category: categoryCondition._id} : {},
      ],
    };
    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const productsQuery = ProductModel.find(conditions)
      .select("-asset")
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const products = await populateProduct(productsQuery);
    const productsCount = await ProductModel.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(productsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get products data: ${error.message}`);
  }
}

export async function createProduct({
  title,
  description,
  category,
  price,
  formData,
  formData2,
}: CreateProductParams) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized.");

    const files1 = formData.getAll("files");
    const [res] = await uploadToCloudinary(files1);
    const blurData = await dynamicBlurDataUrl(res?.secure_url);

    const files2 = formData2.getAll("files");
    const files2Response = await uploadToCloudinary(files2);

    const newProduct = new ProductModel({
      owner: user?._id,
      title,
      description,
      category,
      price,
      thumbnail: {
        url: res?.secure_url,
        public_id: res?.public_id,
        blurHash: blurData,
      },
      asset: {
        url: files2Response[0].secure_url,
        public_id: files2Response[0].public_id,
      },
    });

    await newProduct.save();

    revalidatePath("/products");
  } catch (error: any) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
}

export async function updateProduct({
  id,
  title,
  description,
  category,
  price,
  formData,
  public_id,
  formData2,
  public_id2,
  path,
}: UpdateProductParams) {
  try {
    connectDB();

    const product = await ProductModel.findById(id);
    if (!product) throw new Error("Product not found.");

    if (!formData && !formData2) {
      await ProductModel.findByIdAndUpdate(id, {
        title,
        description,
        category,
        price,
      });
    } else if (formData && formData2) {
      const files = formData.getAll("files");
      const files2 = formData2.getAll("files");

      if (!public_id || !public_id2) throw new Error("Image id not found!");

      const [res] = await uploadToCloudinary(files);
      const blurData = await dynamicBlurDataUrl(res?.secure_url);

      const response = await uploadToCloudinary(files2);

      await Promise.all([
        ProductModel.findByIdAndUpdate(id, {
          title,
          description,
          category,
          price,
          thumbnail: {
            url: res?.secure_url,
            public_id: res?.public_id,
            blurHash: blurData,
          },
          asset: {
            url: response[0].secure_url,
            public_id: response[0].public_id,
          },
        }),
        destroyFromCloudinary(public_id),
        destroyFromCloudinary(public_id2),
      ]);
    } else if (formData && !formData2) {
      const files = formData.getAll("files");

      if (!public_id) throw new Error("Image id not found!");

      const [res] = await uploadToCloudinary(files);
      const blurData = await dynamicBlurDataUrl(res?.secure_url);

      await Promise.all([
        ProductModel.findByIdAndUpdate(id, {
          title,
          description,
          category,
          price,
          thumbnail: {
            url: res?.secure_url,
            public_id: res?.public_id,
            blurHash: blurData,
          },
        }),
        destroyFromCloudinary(public_id),
      ]);
    } else if (!formData && formData2) {
      const files = formData2.getAll("files");
      if (!public_id2) throw new Error("Image id not found!");

      const [res] = await uploadToCloudinary(files);

      await Promise.all([
        ProductModel.findByIdAndUpdate(id, {
          title,
          description,
          category,
          price,
          asset: {
            url: res?.secure_url,
            public_id: res?.public_id,
          },
        }),
        destroyFromCloudinary(public_id2),
      ]);
    }

    revalidatePath(path);
    revalidatePath("/products");
  } catch (error: any) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

export async function deleteProduct(id: string) {
  try {
    connectDB();

    const product = await ProductModel.findById(id);
    if (!product) throw new Error("This product does not exists.");

    await destroyFromCloudinary(product.asset.public_id);
    await destroyFromCloudinary(product.thumbnail.public_id);

    await ProductModel.findByIdAndDelete(id);

    revalidatePath("/products");
  } catch (error: any) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}
