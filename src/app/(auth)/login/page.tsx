import Link from "next/link";

import LoginForm from "../_components/login-form";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="min-w-[80%] space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
        <LoginForm />
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={"/register"}
            className="text-sm text-blue-800 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
