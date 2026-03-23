import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ĐỒ CÔNG NGHỆ - Chuyên Review & Deal Hot",
  description: "Cộng đồng review ĐỒ CÔNG NGHỆ, săn deal hot Shopee, TikTok Shop hàng ngày.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {/* Chỉ để children ở đây, không gọi Header/Footer để tránh bị nhân đôi */}
        {children}
      </body>
    </html>
  );
}