import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "typescript interpreter",
  description: "play around with a language made with typescript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-x-hidden bg-zinc-950 text-zinc-200`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
