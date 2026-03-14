"use client";

import {useState} from "react";
import {Trash} from "lucide-react";
import toast from "react-hot-toast";

import {clearCart} from "@/actions/cartActions";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {ICart} from "@/models/cartModel";

import Cart from "./cart";

interface ManageCartProps {
  cart: ICart;
}

const ManageCart = ({cart}: ManageCartProps) => {
  const [loading, setLoading] = useState(false);

  const handleClearCart = async () => {
    setLoading(true);
    try {
      await clearCart("/cart");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 shadow-md rounded-md w-full dark:shadow-gray-400">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Cart</h1>
        {cart?.products?.length > 0 && (
          <Button
            type="button"
            disabled={loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            onClick={handleClearCart}
          >
            <Trash size={18} />
            Clear Cart
          </Button>
        )}
      </div>
      {cart && cart.products && cart.products.length > 0 ? (
        <div className="space-y-8">
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableCaption>Products currently in your cart.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70px]">#</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.products.map((product, ind) => (
                  <Cart product={product.product} ind={ind + 1} key={ind} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <p className="text-xl font-semibold">Your cart is empty</p>
          <p className="text-gray-500">
            Looks like you haven't added any products yet.
          </p>
          <Button size="lg">Browse Products</Button>
        </div>
      )}
    </section>
  );
};

export default ManageCart;
