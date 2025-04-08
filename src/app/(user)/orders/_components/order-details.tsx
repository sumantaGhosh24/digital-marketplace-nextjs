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
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <div className="relative overflow-x-auto mt-10">
          <h2 className="text-2xl font-bold mb-3">Order Items: </h2>
          <Table>
            <TableCaption>A list of order items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((product, ind) => (
                <TableRow key={ind + 1}>
                  <TableCell className="font-medium">{ind + 1}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={product?.thumbnail.url}
                          alt={product?.thumbnail.public_id}
                          placeholder="blur"
                          blurDataURL={product?.thumbnail.blurHash}
                          priority
                          height={50}
                          width={50}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Product Image"
                    >
                      <div>
                        <Image
                          src={product?.thumbnail.url}
                          alt={product?.thumbnail.public_id}
                          placeholder="blur"
                          blurDataURL={product?.thumbnail.blurHash}
                          priority
                          height={200}
                          width={500}
                          className="h-[200px] w-full rounded"
                        />
                        <p className="text-lg mt-4 capitalize">
                          {product?.title}
                        </p>
                      </div>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>
                    {formatFloatingNumber(product?.price as any)}
                  </TableCell>
                  <TableCell>
                    <Button
                      className={`
                      max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300
                    `}
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
        <h2 className="text-xl font-bold">
          Payment Result:{" "}
          <span className="font-medium text-lg">
            {order.paymentResult.id} | {order.paymentResult.status} |{" "}
            {order.paymentResult.razorpay_order_id} |{" "}
            {order.paymentResult.razorpay_payment_id} |{" "}
            {order.paymentResult.razorpay_signature}
          </span>
        </h2>
        <h3 className="mt-5 text-xl font-bold">
          Price: <span className="font-medium text-lg">{order.price}</span>
        </h3>
        <div className="flex items-center gap-3 rounded border border-primary p-5 w-fit">
          <Image
            src={order.user.image.url}
            alt={order.user.image.public_id}
            height={100}
            width={100}
            className="rounded"
          />
          <div>
            <h4 className="capitalize">{order.user.name}</h4>
            <h4>{order.user.email}</h4>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="mt-5 text-xl font-bold">
            Created at:{" "}
            <span className="font-medium text-lg">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </h3>
          <h3 className="mt-5 text-xl font-bold">
            Updated at:{" "}
            <span className="font-medium text-lg">
              {new Date(order.updatedAt).toLocaleDateString()}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
