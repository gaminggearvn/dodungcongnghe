import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Quy trình đánh giá | LCKEYBOARD' };

export default function ProcessPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 mb-8">← Quay lại Trang chủ</Link>
      <h1 className="text-3xl font-black text-slate-900 uppercase mb-8 border-b-4 border-slate-900 pb-4">Quy trình đánh giá sản phẩm (Review Standard)</h1>
      <div className="prose prose-lg text-slate-700 font-medium">
        <p>Để đảm bảo mọi bài viết đều mang lại giá trị thực cho người đọc, mỗi sản phẩm lên sóng LC KEYBOARD đều phải vượt qua bài kiểm tra 4 bước khắt khe:</p>
        <ol className="space-y-4">
          <li><strong>Bước 1 - Unbox & Ngoại quan:</strong> Đánh giá mức độ hoàn thiện (Build quality), chất liệu keycap, case, và các phụ kiện đi kèm.</li>
          <li><strong>Bước 2 - Trải nghiệm gõ thực tế (Typing Test):</strong> Test âm thanh (Thock/Clack), cảm giác nhấn của Switch, và độ cân bằng của thanh Stab trong ít nhất 3 ngày làm việc liên tục.</li>
          <li><strong>Bước 3 - Phần mềm & Kết nối:</strong> Kiểm tra độ trễ (Latency) khi chơi game qua receiver 2.4Ghz, test Bluetooth và phần mềm driver (Keymap, LED RGB).</li>
          <li><strong>Bước 4 - Tổng kết & Chấm điểm:</strong> So sánh hiệu năng trên giá thành (P/P) với các đối thủ cùng phân khúc để đưa ra lời khuyên "Đáng mua hay Không đáng mua".</li>
        </ol>
      </div>
    </div>
  );
}