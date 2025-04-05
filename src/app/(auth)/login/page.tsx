import Link from "next/link";

import LoginForm from "../_components/login-form";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="min-w-[60%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
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
