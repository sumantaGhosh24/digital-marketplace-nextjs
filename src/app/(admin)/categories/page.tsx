import Link from "next/link";

import {getAllCategories} from "@/actions/categoryActions";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import SearchBar from "@/app/_components/search-bar";

import Categories from "./_components/categories";

export const metadata = {
  title: "Manage Category",
};

interface ManageCategoriesProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const ManageCategories = async ({searchParams}: ManageCategoriesProps) => {
  const {page, query} = await searchParams;

  const categories = await getAllCategories({
    searchString: (query as string) || "",
    pageNumber: Number(page) || 1,
    pageSize: 5,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="flex justify-between">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">Manage Categories</h2>
          <p className="text-gray-600">Admin manage all categories.</p>
        </div>
        <Link
          href="/categories/create"
          className={cn(buttonVariants(), "bg-blue-700 hover:bg-blue-800")}
        >
          Create Category
        </Link>
      </div>
      <div className="mb-8">
        <SearchBar placeholder="Search categories" />
      </div>
      <Categories
        data={categories?.data}
        emptyTitle="No category found"
        emptyStateSubtext="Try again later"
        page={Number()}
        totalPages={categories?.totalPages}
      />
    </div>
  );
};

export default ManageCategories;
