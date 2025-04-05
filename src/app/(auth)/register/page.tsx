import Link from "next/link";

import RegisterForm from "../_components/register-form";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="my-20 flex min-h-screen w-full items-center justify-center">
      <div className="min-w-[60%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <RegisterForm />
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-sm text-blue-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
