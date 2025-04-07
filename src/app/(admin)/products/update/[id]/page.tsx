import {redirect} from "next/navigation";

import {getAdminProduct} from "@/actions/productActions";
import {getCategories} from "@/actions/categoryActions";

import UpdateProductForm from "../../_components/update-product-form";

export const metadata = {
  title: "Update Product",
};

interface UpdateProductProps {
  params: {id: string};
}

const UpdateProduct = async ({params}: UpdateProductProps) => {
  const {id} = await params;

  const product = await getAdminProduct(id);

  if (!product) redirect("/product");

  const categories = await getCategories();

  return (
    <div className="my-20 flex min-h-[80vh] container mx-auto items-center justify-center">
      <div className="w-full space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <UpdateProductForm
          product={JSON.parse(JSON.stringify(product))}
          categories={JSON.parse(JSON.stringify(categories))}
        />
      </div>
    </div>
  );
};

export default UpdateProduct;
