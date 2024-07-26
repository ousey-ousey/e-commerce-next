import { Lato } from "next/font/google";
import "./globals.css";

const inter = Lato({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Home page",
  description: "description for Home page",
  icons: {
    icon: "./images/bag-shopping-solid.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
