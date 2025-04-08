import {redirect} from "next/navigation";

import {getOrder} from "@/actions/orderActions";

import OrderDetails from "../../_components/order-details";

export const metadata = {
  title: "Order",
};

interface OrderDetailsPageProps {
  params: {id: string};
}

export default async function OrderPage({params}: OrderDetailsPageProps) {
  const {id} = await params;

  const order = await getOrder(id);

  if (!order) redirect("/");

  return (
    <>
      <OrderDetails order={order} />
    </>
  );
}
