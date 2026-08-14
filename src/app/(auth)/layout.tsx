import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in - e0",
  description: "Sign in to e0.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      {children}
    </div>
  );
}
