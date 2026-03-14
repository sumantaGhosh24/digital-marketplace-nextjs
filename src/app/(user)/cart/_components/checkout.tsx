"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

import {formatFloatingNumber, getSum} from "@/lib/utils";
import {ICart} from "@/models/cartModel";
import {Button} from "@/components/ui/button";
import {usePrimaryColor} from "@/components/primary-provider";
import {Form} from "@/components/ui/form";

interface CheckoutProps {
  cart: ICart;
}

const Checkout = ({cart}: CheckoutProps) => {
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const router = useRouter();

  const form = useForm();

  const calculatePrice = () => {
    let prices: any[] = [];
    for (let i = 0; i < cart.products.length; i++) {
      prices.push(cart.products[i].product.price);
    }
    let price = formatFloatingNumber(prices.reduce(getSum, 0));

    return {price};
  };

  const onSubmit = async () => {
    setLoading(true);

    try {
      let prices: any[] = [];
      for (let i = 0; i < cart.products.length; i++) {
        prices.push(cart.products[i].product.price);
      }
      let price = formatFloatingNumber(prices.reduce(getSum, 0));

      const orderItems: any[] = [];
      for (let i = 0; i < cart?.products?.length; i++) {
        orderItems.push(cart?.products[i]?.product._id);
      }

      const data = await fetch("http://localhost:3000/api/razorpay", {
        method: "POST",
        body: JSON.stringify({
          price: parseInt(price) * 100,
        }),
      });
      const order = await data.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: "Digital Marketplace",
        description: "Digital marketplace.",
        currency: order.order.currency,
        amount: order.order.amount,
        order_id: order.order.id,
        handler: async function (response: any) {
          const data = await fetch("http://localhost:3000/api/paymentverify", {
            method: "POST",
            body: JSON.stringify({
              id: order.order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderItems: orderItems,
              price,
              cartId: cart._id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const res = await data.json();
          if (res?.message == "success") {
            toast.success("Payment success");
            router.push("/orders/my");
          }
        },
      };
      // @ts-ignore
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function () {
        toast.error(
          "Payment failed. Please try again. Contact support for help"
        );
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 shadow-md rounded-md w-full dark:shadow-gray-400">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between text-lg">
              <span className="font-medium">Subtotal</span>
              <span>₹{calculatePrice().price}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-medium">Total</span>
              <span className={`text-xl font-bold text-${primaryColor}-500`}>
                ₹{calculatePrice().price}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className={`flex items-center gap-2 bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Checkout;
