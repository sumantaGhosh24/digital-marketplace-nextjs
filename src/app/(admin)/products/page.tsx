import Link from "next/link";

import {getProducts} from "@/actions/productActions";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import SearchBar from "@/app/_components/search-bar";

import Products from "./_components/products";

export const metadata = {
  title: "Manage Products",
};

interface ManageProductProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const ManageProduct = async ({searchParams}: ManageProductProps) => {
  const {page, query} = await searchParams;

  const products = await getProducts({
    searchString: (query as string) || "",
    pageNumber: Number(page) || 1,
    pageSize: 5,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="flex justify-between">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">Manage Products</h2>
          <p className="text-gray-600">Admin manage all products.</p>
        </div>
        <Link
          href="/products/create"
          className={cn(buttonVariants(), "bg-blue-700 hover:bg-blue-800")}
        >
          Create Product
        </Link>
      </div>
      <div className="mb-8">
        <SearchBar placeholder="Search products" />
      </div>
      <Products
        data={products?.data}
        emptyTitle="No product found"
        emptyStateSubtext="Try again later"
        page={Number(page) || 1}
        totalPages={products?.totalPages}
      />
    </div>
  );
};

export default ManageProduct;
