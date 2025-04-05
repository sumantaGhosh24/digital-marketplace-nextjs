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
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <h1 className="mb-5 text-3xl font-bold">Your Details</h1>
        <div className="mb-5">
          <h2 className="text-2xl font-bold capitalize">{user.name}</h2>
          <h3 className="mt-5 text-xl">{user.username}</h3>
        </div>
        <Image
          src={user.image.url}
          alt={user.image.public_id}
          height={300}
          width={500}
          className="h-[350px] w-full rounded"
        />
        <h4 className="font-bold">Email: {user.email}</h4>
        <h4 className="font-bold">Mobile number: {user.mobileNumber}</h4>
        <h4 className="capitalize font-bold">
          DOB: {new Date(user.dob).toLocaleDateString()}
        </h4>
        <h4 className="capitalize font-bold">Gender: {user.gender}</h4>
        <h4 className="capitalize font-bold">City: {user.city}</h4>
        <h4 className="capitalize font-bold">State: {user.state}</h4>
        <h4 className="capitalize font-bold">Country: {user.country}</h4>
        <h4 className="capitalize font-bold">Zip: {user.zip}</h4>
        <h4 className="capitalize font-bold">
          Addressline: {user.addressline}
        </h4>
        <h4 className="font-bold">
          Created at: {new Date(user.createdAt).toLocaleDateString()}
        </h4>
        <h4 className="font-bold">
          Updated at: {new Date(user.updatedAt).toLocaleDateString()}
        </h4>
        {user.role === "admin" && (
          <Badge className={`bg-${primaryColor}-700 text-white`}>ADMIN</Badge>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
