import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Từ chối trách nhiệm | LCTECH' };

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mb-8">
        <span>←</span> Quay lại Trang chủ
      </Link>
      <div className="border-b-4 border-slate-900 pb-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Từ chối trách nhiệm</h1>
      </div>
      <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-medium leading-relaxed">
        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">Tuyên bố về Tiếp thị liên kết (Affiliate)</h3>
        <p>LCTECH là một trang web đánh giá độc lập. Chúng tôi có thể nhận được một khoản hoa hồng nhỏ (Affiliate Commission) khi bạn nhấp vào các liên kết dẫn đến Shopee, TikTok Shop hoặc các sàn TMĐT khác và thực hiện mua hàng.</p>
        <p className="p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-200"><strong>Lưu ý quan trọng:</strong> Việc này hoàn toàn <strong>KHÔNG</strong> làm tăng giá trị đơn hàng của bạn. Số tiền bạn thanh toán vẫn giữ nguyên như khi bạn tự mua trực tiếp.</p>
        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">Miễn trừ trách nhiệm giao dịch</h3>
        <p>Chúng tôi KHÔNG trực tiếp bán hàng, thu tiền, hay vận chuyển sản phẩm. Do đó, LCTECH từ chối mọi trách nhiệm liên quan đến:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Chất lượng sản phẩm thực tế nhận được so với mô tả của nhà bán hàng.</li>
          <li>Các vấn đề về bảo hành, đổi trả, hỏng hóc trong quá trình vận chuyển.</li>
          <li>Tranh chấp tài chính giữa người mua và sàn TMĐT/Cửa hàng.</li>
        </ul>
      </div>
    </div>
  );
}