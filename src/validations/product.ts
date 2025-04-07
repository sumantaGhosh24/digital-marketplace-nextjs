import {z} from "zod";

export const ProductValidation = z.object({
  title: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, {message: "Title is required"})
    .max(25, {message: "Title maximum 25 characters long"}),
  description: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, {message: "Description is required"})
    .max(100, {message: "Description maximum 100 characters long"}),
  category: z.string().min(1, {message: "Category is required"}),
  price: z.string().min(1, {message: "Price is required"}),
});
