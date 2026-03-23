'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ComparisonModal({ sanPhamHienTai, dsLienQuan }: { sanPhamHienTai: any, dsLienQuan: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sanPhamSoSanh, setSanPhamSoSanh] = useState<any>(null);
  const [tuKhoa, setTuKhoa] = useState('');
  
  // Biến mounted để check xem đã tải trang xong chưa (Bắt buộc dùng cho Portal)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!dsLienQuan || dsLienQuan.length === 0) return null;

  const closeComparison = () => {
    setIsOpen(false);
    setSanPhamSoSanh(null);
    setTuKhoa('');
  };

  const renderList = (list: any) => {
    if (!list) {
      return <span className="text-slate-400 italic text-[10px] md:text-sm">Chưa cập nhật...</span>;
    }

    const arr = Array.isArray(list) ? list : String(list).split('\n');
    const validItems = arr.filter((item: any) => typeof item === 'string' && item.trim() !== '');

    if (validItems.length === 0) {
      return <span className="text-slate-400 italic text-[10px] md:text-sm">Chưa cập nhật...</span>;
    }

    return (
      <ul className="text-[10px] md:text-sm space-y-1 text-slate-700 mt-2 font-medium">
        {validItems.map((item: string, idx: number) => (
          <li key={idx} className="flex items-start gap-1 leading-tight md:leading-relaxed">
            <span className="text-blue-500 font-black">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  const danhSachDaLoc = dsLienQuan.filter(sp => 
    sp.ten.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  // 🔴 TUYỆT CHIÊU PORTAL: Dịch chuyển Bảng So Sánh ra ngoài cùng trang web
  const modalContent = isOpen && mounted ? createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-2 md:p-6">
      <div className="relative bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[95vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-white/20">
        
        {/* NÚT TẮT "BẤT TỬ" */}
        <button 
          onClick={closeComparison} 
          className="absolute top-3 right-3 md:top-5 md:right-5 w-10 h-10 md:w-12 md:h-12 bg-slate-100 hover:bg-rose-500 text-slate-500 hover:text-white rounded-full flex items-center justify-center font-black text-xl transition-all z-[999] shadow-md border-2 border-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center bg-slate-50/50">
          <h3 className="text-sm md:text-2xl font-black text-slate-800 flex items-center gap-2 pr-14">
            <span className="bg-blue-600 text-white p-1 md:p-2 rounded-lg text-xs md:text-base">⚖️</span> 
            SO SÁNH CHI TIẾT
          </h3>
        </div>

        {/* Nội dung */}
        <div className="p-2 md:p-8 overflow-y-auto flex-1 bg-slate-50/30">
          <div className="grid grid-cols-2 gap-2 md:gap-8 mb-20">
            
            {/* --- CỘT 1: SẢN PHẨM HIỆN TẠI --- */}
            <div className="bg-white p-3 md:p-6 rounded-2xl md:rounded-3xl border border-blue-100 shadow-sm relative">
              <span className="absolute top-0 left-0 bg-blue-600 text-white text-[8px] md:text-[10px] px-2 py-0.5 rounded-br-lg font-black">ĐANG XEM</span>
              <div className="aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2">
                {sanPhamHienTai.hinh_anh ? <img src={sanPhamHienTai.hinh_anh} alt="" className="max-h-full object-contain" /> : 'Ảnh'}
              </div>
              <h4 className="font-black text-[11px] md:text-xl text-slate-800 mb-1 line-clamp-2 leading-tight">{sanPhamHienTai.ten}</h4>
              <div className="text-yellow-400 text-[8px] md:text-base mb-4">⭐⭐⭐⭐⭐</div>
              
              <div className="space-y-4 border-t border-slate-50 pt-4">
                <div><p className="font-black text-green-600 text-[10px] md:text-base">✅ Ưu điểm</p>{renderList(sanPhamHienTai.uu_diem)}</div>
                <div><p className="font-black text-red-500 text-[10px] md:text-base">❌ Nhược điểm</p>{renderList(sanPhamHienTai.nhuoc_diem)}</div>
              </div>
            </div>

            {/* --- CỘT 2: ĐỐI THỦ --- */}
            <div className="bg-white p-3 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm relative">
              {!sanPhamSoSanh ? (
                /* UI Tìm kiếm khi chưa chọn */
                <div className="h-full flex flex-col p-1">
                  <p className="text-[10px] md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-tighter">Chọn đối thủ</p>
                  <input 
                    type="text" 
                    value={tuKhoa}
                    onChange={(e) => setTuKhoa(e.target.value)}
                    placeholder="Tìm phím..." 
                    className="w-full border-2 border-slate-100 bg-slate-50 rounded-lg py-2 px-2 text-[10px] md:text-sm outline-none focus:border-blue-500 mb-3"
                  />
                  <div className="flex-1 overflow-y-auto space-y-2 max-h-[300px] md:max-h-none scrollbar-none">
                    {danhSachDaLoc.map(sp => (
                      <button key={sp.id} onClick={() => setSanPhamSoSanh(sp)} className="w-full flex items-center gap-2 p-1.5 rounded-lg border border-slate-50 hover:border-blue-300 transition text-left">
                        <img src={sp.hinh_anh} alt="" className="w-8 h-8 md:w-12 md:h-12 object-contain bg-slate-50 rounded" />
                        <p className="text-[9px] md:text-xs font-bold text-slate-700 line-clamp-2 leading-tight">{sp.ten}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* UI Khi đã chọn được đối thủ */
                <div className="animate-fade-in">
                  <button onClick={() => {setSanPhamSoSanh(null); setTuKhoa('');}} className="absolute -top-2 -right-2 bg-slate-800 text-white text-[8px] md:text-xs font-bold px-2 py-1 rounded-lg z-10 shadow-lg hover:bg-slate-700 transition">
                    ĐỔI SP KHÁC
                  </button>
                  <div className="aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2">
                    <img src={sanPhamSoSanh.hinh_anh} alt="" className="max-h-full object-contain" />
                  </div>
                  <h4 className="font-black text-[11px] md:text-xl text-slate-800 mb-1 line-clamp-2 leading-tight">{sanPhamSoSanh.ten}</h4>
                  <div className="text-yellow-400 text-[8px] md:text-base mb-4">⭐⭐⭐⭐⭐</div>
                  <div className="space-y-4 border-t border-slate-50 pt-4">
                    <div><p className="font-black text-green-600 text-[10px] md:text-base">✅ Ưu điểm</p>{renderList(sanPhamSoSanh.uu_diem)}</div>
                    <div><p className="font-black text-red-500 text-[10px] md:text-base">❌ Nhược điểm</p>{renderList(sanPhamSoSanh.nhuoc_diem)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nút thoát Gen Z - Luôn nổi ở cuối modal */}
        <div className="p-4 md:p-8 bg-white border-t border-slate-100 shrink-0">
          <button 
            onClick={closeComparison}
            className="w-full font-black text-xs md:text-lg tracking-widest py-4 md:py-5 rounded-2xl shadow-xl transition-all
                       bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 text-white uppercase
                       hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span className="hidden md:inline group-hover:animate-bounce">💨</span>
            &lt; ĐI LỰA SẢN PHẨM KHÁC &gt;
            <span className="hidden md:inline group-hover:animate-bounce">💨</span>
          </button>
        </div>

      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 bg-white border-2 border-blue-600 text-blue-700 font-black py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
      >
        ⚖️ SO SÁNH VỚI SẢN PHẨM KHÁC
      </button>
      
      {/* Gọi cái cục Portal ra đây */}
      {modalContent}
    </>
  );
}