import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FakeSalesPopup from "@/components/ui/FakeSalesPopup";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Phần Đầu Trang (Chỉ gọi 1 lần ở đây) */}
      <Header />
      
      {/* 2. Phần Ruột */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-10">
        {children}
      </main>

      {/* 3. Phần Chân Trang */}
      <Footer />

      {/* 4. Popup Mua Hàng Ảo */}
      <FakeSalesPopup />
      
    </div>
  );
}