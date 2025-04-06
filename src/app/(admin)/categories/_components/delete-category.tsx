"use client";

import {useState} from "react";
import {Trash} from "lucide-react";
import {toast} from "react-hot-toast";

import {deleteCategory} from "@/actions/categoryActions";
import {Button} from "@/components/ui/button";
import DialogProvider from "@/app/_components/dialog-provider";

interface DeleteCategoryProps {
  id: string;
  publicId: string;
}

const DeleteCategory = ({id, publicId}: DeleteCategoryProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCategory(id, publicId);
      toast.success("Category deleted successful!");
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
      title="Delete Category"
      description="Are you sure you want to delete this category?"
    >
      <Button
        variant="destructive"
        onClick={handleDelete}
        className="bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300"
        disabled={loading}
      >
        <Trash size={24} className="mr-2" />
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </DialogProvider>
  );
};

export default DeleteCategory;
