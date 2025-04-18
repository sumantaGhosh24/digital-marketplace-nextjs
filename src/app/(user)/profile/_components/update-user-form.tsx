"use client";

import {useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";

import {updateUser} from "@/actions/userActions";
import {validFiles} from "@/lib/utils";
import {UserUpdateValidation} from "@/validations/user";
import {IUser} from "@/models/userModel";
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
import {Calendar} from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {usePrimaryColor} from "@/components/primary-provider";

interface File {
  status: string;
  imgUrl: string;
  message?: string;
  fileUpload: undefined;
}

interface UpdateUserFormProps {
  user: IUser;
}

const UpdateUserForm = ({user}: UpdateUserFormProps) => {
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);

  const {primaryColor} = usePrimaryColor();

  const path = usePathname();

  const form = useForm<z.infer<typeof UserUpdateValidation>>({
    resolver: zodResolver(UserUpdateValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      dob: new Date(user.dob),
      gender: user.gender,
      city: user.city,
      state: user.state,
      country: user.country,
      zip: user.zip,
      addressline: user.addressline,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserUpdateValidation>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("files", file.fileUpload!);
        URL.revokeObjectURL(file.imgUrl);
      }

      if (file) {
        await updateUser({
          id: user._id,
          name: values.name,
          username: values.username,
          formData,
          dob: values.dob,
          gender: values.gender,
          city: values.city,
          state: values.state,
          country: values.country,
          zip: values.zip,
          addressline: values.addressline,
          public_id: user.image.public_id,
          path,
        });
      } else {
        await updateUser({
          id: user._id,
          name: values.name,
          username: values.username,
          dob: values.dob,
          gender: values.gender,
          city: values.city,
          state: values.state,
          country: values.country,
          zip: values.zip,
          addressline: values.addressline,
          path,
        });
      }

      toast.success("User updated successful!");
      setFile(null);
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
      if (result?.message) return toast("something went wrong");
      setFile(result as any);
    });
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer;
    handleImageChange(data.files);
  };

  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <Form {...form}>
          <form
            className="flex flex-col justify-start gap-4"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h1 className="mb-5 text-3xl font-bold">Update User</h1>
            {user.image && (
              <Image
                src={user.image.url}
                alt={user.image.public_id}
                height={200}
                width={500}
                className="mb-5 h-[300px] w-[65%] rounded"
              />
            )}
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
                  className="cursor-pointer border-none bg-transparent outline-none file:text-blue-800"
                  onChange={(e) => handleImageChange(e.target.files)}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter user name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter user username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <FormField
                control={form.control}
                name="dob"
                render={({field}) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button className="border border-gray-500">
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-base font-semibold">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"male"}>Male</SelectItem>
                        <SelectItem value={"female"}>Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter user city"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      State
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter user state"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <FormField
                control={form.control}
                name="country"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Country
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter user country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Zip
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter user zip"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressline"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Addressline
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-black"
                        placeholder="Enter user addressline"
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
              {loading ? "Processing..." : "Update User"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
