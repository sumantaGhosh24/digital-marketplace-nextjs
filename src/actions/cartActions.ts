"use server";

import {revalidatePath} from "next/cache";

import connectDB from "@/lib/db";
import ProductModel from "@/models/productModel";
import CartModel from "@/models/cartModel";

import getServerUser from "./getServerUser";

interface AddCartParams {
  productId: string;
  path: string;
}

interface RemoveCartParams {
  productId: string;
  path: string;
}

export async function getCart() {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    const cart = await CartModel.findOne({user: user._id}).populate(
      "products.product"
    );

    return JSON.parse(JSON.stringify(cart));
  } catch (error: any) {
    throw new Error(`Failed to get user reviews data: ${error.message}`);
  }
}

export async function addCart({productId, path}: AddCartParams) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    let cart = await CartModel.findOne({user: user._id});
    if (cart) {
      let productIndex = cart.products.findIndex(
        (b: any) => b.product == productId
      );

      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Product not found.");

      if (productIndex > -1) {
      } else {
        cart.products.push({product: product._id});
      }

      cart = await cart.save();
    } else {
      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Product not found.");

      const products = [{product: product._id}];

      await CartModel.create({
        user: user._id,
        products,
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}

export async function removeCart({productId, path}: RemoveCartParams) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    let cart = await CartModel.findOne({user: user._id});

    let productIndex = cart.products.findIndex(
      (b: any) => b.product == productId
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
    }

    cart = await cart.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}

export async function clearCart(path: string) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Please login to access this page!");

    await CartModel.findOneAndDelete({user: user._id});

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
}
