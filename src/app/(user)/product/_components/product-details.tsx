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
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <div className="mb-5">
          <h2 className="text-2xl font-bold capitalize">{product.title}</h2>
          <h3 className="mt-5 text-xl">{product.description}</h3>
        </div>
        <div className="mx-auto w-[90%]">
          <Image
            src={product.thumbnail.url}
            alt={product.thumbnail.public_id}
            height={200}
            width={500}
            className="h-[350px] w-full rounded"
            placeholder="blur"
            blurDataURL={product.thumbnail.blurHash}
            priority
          />
        </div>
        <h4 className="flex gap-1 items-center">
          <span className="text-xl font-bold">Price:</span>
          <span className="text-lg">{product.price}</span>
        </h4>
        <Button
          type="button"
          disabled={loading}
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
          onClick={() => addToCart()}
        >
          <ShoppingCart />
          {loading ? "Processing..." : "Add Cart"}
        </Button>
        <div className="flex gap-5">
          <div className="flex items-center gap-3 rounded border border-primary p-5">
            <Image
              src={product.owner.image.url}
              alt={product.owner.image.public_id}
              height={100}
              width={100}
              className="rounded"
            />
            <div>
              <h4 className="mb-2">Owner: </h4>
              <h4 className="mb-2 capitalize">{product.owner.name}</h4>
              <h5>{product.owner.email}</h5>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded border border-primary p-5">
            <Image
              src={product.category.image.url}
              alt={product.category.image.public_id}
              height={100}
              width={100}
              className="rounded"
            />
            <div>
              <h4 className="mb-2">Category: </h4>
              <h4>{product.category.name}</h4>
            </div>
          </div>
        </div>
        <h4>Created at: {new Date(product.createdAt).toLocaleDateString()}</h4>
        <h4>Updated at: {new Date(product.updatedAt).toLocaleDateString()}</h4>
      </div>
    </div>
  );
};

export default ProductDetail;
