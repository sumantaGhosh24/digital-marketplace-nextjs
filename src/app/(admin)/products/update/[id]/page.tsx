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
    <div className="container mx-auto my-10 space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
      <UpdateProductForm
        product={JSON.parse(JSON.stringify(product))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </div>
  );
};

export default UpdateProduct;
