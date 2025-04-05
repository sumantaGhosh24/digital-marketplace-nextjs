import {redirect} from "next/navigation";

import {getUser} from "@/actions/userActions";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import UserDetails from "./_components/user-details";
import UpdateUserForm from "./_components/update-user-form";

export const metadata = {
  title: "Profile",
};

const Profile = async () => {
  const user = await getUser();
  if (!user) redirect("/");

  return (
    <>
      <Tabs defaultValue="profile-details" className="w-full">
        <TabsList className="mx-10 mt-10 grid grid-cols-2">
          <TabsTrigger value="profile-details">Profile Details</TabsTrigger>
          <TabsTrigger value="update-profile">Update Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="profile-details">
          <UserDetails user={JSON.parse(JSON.stringify(user))} />
        </TabsContent>
        <TabsContent value="update-profile">
          <UpdateUserForm user={JSON.parse(JSON.stringify(user))} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Profile;
