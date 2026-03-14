import {getCategories} from "@/actions/categoryActions";

import CreateProductForm from "../_components/create-product-form";

export const metadata = {
  title: "Create Product",
};

const CreateProduct = async () => {
  const categories = await getCategories();

  return (
    <div className="container my-10 mx-auto space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
      <CreateProductForm categories={categories} />
    </div>
  );
};

export default CreateProduct;
