import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { CartProvider } from "@/context/cart-context";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Aura",
  description: "El mejor lugar para encontrar tu próxima aventura literaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      
      <body className={cn("min-h-screen bg-contain bg-no-repeat", inter.className)}  style={{ backgroundImage: 'url(/bg.png)' }}>
      
      <CartProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConfettiProvider />
          {children}
  
        </ThemeProvider>
        </CartProvider>
        
      </body>
    </html>
  );
}
