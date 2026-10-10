import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { FC } from "react";
import { ApiProvider } from "@/shared/api";
import { Toaster } from "@/shared/shadcn/components/ui/toast";
import { cn } from "@/shared/shadcn/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Green API",
  description: "Тестовое задание для Green API",
};

const RootLayout: FC<LayoutProps<"/">> = ({ children }) => {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ApiProvider>
          {children}
          <Toaster />
        </ApiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
