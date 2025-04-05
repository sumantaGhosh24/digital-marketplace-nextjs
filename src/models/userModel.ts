import {Schema, model, models} from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  mobileNumber: string;
  image: {url: string; public_id: string};
  dob: string;
  gender: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  addressline: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    mobileNumber: {type: String, required: true, trim: true},
    image: {url: String, public_id: String},
    dob: {type: String},
    gender: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    zip: {type: String},
    addressline: {type: String},
    role: {type: String, default: "user"},
  },
  {timestamps: true}
);

const UserModel = models?.User || model("User", UserSchema);

export default UserModel;
