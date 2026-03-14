"use client";

import Image from "next/image";

import {formatFloatingNumber} from "@/lib/utils";
import {IOrder} from "@/models/orderModel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {usePrimaryColor} from "@/components/primary-provider";
import DialogProvider from "@/app/_components/dialog-provider";

interface OrderDetailProps {
  order: IOrder;
}

const OrderDetails = ({order}: OrderDetailProps) => {
  const {primaryColor} = usePrimaryColor();

  return (
    <div className="container mx-auto my-10 space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
      <div>
        <h2 className="text-2xl font-bold mb-6">Order Items</h2>
        <div className="relative overflow-x-auto">
          <Table>
            <TableCaption>Products included in this order.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((product, ind) => (
                <TableRow key={ind}>
                  <TableCell className="font-medium">{ind + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <DialogProvider
                        trigger={
                          <Image
                            src={product.thumbnail.url}
                            alt={product.thumbnail.public_id}
                            height={60}
                            width={60}
                            className="rounded-lg cursor-pointer hover:scale-105 transition"
                            placeholder="blur"
                            blurDataURL={product.thumbnail.blurHash}
                          />
                        }
                        title="Product Preview"
                      >
                        <Image
                          src={product.thumbnail.url}
                          alt={product.thumbnail.public_id}
                          height={300}
                          width={500}
                          className="rounded-lg w-full"
                          placeholder="blur"
                          blurDataURL={product.thumbnail.blurHash}
                        />
                        <p className="mt-4 text-lg font-semibold">
                          {product.title}
                        </p>
                      </DialogProvider>
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₹{formatFloatingNumber(product.price as any)}
                  </TableCell>
                  <TableCell>
                    <Button
                      className={`flex items-center gap-2 bg-${primaryColor}-700 hover:bg-${primaryColor}-800`}
                    >
                      <a href={product.asset.url} download>
                        Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6 space-y-3">
          <h3 className="text-xl font-bold mb-3">Payment Details</h3>
          <p>
            <span className="font-semibold">Payment ID:</span>{" "}
            {order.paymentResult.id}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {order.paymentResult.status}
          </p>
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {order.paymentResult.razorpay_order_id}
          </p>
          <p>
            <span className="font-semibold">Payment Ref:</span>{" "}
            {order.paymentResult.razorpay_payment_id}
          </p>
        </div>
        <div className="border rounded-lg p-6 flex items-center gap-4">
          <Image
            src={order.user.image.url}
            alt={order.user.image.public_id}
            height={70}
            width={70}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-lg capitalize">
              {order.user.name}
            </p>
            <p className="text-gray-500">{order.user.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t pt-6">
        <h3 className="text-2xl font-bold">
          Total Price:
          <span className={`ml-2 text-${primaryColor}-500`}>
            ₹{order.price}
          </span>
        </h3>
        <div className="text-sm text-gray-500 space-y-1 mt-4 md:mt-0">
          <p>Created: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(order.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
