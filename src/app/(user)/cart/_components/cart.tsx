"use state";

import {useState} from "react";
import Image from "next/image";
import {XCircle} from "lucide-react";
import toast from "react-hot-toast";

import {removeCart} from "@/actions/cartActions";
import {formatFloatingNumber} from "@/lib/utils";
import {IProduct} from "@/models/productModel";
import {Button} from "@/components/ui/button";
import {TableCell, TableRow} from "@/components/ui/table";
import {usePrimaryColor} from "@/components/primary-provider";
import DialogProvider from "@/app/_components/dialog-provider";

interface CartProps {
  product: IProduct;
  ind: number;
}

const Cart = ({product, ind}: CartProps) => {
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeCart({productId: product._id, path: "/cart"});
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{ind}</TableCell>
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
            <p className="text-lg mt-4 capitalize">{product?.title}</p>
          </div>
        </DialogProvider>
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{formatFloatingNumber(product.price as any)}</TableCell>
      <TableCell>
        <Button
          type="button"
          size="icon"
          disabled={loading}
          className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
          onClick={handleRemove}
        >
          <XCircle />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Cart;
