import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Điều khoản sử dụng | LCTECH' };

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mb-8">
        <span>←</span> Quay lại Trang chủ
      </Link>
      <div className="border-b-4 border-slate-900 pb-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Điều khoản sử dụng</h1>
      </div>
      <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-medium leading-relaxed">
        <p>Bằng việc truy cập và sử dụng website LCTECH, bạn đồng ý tuân thủ các điều khoản dưới đây:</p>
        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">1. Nội dung và Bản quyền</h3>
        <p>Mọi bài viết, hình ảnh đánh giá (trừ hình ảnh do hãng cung cấp) thuộc bản quyền của LCTECH. Vui lòng không sao chép hoặc sử dụng cho mục đích thương mại khi chưa có sự đồng ý.</p>
        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">2. Tính khách quan của Review</h3>
        <p>Chúng tôi cam kết các bài đánh giá dựa trên trải nghiệm thực tế và thông số kỹ thuật rõ ràng. LCTECH không nhận tiền để viết bài sai sự thật nhằm lừa dối người tiêu dùng.</p>
        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">3. Bình luận của người dùng</h3>
        <p>Bạn hoàn toàn chịu trách nhiệm về nội dung bình luận của mình. LCTECH có quyền xóa các bình luận chứa ngôn từ đả kích, chửi thề, hoặc spam link quảng cáo mà không cần báo trước.</p>
      </div>
    </div>
  );
}