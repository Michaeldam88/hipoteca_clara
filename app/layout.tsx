import Nav from "@/components/nav/nav";
import "../styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hipoteca Clara",
  description: "Calcula gratis el costo total de tu hipoteca.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Nav />
        <main className="main-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
