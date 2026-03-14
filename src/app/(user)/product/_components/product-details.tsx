"use client";

import {useState} from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {ShoppingCart} from "lucide-react";

import {addCart} from "@/actions/cartActions";
import {IProduct} from "@/models/productModel";
import {usePrimaryColor} from "@/components/primary-provider";
import {Button} from "@/components/ui/button";

interface ProductDetailProps {
  product: IProduct;
}

const ProductDetail = ({product}: ProductDetailProps) => {
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const addToCart = async () => {
    setLoading(true);
    try {
      await addCart({productId: product._id, path: "/cart"});

      toast.success("Product added to cart!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10 space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <Image
            src={product.thumbnail.url}
            alt={product.thumbnail.public_id}
            height={400}
            width={500}
            className="rounded-xl object-cover h-[420px] w-full"
            placeholder="blur"
            blurDataURL={product.thumbnail.blurHash}
            priority
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-3">{product.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-bold text-${primaryColor}-500`}>
              ₹{product.price}
            </span>
          </div>
          <Button
            type="button"
            disabled={loading}
            className={`w-fit flex items-center gap-2 text-white bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
            onClick={() => addToCart()}
          >
            <ShoppingCart size={18} />
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-3 border rounded-lg p-4">
              <Image
                src={product.owner.image.url}
                alt={product.owner.image.public_id}
                height={50}
                width={50}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p className="font-semibold capitalize">{product.owner.name}</p>
                <p className="text-sm text-gray-500">{product.owner.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border rounded-lg p-4">
              <Image
                src={product.category.image.url}
                alt={product.category.image.public_id}
                height={50}
                width={50}
                className="rounded object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{product.category.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 border-t"></div>
      <div className="flex justify-between text-sm text-gray-500">
        <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
