import type { Metadata } from "next";
import "./globals.css";

// 1. PHẦN SEO (Thẻ Meta để Share Facebook/Zalo)
export const metadata: Metadata = {
  title: "LC KEYBOARD | Đánh giá Bàn phím cơ & Chuột Gaming",
  description: "Trang review, đánh giá độc lập các sản phẩm Bàn phím cơ, Chuột Gaming và phụ kiện công nghệ. Giúp bạn chốt deal với giá hời nhất!",
  keywords: ["bàn phím cơ", "chuột gaming", "review bàn phím", "đánh giá gear", "lc keyboard", "đồ công nghệ"],
  openGraph: {
    title: "LC KEYBOARD | Trùm Review Bàn Phím Cơ & Gaming Gear",
    description: "Khám phá ngay các bài đánh giá chi tiết, chân thực nhất trước khi xuống tiền chốt deal. Đừng mua lầm, hãy đọc LC KEYBOARD!",
    url: "https://lcgear.vercel.app", 
    siteName: "LC KEYBOARD",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "LC KEYBOARD - Đánh giá Gaming Gear",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

// 2. PHẦN KHUNG SƯỜN GỐC (Cái mà sếp lỡ tay xóa mất)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}