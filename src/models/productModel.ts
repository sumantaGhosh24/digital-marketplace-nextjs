import {Schema, model, models} from "mongoose";

import {ICategory} from "./categoryModel";
import {IUser} from "./userModel";

export interface IProduct extends Document {
  _id: string;
  owner: IUser;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    public_id: string;
    blurHash: string;
  };
  asset: {
    url: string;
    public_id: string;
  };
  category: ICategory;
  price: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema(
  {
    owner: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    title: {type: String, required: true},
    description: {type: String, required: true, trim: true},
    thumbnail: {url: String, public_id: String, blurHash: String},
    asset: {url: String, public_id: String},
    category: {type: Schema.Types.ObjectId, required: true, ref: "Category"},
    price: {type: String, required: true},
  },
  {timestamps: true}
);

ProductSchema.index({title: "text", category: "text"});

const ProductModel =
  models?.Product || model<IProduct>("Product", ProductSchema);

export default ProductModel;
