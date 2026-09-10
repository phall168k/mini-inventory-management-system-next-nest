import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Mini Inventory",
  description: "Mini Inventory Management System",
};

export default function RootLayout({ 
  children 
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
