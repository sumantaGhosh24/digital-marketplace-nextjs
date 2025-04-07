"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {createProduct} from "@/actions/productActions";
import {validAssets, validFiles} from "@/lib/utils";
import {ProductValidation} from "@/validations/product";
import {ICategory} from "@/models/categoryModel";
import {usePrimaryColor} from "@/components/primary-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";

interface CreateProductFormProps {
  categories: ICategory[];
}

interface File {
  status: string;
  imgUrl: string;
  message?: string;
  fileUpload: undefined;
}

const CreateProductForm = ({categories}: CreateProductFormProps) => {
  const [file, setFile] = useState<File | null>();
  const [file2, setFile2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const router = useRouter();

  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    setLoading(true);
    try {
      if (!file) return toast.error("Please add an image.");
      if (!file2) return toast.error("Please add an asset.");

      const formData = new FormData();
      if (file) {
        formData.append("files", file.fileUpload!);
        URL.revokeObjectURL(file.imgUrl);
      }

      const formData2 = new FormData();
      if (file2) {
        formData2.append("files", file2.fileUpload!);
      }

      await createProduct({
        title: values.title.toLowerCase(),
        description: values.description.toLowerCase(),
        category: values.category,
        price: values.price,
        formData,
        formData2,
      });

      form.reset();
      setFile(null);
      setFile2(null);

      toast.success("Successfully create a product!");

      router.push("/products");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (files: any) => {
    if (!files.length) return;
    // eslint-disable-next-line array-callback-return
    [...files].map((file) => {
      const result = validFiles(file);
      if (result?.message)
        return toast(result?.message || "something went wrong");
      setFile(result as any);
    });
  };

  const handleAssetsChange = (files: any) => {
    if (!files.length) return;
    // eslint-disable-next-line array-callback-return
    [...files].map((file) => {
      const result = validAssets(file);
      if (result?.message)
        return toast(result?.message || "something went wrong");
      setFile2(result as any);
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl font-bold">Create Product</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center rounded-full bg-black">
            <Image
              src={file?.imgUrl || "https://placehold.co/600x400.png"}
              alt="image"
              width={150}
              height={150}
              sizes="50vw"
              priority
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 text-base font-semibold text-gray-200">
            <Input
              type="file"
              accept=".png, .jpg, .jpeg"
              placeholder="Add your image"
              className="cursor-pointer border-none bg-transparent text-black outline-none file:text-primary dark:text-white"
              onChange={(e) => handleImageChange(e.target.files)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 text-base font-semibold text-gray-200">
            <Input
              type="file"
              placeholder="Add your asset"
              className="cursor-pointer border-none bg-transparent text-black outline-none file:text-primary dark:text-white"
              onChange={(e) => handleAssetsChange(e.target.files)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base font-semibold">
                  Product Title
                </FormLabel>
                <FormControl>
                  <Input
                    type="title"
                    className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                    placeholder="Enter product title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({field}) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base font-semibold">
                  Product Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category._id}
                        value={category._id}
                        className=""
                      >
                        <Image
                          src={category.image.url}
                          alt={category.image.public_id}
                          height={50}
                          width={50}
                          className="mb-2 mr-4 inline-block h-5 w-5"
                        />
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base font-semibold">
                  Product Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                    placeholder="Enter product price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className={`max-w-fit bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
        >
          {loading ? "Processing..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
