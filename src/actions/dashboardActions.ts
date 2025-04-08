"use server";

import {ObjectId} from "mongodb";

import connectDB from "@/lib/db";
import ProductModel, {IProduct} from "@/models/productModel";
import UserModel, {IUser} from "@/models/userModel";
import OrderModel, {IOrder} from "@/models/orderModel";
import ReviewModel, {IReview} from "@/models/reviewModel";
import CategoryModel, {ICategory} from "@/models/categoryModel";

import getServerUser from "./getServerUser";

export async function getAdminDashboard() {
  try {
    connectDB();

    const user = await getServerUser();
    if (user?.role !== "admin") return {};

    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();
    const totalReviews = await ReviewModel.countDocuments();
    const totalCategories = await CategoryModel.countDocuments();

    const recentUsers: IUser[] = await UserModel.find()
      .sort({createdAt: -1})
      .limit(5);
    const recentProducts: IProduct[] = await ProductModel.find()
      .sort({createdAt: -1})
      .limit(5);
    const recentOrders: IOrder[] = await OrderModel.find()
      .sort({createdAt: -1})
      .limit(5)
      .populate("user")
      .populate("orderItems");
    const recentReviews: IReview[] = await ReviewModel.find()
      .sort({createdAt: -1})
      .limit(5)
      .populate("user")
      .populate("product");
    const recentCategories: ICategory[] = await CategoryModel.find()
      .sort({createdAt: -1})
      .limit(5);

    const totalOrderPrice = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          total: {$sum: "$price"},
        },
      },
    ]);
    const totalRevenue = totalOrderPrice[0]?.total || 0;

    const data = {
      totalUsers,
      totalProducts,
      totalOrders,
      totalReviews,
      totalCategories,
      recentUsers,
      recentProducts,
      recentOrders,
      recentReviews,
      recentCategories,
      totalRevenue: totalRevenue,
    };

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    throw new Error(`Failed to get admin dashboard data: ${error.message}`);
  }
}

export async function getDashboard() {
  try {
    connectDB();

    const userData = await getServerUser();

    const userId = userData?._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const totalOrdersByUser = await OrderModel.aggregate([
      {$match: {user: new ObjectId(userId)}},
      {$group: {_id: null, total: {$sum: 1}}},
    ]);

    const totalOrderPriceByUser = await OrderModel.aggregate([
      {$match: {user: new ObjectId(userId)}},
      {$group: {_id: null, total: {$sum: "$price"}}},
    ]);

    const totalReviewsByUser = await ReviewModel.aggregate([
      {$match: {user: new ObjectId(userId)}},
      {$group: {_id: null, total: {$sum: 1}}},
    ]);

    const data = {
      totalOrders: totalOrdersByUser[0]?.total || 0,
      totalOrderPrice: totalOrderPriceByUser[0]?.total || 0,
      totalReviews: totalReviewsByUser[0]?.total || 0,
    };

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    throw new Error(`Failed to get user dashboard data: ${error.message}`);
  }
}
