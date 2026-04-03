import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Verifikasi Pertanggungjawaban Keuangan Desa",
  description: "Aplikasi verifikasi keuangan desa untuk pengadaan, pembelian, dan pembangunan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
