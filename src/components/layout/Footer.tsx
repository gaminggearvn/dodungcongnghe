import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4">
        
        {/* Khu vực thông tin chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Cột 1: Thông tin công ty */}
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-white tracking-wider mb-2">
              LC<span className="text-blue-500">KEYBOARD</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
               Trang review, đánh giá độc lập các sản phẩm Bàn phím cơ, Chuột Gaming và phụ kiện công nghệ. Giúp bạn chốt deal với giá hời nhất!
            </p>
            <div className="text-sm space-y-3 pt-4 text-slate-400 border-t border-slate-800">
              <p className="flex items-start gap-2"><span className="shrink-0">🏢</span> <span><strong className="text-slate-200">Địa chỉ:</strong> Số 123 Long Thạnh, Vĩnh Lợi, Xã Hòa Bình, Cà Mau</span></p>
              <p className="flex items-center gap-2"><span className="shrink-0">📞</span> <span><strong className="text-slate-200">Hotline:</strong> 0876175960</span></p>
              <p className="flex items-center gap-2"><span className="shrink-0">📧</span> <span><strong className="text-slate-200">Email:</strong> chauthaitoan15032000@gmail.com</span></p>
              <p className="flex items-center gap-2"><span className="shrink-0">🧾</span> <span><strong className="text-slate-200">Mã số thuế:</strong> Đang cập nhật</span></p>
            </div>
          </div>

          {/* Cột 2: Chính sách pháp lý */}
          <div>
            <h4 className="text-white font-black text-sm mb-6 uppercase tracking-widest">Chính Sách & Pháp Lý</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/dieu-khoan-su-dung" className="hover:text-blue-400 transition-colors flex items-center gap-2">📄 Điều khoản sử dụng</Link></li>
              <li><Link href="/chinh-sach-bao-mat" className="hover:text-blue-400 transition-colors flex items-center gap-2">🔒 Chính sách bảo mật</Link></li>
              <li><Link href="/khieu-nai-ban-quyen" className="hover:text-blue-400 transition-colors flex items-center gap-2">⚖️ Khiếu nại bản quyền (DMCA)</Link></li>
              <li><Link href="/tu-choi-trach-nhiem" className="hover:text-blue-400 transition-colors flex items-center gap-2">🛡️ Từ chối trách nhiệm</Link></li>
            </ul>
          </div>

          {/* Cột 3: Về chúng tôi */}
          <div>
            <h4 className="text-white font-black text-sm mb-6 uppercase tracking-widest">Về LC Keyboard</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/gioi-thieu" className="hover:text-blue-400 transition-colors flex items-center gap-2">🏢 Giới thiệu về chúng tôi</Link></li>
              <li><Link href="/lien-he" className="hover:text-blue-400 transition-colors flex items-center gap-2">🤝 Liên hệ hợp tác</Link></li>
              <li><Link href="/quy-trinh-danh-gia" className="hover:text-blue-400 transition-colors flex items-center gap-2">🎯 Quy trình đánh giá</Link></li>
              <li><a href="https://zalo.me/g/nwbaao575" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">💬 Cộng đồng Zalo/Group</a></li>
            </ul>
          </div>

          {/* Cột 4: Chứng nhận & Tuyên bố Affiliate */}
          <div>
            <h4 className="text-white font-black text-sm mb-6 uppercase tracking-widest">Chứng Nhận</h4>
            
            {/* Logo BCT Demo - Tăng độ uy tín x1000 */}
            <div className="mb-6 w-max opacity-90 hover:opacity-100 transition transform hover:scale-105">
              <Link href="#">
                <img 
                  src="https://luatminhkhue.vn/nhung-dieu-can-biet-ve-logo-bo-cong-thuong-tren-website.aspx" 
                  onError={(e) => { e.currentTarget.src = "https://i.ibb.co/vzR0X6d/bct.png" }}
                  alt="Đã thông báo Bộ Công Thương" 
                  className="h-14 object-contain"
                />
              </Link>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
              <h5 className="text-slate-300 font-bold text-xs mb-2 uppercase tracking-wider">Tuyên bố Affiliate:</h5>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                LC Keyboard có thể nhận được hoa hồng khi bạn click vào các liên kết mua hàng. Tuy nhiên, điều này <strong className="text-blue-400">không làm tăng giá</strong> sản phẩm và không ảnh hưởng đến tính khách quan trong đánh giá.
              </p>
            </div>
          </div>

        </div>

        {/* Khu vực Bản quyền */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} LCKEYBOARD. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}