import {Schema, model, models} from "mongoose";

import {IUser} from "./userModel";
import {IProduct} from "./productModel";

export interface IOrder extends Document {
  _id: string;
  user: IUser;
  orderItems: IProduct[];
  paymentResult: {
    id: string;
    status: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
    paymentResult: {
      id: {type: String},
      status: {type: String},
      razorpay_order_id: {type: String},
      razorpay_payment_id: {type: String},
      razorpay_signature: {type: String},
    },
    price: {type: Number, required: true},
  },
  {timestamps: true}
);

const OrderModel = models?.Order || model<IOrder>("Order", OrderSchema);

export default OrderModel;
