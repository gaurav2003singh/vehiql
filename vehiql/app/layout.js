import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";




const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Vehiql",
  description: "find your dream car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header/>
        <main >
        {children}
        
        </main>
      </body>
    </html>
    </ClerkProvider >
  );
}
