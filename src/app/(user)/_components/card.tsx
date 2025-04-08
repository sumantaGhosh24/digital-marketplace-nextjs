"use client";

import Image from "next/image";
import Link from "next/link";

import {Badge} from "@/components/ui/badge";
import {IProduct} from "@/models/productModel";
import {usePrimaryColor} from "@/components/primary-provider";

interface CardProps {
  product: IProduct;
}

const Card = ({product}: CardProps) => {
  const {primaryColor} = usePrimaryColor();

  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-4 shadow-md dark:bg-black shadow-black dark:shadow-white">
      <Link href={`/product/${product._id}`}>
        <Image
          src={product.thumbnail.url}
          alt="Card Image"
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL={product.thumbnail.blurHash}
          priority
          className="mb-4 h-40 w-full rounded-md object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
        >
          ₹ {product.price}
        </Badge>
        <Badge
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 line-clamp-1 uppercase text-white`}
        >
          {product.category.name}
        </Badge>
      </div>
      <Link href={`/product/${product._id}`}>
        <p className="mb-2 text-xl font-bold capitalize">{product.title}</p>
        <p className="mb-2 text-sm font-bold capitalize">
          {product.description}
        </p>
      </Link>
    </div>
  );
};

export default Card;
