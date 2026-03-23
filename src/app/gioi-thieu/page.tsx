import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Giới thiệu | LCKEYBOARD' };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 mb-8">← Quay lại Trang chủ</Link>
      <h1 className="text-3xl font-black text-slate-900 uppercase mb-8 border-b-4 border-slate-900 pb-4">Giới thiệu LC KEYBOARD</h1>
      <div className="prose prose-lg text-slate-700 font-medium">
        <p>Thành lập từ niềm đam mê mãnh liệt với các thiết bị ngoại vi, <strong>LC KEYBOARD</strong> ra đời với sứ mệnh trở thành cuốn từ điển đáng tin cậy nhất cho cộng đồng game thủ và dân văn phòng tại Việt Nam.</p>
        <p>Chúng tôi hiểu rằng, đứng giữa hàng ngàn mẫu mã bàn phím và chuột trên thị trường, việc đưa ra quyết định mua sắm là không hề dễ dàng. Vì vậy, đội ngũ LC KEYBOARD tự tay trải nghiệm, mổ xẻ và đánh giá từng sản phẩm một cách công tâm, khen đúng chỗ, chê đúng điểm.</p>
        <p>Đừng mua lầm, hãy đọc LC KEYBOARD trước khi xuống tiền!</p>
      </div>
    </div>
  );
}