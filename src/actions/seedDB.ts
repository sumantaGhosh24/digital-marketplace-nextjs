"use server";

import bcrypt from "bcryptjs";
import {faker} from "@faker-js/faker";

import connectDB from "@/lib/db";
import UserModel from "@/models/userModel";
import CategoryModel from "@/models/categoryModel";
import ProductModel from "@/models/productModel";
import ReviewModel from "@/models/reviewModel";
import OrderModel from "@/models/orderModel";

export async function seedDB() {
  try {
    connectDB();

    console.log("Database seeding started...");

    console.log("Creating admin...");
    const admin = new UserModel({
      name: "test admin",
      email: faker.internet
        .email({firstName: "test", lastName: "admin"})
        .toLowerCase(),
      username: faker.internet.username({firstName: "test", lastName: "admin"}),
      password: await bcrypt.hash("test@admin", 10),
      mobileNumber: faker.phone.number({style: "international"}),
      image: {
        public_id: "accommodation-booking/tmp-1-1753507651178_azu5rk",
        url: "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
      },
      dob: faker.date
        .past({years: 30, refDate: "2000-01-01"})
        .toISOString()
        .split("T")[0],
      gender: faker.person.sex(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zip: faker.location.zipCode(),
      addressline: faker.location.streetAddress(),
      role: "admin",
    });
    await admin.save();
    console.log("Created admin.");

    console.log("Seeding users...");
    const users = [];
    for (let i = 0; i < 5; i++) {
      const firstName = faker.person.firstName().toLowerCase();
      const lastName = faker.person.lastName().toLowerCase();
      const user = new UserModel({
        name: firstName + lastName,
        email: faker.internet.email({firstName, lastName}).toLowerCase(),
        username: faker.internet.username({firstName, lastName}),
        password: await bcrypt.hash(firstName, 10),
        mobileNumber: faker.phone.number({style: "international"}),
        image: {
          public_id: "accommodation-booking/tmp-1-1753507651178_azu5rk",
          url: "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
        },
        dob: faker.date
          .past({years: 30, refDate: "2000-01-01"})
          .toISOString()
          .split("T")[0],
        gender: faker.person.sex(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        zip: faker.location.zipCode(),
        addressline: faker.location.streetAddress(),
        role: "user",
      });
      users.push(await user.save());
    }
    console.log(`Seeded ${users.length} users.`);

    console.log("Seeding categories...");
    const categories = [];
    const categoryNames = [
      "Code",
      "PHP Snippets",
      "NodeJS Snippets",
      "UI/UX",
      "Website",
      "Backend Snippets",
    ];
    for (let i = 0; i < 10; i++) {
      const name =
        categoryNames[i] || faker.lorem.word({length: {min: 5, max: 10}});
      const category = new CategoryModel({
        name: name,
        image: {
          public_id: "accommodation-booking/tmp-1-1753507651178_azu5rk",
          url: "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
          blurHash:
            "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDggNSc+CiAgICAgIDxmaWx0ZXIgaWQ9J2InIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0nc1JHQic+CiAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMScvPgogICAgICA8L2ZpbHRlcj4KCiAgICAgIDxpbWFnZSBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSdub25lJyBmaWx0ZXI9J3VybCgjYiknIHg9JzAnIHk9JzAnIGhlaWdodD0nMTAwJScgd2lkdGg9JzEwMCUnIGhyZWY9J2RhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJBQUFBQU1DQUlBQUFEa2hhcldBQUFCd2tsRVFWUjQybVZRM1dyVVFCUStjMlltazJTTEp1dml1dFZGQkxXMDNvaDRKUWppaFY1WUJHL0VkL0VseEN0ZndXZFFuMERCbHVwYWJRdUxsTEkwcEd3M21XUTNtY3g0NGc5YjhKdGh6Z3p6bmZPZDc3QWdYa05Fem9VRFJBYU5iUmlEckRTUTdjSVNFY0NVd3NXcnR3V1JESGg2eW5CRjJLd0tJbEVlRi9jZlhILzk2bTBZaExXaGZIUUF5cFBmZHZlZWJyNFU1Y0pjdnRRWnJQZVROTy9lOUxNOC81RnNkZU03R3h2clVraFNPd01MOEZGWW5ROVgxMTQ4ZjR6SWFKbkd2UC9ROTZUVVd0TlQrUW9jRUh4ZkxlWWxYUVR0NUNUZi9ycmZqYVA1dkJJQ3FIWnlQUEdrNXlsaU8wUWtZMFJsditWRVp4aU9UNlo3Yjk0QjFBQWNXdXc4Mlh4R29hb001NjJ1ZGN1MmhBcUhMRG5zWGdtUmVkYWFJT3lNOTI4Z0YyUlZTU0Mrc1E1aGFRWDE3TUF4TEkwdEs2TXJwL01jM0lFU3JxallPT1ZIVTBUT0VNOG9JQWhyYXAxT0FNNnB5QTg4MlpZQlU5ZVFhdTRMMnovL3QzdHJiWnNnRmdwaWNmZmhvMTd4Yy92TGQ2MVA2YXVvY0hEQkgvVFlQMWQvQnVXM0NXR3Y3eGlraDVQQ01iY3lERUl6MDFHbUY1KzNkbWltVkJVWjBFbnMwV2dFQUt4MzdaNVVJWEpsVURKWE9XZWdhZExacVRuNkJQOGhYcjMxQys3anZ2alBreFZQQUFBQUFFbEZUa1N1UW1DQycvPiAKICAgIDwvc3ZnPgogIA==",
        },
      });
      categories.push(await category.save());
    }
    console.log(`Seeded ${categories.length} categories.`);

    console.log("Seeding products...");
    const products = [];
    for (let i = 0; i < 100; i++) {
      const randomCategory = faker.helpers.arrayElement(categories);

      const product = new ProductModel({
        owner: admin._id,
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        thumbnail: {
          public_id: "accommodation-booking/tmp-1-1753507651178_azu5rk",
          url: "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
          blurHash:
            "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDggNSc+CiAgICAgIDxmaWx0ZXIgaWQ9J2InIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0nc1JHQic+CiAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMScvPgogICAgICA8L2ZpbHRlcj4KCiAgICAgIDxpbWFnZSBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSdub25lJyBmaWx0ZXI9J3VybCgjYiknIHg9JzAnIHk9JzAnIGhlaWdodD0nMTAwJScgd2lkdGg9JzEwMCUnIGhyZWY9J2RhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJBQUFBQU1DQUlBQUFEa2hhcldBQUFCd2tsRVFWUjQybVZRM1dyVVFCUStjMlltazJTTEp1dml1dFZGQkxXMDNvaDRKUWppaFY1WUJHL0VkL0VseEN0ZndXZFFuMERCbHVwYWJRdUxsTEkwcEd3M21XUTNtY3g0NGc5YjhKdGh6Z3p6bmZPZDc3QWdYa05Fem9VRFJBYU5iUmlEckRTUTdjSVNFY0NVd3NXcnR3V1JESGg2eW5CRjJLd0tJbEVlRi9jZlhILzk2bTBZaExXaGZIUUF5cFBmZHZlZWJyNFU1Y0pjdnRRWnJQZVROTy9lOUxNOC81RnNkZU03R3h2clVraFNPd01MOEZGWW5ROVgxMTQ4ZjR6SWFKbkd2UC9ROTZUVVd0TlQrUW9jRUh4ZkxlWWxYUVR0NUNUZi9ycmZqYVA1dkJJQ3FIWnlQUEdrNXlsaU8wUWtZMFJsditWRVp4aU9UNlo3Yjk0QjFBQWNXdXc4Mlh4R29hb001NjJ1ZGN1MmhBcUhMRG5zWGdtUmVkYWFJT3lNOTI4Z0YyUlZTU0Mrc1E1aGFRWDE3TUF4TEkwdEs2TXJwL01jM0lFU3JxallPT1ZIVTBUT0VNOG9JQWhyYXAxT0FNNnB5QTg4MlpZQlU5ZVFhdTRMMnovL3QzdHJiWnNnRmdwaWNmZmhvMTd4Yy92TGQ2MVA2YXVvY0hEQkgvVFlQMWQvQnVXM0NXR3Y3eGlraDVQQ01iY3lERUl6MDFHbUY1KzNkbWltVkJVWjBFbnMwV2dFQUt4MzdaNVVJWEpsVURKWE9XZWdhZExacVRuNkJQOGhYcjMxQys3anZ2alBreFZQQUFBQUFFbEZUa1N1UW1DQycvPiAKICAgIDwvc3ZnPgogIA==",
        },
        asset: {
          public_id: "accommodation-booking/tmp-1-1753507651178_azu5rk",
          url: "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
        },
        category: randomCategory._id,
        price: faker.commerce.price({min: 500, max: 5000, dec: 0}),
      });
      products.push(await product.save());
    }
    console.log(`Seeded ${products.length} products.`);

    console.log("Seeding reviews...");
    const reviews = [];
    for (let i = 0; i < 300; i++) {
      const randomUser = faker.helpers.arrayElement(users);
      const randomProduct = faker.helpers.arrayElement(products);

      const review = new ReviewModel({
        user: randomUser._id,
        product: randomProduct._id,
        comment: faker.lorem.sentence(),
        rating: faker.number.int({min: 1, max: 5}),
      });
      reviews.push(await review.save());
    }
    console.log(`Seeded ${reviews.length} reviews.`);

    console.log("Seeding orders...");
    const orders = [];
    for (let i = 0; i < 150; i++) {
      const randomUser = faker.helpers.arrayElement(users);
      const orderItems = faker.helpers.arrayElements(
        products,
        faker.number.int({min: 1, max: 5})
      );

      const price = orderItems.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );

      const order = new OrderModel({
        user: randomUser._id,
        orderItems: orderItems,
        paymentResult: {
          id: faker.string.uuid(),
          status: faker.helpers.arrayElement(["paid", "pending", "failed"]),
          razorpay_order_id: faker.string.uuid(),
          razorpay_payment_id: faker.string.uuid(),
          razorpay_signature: faker.string.alphanumeric(32),
        },
        price: price,
      });
      orders.push(await order.save());
    }
    console.log(`Seeded ${orders.length} orders.`);

    console.log("Database seeding complete!");
  } catch (error: any) {
    throw new Error(`Failed to seed database: ${error.message}`);
  }
}
