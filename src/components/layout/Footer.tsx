import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4">
        
        {/* Khu vực thông tin chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Cột 1: Thông tin công ty */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white tracking-wider mb-2">LC<span className="text-blue-500">KEYBOARD</span></h3>
            <p className="text-sm leading-relaxed text-slate-400">
               trang review, đánh giá độc lập các sản phẩm Bàn phím cơ, Chuột Gaming và phụ kiện công nghệ. Giúp bạn chốt deal với giá hời nhất!
            </p>
            <div className="text-sm space-y-2 pt-2 text-slate-400">
              <p>🏢 <strong className="text-slate-300">Địa chỉ:</strong> Số 123 Long Thạnh, Vĩnh Lợi,Xã Hòa Bình, Cà Mau</p>
              <p>📞 <strong className="text-slate-300">Hotline:</strong> 0876175960</p>
              <p>📧 <strong className="text-slate-300">Email:</strong> chauthaitoan15032000@gmail.com</p>
              <p>🧾 <strong className="text-slate-300">Mã số thuế:</strong> 0123456789</p>
            </div>
          </div>

          {/* Cột 2: Chính sách pháp lý (Rất quan trọng) */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">Chính Sách & Pháp Lý</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">📄 Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">🔒 Chính sách bảo mật (Privacy Policy)</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">⚖️ Khiếu nại bản quyền (DMCA)</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">🛡️ Từ chối trách nhiệm (Disclaimer)</Link></li>
            </ul>
          </div>

          {/* Cột 3: Về chúng tôi */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">Về LC Keyboard</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Giới thiệu</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Liên hệ hợp tác</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Quy trình đánh giá sản phẩm</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Cộng đồng Discord/Group</Link></li>
            </ul>
          </div>

          {/* Cột 4: Chứng nhận & Tuyên bố Affiliate */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">Chứng Nhận</h4>
            
            {/* Chỗ để gắn ảnh logo Đã thông báo Bộ Công Thương sau này */}
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg flex items-center justify-center mb-6 w-max opacity-80 hover:opacity-100 transition">
              <span className="text-xs font-bold text-red-400"></span>
              {/* Sau này anh em thay thẻ span trên bằng thẻ <img src="link_anh_BCT" /> là xong */}
            </div>

            <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-xl">
              <h5 className="text-blue-400 font-bold text-sm mb-2">Tuyên bố Affiliate (Affiliate Disclosure):</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                LC Keyboard có thể nhận được hoa hồng khi bạn click vào các liên kết mua hàng trên website này. Tuy nhiên, điều này <strong>không làm tăng giá</strong> sản phẩm bạn mua và không ảnh hưởng đến tính khách quan trong các bài review của chúng tôi.
              </p>
            </div>
          </div>

        </div>

        {/* Khu vực Bản quyền cuối cùng */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LCKEYBOARD. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition">Facebook</Link>
            <Link href="#" className="hover:text-white transition">TikTok</Link>
            <Link href="#" className="hover:text-white transition">YouTube</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}