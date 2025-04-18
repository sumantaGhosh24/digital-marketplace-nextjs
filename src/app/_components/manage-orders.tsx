"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {Eye} from "lucide-react";

import {cn} from "@/lib/utils";
import {IOrder} from "@/models/orderModel";
import {Button, buttonVariants} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {usePrimaryColor} from "@/components/primary-provider";

import Pagination from "./pagination";

interface ManageOrdersProps {
  data: IOrder[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number;
  totalPages?: number;
  urlParamName?: string;
  user: any;
}

const ManageOrders = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
  user,
}: ManageOrdersProps) => {
  const {primaryColor} = usePrimaryColor();

  const router = useRouter();

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of your orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Payment Result</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>
                    <Image
                      src={order.user.image.url}
                      alt={order.user.image.public_id}
                      height={50}
                      width={50}
                      className="h-12 w-12 rounded"
                    />
                    <span className="capitalize truncate">
                      {order.user.name}
                    </span>
                    <br />
                    {user.role === "admin" && (
                      <Link
                        href={`/orders/user/${order.user._id}`}
                        className={cn(
                          buttonVariants(),
                          `max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`
                        )}
                      >
                        User Order
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    {order.paymentResult.id} | {order.paymentResult.status} |{" "}
                    {order.paymentResult.razorpay_order_id} |{" "}
                    {order.paymentResult.razorpay_payment_id} |{" "}
                    {order.paymentResult.razorpay_signature}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      onClick={() =>
                        router.push(`/orders/details/${order._id}`)
                      }
                      className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300 mb-4 md:mr-4`}
                    >
                      <Eye size={24} className="mr-2" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[14px] bg-white py-28 text-center shadow shadow-black dark:bg-black dark:shadow-white">
          <h3 className="text-xl font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default ManageOrders;
