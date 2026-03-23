import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Liên hệ hợp tác | LCKEYBOARD' };

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 mb-8">← Quay lại Trang chủ</Link>
      <h1 className="text-3xl font-black text-slate-900 uppercase mb-8 border-b-4 border-slate-900 pb-4">Liên hệ hợp tác</h1>
      <div className="prose prose-lg text-slate-700 font-medium">
        <p>LC KEYBOARD luôn mở cửa chào đón các nhãn hàng, nhà phân phối thiết bị công nghệ (Bàn phím cơ, Chuột, Tai nghe...) muốn gửi sản phẩm đến để đội ngũ chúng tôi trải nghiệm và đánh giá thực tế.</p>
        <div className="p-8 bg-blue-50 border border-blue-100 rounded-2xl my-8">
          <ul className="space-y-4 m-0 list-none">
            <li className="flex items-center gap-3">📧 <strong>Email Booking:</strong> chauthaitoan15032000@gmail.com</li>
            <li className="flex items-center gap-3">📞 <strong>Zalo/Hotline:</strong> 0876175960 (Mr. Toàn)</li>
            <li className="flex items-center gap-3">🏢 <strong>Địa chỉ nhận hàng Review:</strong> Số 123 Long Thạnh, Vĩnh Lợi, Xã Hòa Bình, Cà Mau</li>
          </ul>
        </div>
        <p className="italic text-sm text-slate-500">*Lưu ý: Chúng tôi bảo lưu quyền đánh giá khen/chê khách quan dựa trên chất lượng thực tế của sản phẩm. Không nhận viết bài sai sự thật.</p>
      </div>
    </div>
  );
}