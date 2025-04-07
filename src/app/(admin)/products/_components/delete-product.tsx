"use client";

import {useState} from "react";
import {Trash} from "lucide-react";
import {toast} from "react-hot-toast";

import {deleteProduct} from "@/actions/productActions";
import {Button} from "@/components/ui/button";
import DialogProvider from "@/app/_components/dialog-provider";

interface DeleteProductProps {
  id: string;
}

const DeleteProduct = ({id}: DeleteProductProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProduct(id);
      toast.success("Product deleted successful!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogProvider
      trigger={
        <Button
          variant="destructive"
          className="bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300"
        >
          Delete
        </Button>
      }
      title="Delete Product"
      description="Are you sure you want to delete this product?"
    >
      <Button
        variant="destructive"
        disabled={loading}
        onClick={handleDelete}
        className="max-w-fit bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300"
      >
        <Trash size={24} className="mr-2" />
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </DialogProvider>
  );
};

export default DeleteProduct;
