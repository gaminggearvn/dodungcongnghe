import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Chính sách bảo mật | LCKEYBOARD' };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mb-8">
        <span>←</span> Quay lại Trang chủ
      </Link>
      <div className="border-b-4 border-slate-900 pb-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Chính sách bảo mật</h1>
        <p className="text-slate-500 font-medium mt-3">Cập nhật lần cuối: Tháng 03/2026</p>
      </div>
      <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-medium leading-relaxed">
        <p>Chào mừng bạn đến với LCKEYBOARD. Bảo vệ quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi.</p>
        
        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">1. Thu thập thông tin cá nhân</h3>
        <p className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl">
          <strong>Cam kết "Không dữ liệu":</strong> LCKEYBOARD hoạt động dưới dạng trang thông tin mở. <strong>Chúng tôi KHÔNG yêu cầu bạn tạo tài khoản, KHÔNG yêu cầu đăng nhập, và KHÔNG thu thập bất kỳ thông tin định danh cá nhân nào (như Tên, Email, Số điện thoại) khi bạn chỉ đọc bài viết.</strong>
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">2. Dữ liệu thu thập tự động (Cookies)</h3>
        <p>Giống như hầu hết các website chuyên nghiệp khác, chúng tôi sử dụng Cookies và Google Analytics để thu thập các dữ liệu ẩn danh (Ví dụ: Số lượt truy cập, bài viết được xem nhiều nhất, thiết bị sử dụng). Điều này chỉ nhằm mục đích tối ưu tốc độ tải trang và trải nghiệm người dùng.</p>

        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">3. Chuyển hướng tới bên thứ ba</h3>
        <p>Website chứa các liên kết Affiliate dẫn đến Shopee, TikTok Shop. Khi bạn bấm vào các liên kết này, mọi thông tin thanh toán, địa chỉ nhận hàng của bạn sẽ được thu thập và bảo vệ bởi chính các Sàn TMĐT đó, hoàn toàn nằm ngoài hệ thống của LCKEYBOARD.</p>
      </div>
    </div>
  );
}