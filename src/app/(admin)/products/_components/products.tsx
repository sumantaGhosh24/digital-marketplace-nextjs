"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {Eye, Pen} from "lucide-react";

import {IProduct} from "@/models/productModel";
import {usePrimaryColor} from "@/components/primary-provider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import DialogProvider from "@/app/_components/dialog-provider";
import Pagination from "@/app/_components/pagination";

import DeleteProduct from "./delete-product";

interface ProductsProps {
  data: IProduct[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number;
  totalPages: number;
  urlParamName?: string;
}

const Products = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: ProductsProps) => {
  const {primaryColor} = usePrimaryColor();

  const router = useRouter();

  const handleUpdate = (id: string) => {
    router.push(`/products/update/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of your products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product._id}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Button
                          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
                        >
                          View Owner
                        </Button>
                      }
                      title="Product Owner Details"
                    >
                      <Image
                        src={product.owner.image.url}
                        alt={product.owner.image.public_id}
                        height={200}
                        width={300}
                        className="h-[250px] w-full"
                      />
                      <h3 className="text-xl font-bold capitalize">
                        {product.owner.name}
                      </h3>
                      <h4>{product.owner.email}</h4>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={product.thumbnail.url}
                          alt={product.thumbnail.public_id}
                          placeholder="blur"
                          blurDataURL={product.thumbnail.blurHash}
                          priority
                          height={200}
                          width={300}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Product Images"
                    >
                      <Image
                        src={product.thumbnail.url}
                        alt={product.thumbnail.public_id}
                        height={200}
                        width={300}
                        className="h-[250px] w-full"
                        placeholder="blur"
                        blurDataURL={product.thumbnail.blurHash}
                        priority
                      />
                    </DialogProvider>
                  </TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={product.category.image.url}
                          alt={product.category.image.public_id}
                          height={50}
                          width={50}
                          placeholder="blur"
                          blurDataURL={product.category.image.blurHash}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Category Details"
                    >
                      <Image
                        src={product.category.image.url}
                        alt={product.category.image.public_id}
                        height={250}
                        width={300}
                        placeholder="blur"
                        blurDataURL={product.category.image.blurHash}
                        className="h-[300px] w-full rounded"
                      />
                      <h3 className="text-xl font-bold capitalize">
                        {product.category.name}
                      </h3>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Button
                      variant="default"
                      onClick={() => handleUpdate(product._id)}
                      className={`max-w-fit bg-green-700 hover:bg-green-800 disabled:bg-green-300 md:mr-4`}
                    >
                      <Pen size={24} className="mr-2" />
                      Update
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => router.push(`/product/${product._id}`)}
                      className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300 md:mr-4`}
                    >
                      <Eye size={24} className="mr-2" />
                      View
                    </Button>
                    <DeleteProduct id={product._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[14px] bg-white py-28 text-center shadow shadow-black dark:bg-black dark:shadow-white">
          <h3 className="text-xl font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Products;
