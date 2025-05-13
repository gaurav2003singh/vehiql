import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header.jsx";
import { Toaster } from "@/components/ui/sonner";

import FooterPage from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vehiql",
  description: "find your dream car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="">{children}</main>
          <Toaster richColors />
          <FooterPage />
        </body>
      </html>
    </ClerkProvider>
  );
}
