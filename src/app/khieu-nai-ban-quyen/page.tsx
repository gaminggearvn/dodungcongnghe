import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Khiếu nại bản quyền (DMCA) | LCTECH' };

export default function DMCAPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mb-8">
        <span>←</span> Quay lại Trang chủ
      </Link>
      <div className="border-b-4 border-slate-900 pb-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Khiếu nại bản quyền (DMCA)</h1>
      </div>
      <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-medium leading-relaxed">
        <p>LCTECH tôn trọng quyền sở hữu trí tuệ của người khác và tuân thủ Đạo luật Bản quyền Thiên niên kỷ Kỹ thuật số (DMCA).</p>
        <h3 className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">Quy trình báo cáo vi phạm</h3>
        <p>Nếu bạn tin rằng nội dung trên website của chúng tôi vi phạm bản quyền của bạn, vui lòng gửi email cho chúng tôi theo địa chỉ <strong>chauthaitoan15032000@gmail.com</strong> với các thông tin sau:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Chữ ký điện tử hoặc chữ ký vật lý của người được ủy quyền thay mặt cho chủ sở hữu bản quyền.</li>
          <li>Đường link (URL) chính xác tới bài viết hoặc hình ảnh mà bạn cho là vi phạm trên LCTECH.</li>
          <li>Bằng chứng chứng minh bạn là chủ sở hữu hợp pháp của nội dung đó.</li>
        </ul>
        <p>Chúng tôi sẽ tiếp nhận và gỡ bỏ các nội dung vi phạm (nếu có) trong vòng 24-48 giờ làm việc.</p>
      </div>
    </div>
  );
}