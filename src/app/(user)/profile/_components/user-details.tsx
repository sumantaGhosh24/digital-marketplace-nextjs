"use client";

import Image from "next/image";

import {IUser} from "@/models/userModel";
import {usePrimaryColor} from "@/components/primary-provider";
import {Badge} from "@/components/ui/badge";

interface UserDetailsProps {
  user: IUser;
}

const UserDetails = ({user}: UserDetailsProps) => {
  const {primaryColor} = usePrimaryColor();

  return (
    <div className="my-10 space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
        <Image
          src={user.image.url}
          alt={user.image.public_id}
          height={120}
          width={120}
          className="rounded-full object-cover border"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>
          {user.role === "admin" && (
            <Badge className={`mt-2 bg-${primaryColor}-700 text-white`}>
              ADMIN
            </Badge>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-3 p-4 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Mobile:</span> {user.mobileNumber}
          </p>
          <p>
            <span className="font-semibold">DOB:</span>{" "}
            {new Date(user.dob).toLocaleDateString()}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Gender:</span> {user.gender}
          </p>
        </div>
        <div className="space-y-3 p-4 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p className="capitalize">
            <span className="font-semibold">City:</span> {user.city}
          </p>
          <p className="capitalize">
            <span className="font-semibold">State:</span> {user.state}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Country:</span> {user.country}
          </p>
          <p>
            <span className="font-semibold">Zip:</span> {user.zip}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Address:</span> {user.addressline}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-8 text-sm text-gray-500 border-t pt-6">
        <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserDetails;
