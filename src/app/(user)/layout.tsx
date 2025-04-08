import Script from "next/script";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>{children}</div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
