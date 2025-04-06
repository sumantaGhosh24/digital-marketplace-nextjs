import {Schema, model, models} from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
    blurHash: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    image: {url: String, public_id: String, blurHash: String},
  },
  {timestamps: true}
);

const CategoryModel =
  models?.Category || model<ICategory>("Category", CategorySchema);

export default CategoryModel;
