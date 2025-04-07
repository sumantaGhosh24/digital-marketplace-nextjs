import {redirect} from "next/navigation";

import {getProduct} from "@/actions/productActions";

import ProductDetails from "../_components/product-details";

export const metadata = {
  title: "Product Details",
};

interface ProductDetailsPageProps {
  params: {id: string};
}

const ProductDetailsPage = async ({params}: ProductDetailsPageProps) => {
  const {id} = await params;

  const product = await getProduct(id);
  if (!product) redirect("/");

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
};

export default ProductDetailsPage;
