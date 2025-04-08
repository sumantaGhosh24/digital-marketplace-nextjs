import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getProduct} from "@/actions/productActions";
import {getProductReviews} from "@/actions/reviewActions";

import ProductDetails from "../_components/product-details";
import ProductReviews from "../_components/product-reviews";
import CreateReviewForm from "../_components/create-review-form";

export const metadata = {
  title: "Product Details",
};

interface ProductDetailsPageProps {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
}

const ProductDetailsPage = async ({
  params,
  searchParams,
}: ProductDetailsPageProps) => {
  const {id} = await params;
  const {page} = await searchParams;

  const product = await getProduct(id);
  if (!product) redirect("/");

  const user = await getServerUser();

  const reviews = await getProductReviews({
    pageNumber: Number(page) || 1,
    pageSize: 50,
    product: product._id,
  });

  return (
    <>
      <ProductDetails product={product} />
      <CreateReviewForm product={product} user={user} />
      <ProductReviews
        data={reviews?.data}
        emptyTitle="No review found"
        emptyStateSubtext="Try again later"
      />
    </>
  );
};

export default ProductDetailsPage;
