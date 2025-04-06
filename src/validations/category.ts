import {z} from "zod";

export const CategoryValidation = z.object({
  name: z
    .string()
    .min(1, {message: "Category is required"})
    .trim()
    .toLowerCase(),
});
