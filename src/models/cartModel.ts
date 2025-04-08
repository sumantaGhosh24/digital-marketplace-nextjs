import {Schema, model, models} from "mongoose";

import {IProduct} from "./productModel";
import {IUser} from "./userModel";

export interface ICart extends Document {
  _id: string;
  user: IUser;
  products: {
    product: IProduct;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    products: [
      {product: {type: Schema.Types.ObjectId, required: true, ref: "Product"}},
    ],
  },
  {timestamps: true}
);

const CartModel = models?.Cart || model<ICart>("Cart", CartSchema);

export default CartModel;
