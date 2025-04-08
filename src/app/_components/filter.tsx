"use client";

import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";

import {formUrlQuery, removeKeysFromQuery} from "@/lib/utils";
import {ICategory} from "@/models/categoryModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  categories: ICategory[];
}

const Filter = ({categories}: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, {scroll: false});
  };

  return (
    <>
      <Select onValueChange={(value) => onSelectCategory(value)}>
        <SelectTrigger className="py-6 w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem value={category.name} key={category._id}>
              <Image
                src={category.image.url}
                alt={category.image.public_id}
                height={50}
                width={50}
                className="mb-2 mr-4 inline-block h-5 w-5"
              />
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default Filter;
