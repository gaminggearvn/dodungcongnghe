'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar({ danhMucList, hangList, sanPhamList = [] }: { danhMucList: any[], hangList: any[], sanPhamList?: any[] }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<any>(null);

  // Mặc định chọn danh mục đầu tiên
  useEffect(() => {
    if (danhMucList.length > 0 && !activeCategory) {
      setActiveCategory(danhMucList[0]);
    }
  }, [danhMucList, activeCategory]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeAll = () => {
    setIsMenuOpen(false);
  };

  // ==========================================
  // BỘ LỌC THÔNG MINH (PHIÊN BẢN CHỐNG LỖI 100%)
  // ==========================================
  const hangHienThi = activeCategory 
    ? hangList.filter(h => 
        sanPhamList.some(sp => 
          sp.brand_slug?.toLowerCase() === h.slug?.toLowerCase() && 
          sp.category_slug?.toLowerCase() === activeCategory.slug?.toLowerCase()
        )
      )
    : [];

  return (
    <div className="relative font-sans" style={{ zIndex: 1000 }}>
      {/* NÚT MENU CHÍNH */}
      <div 
        className="relative"
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full md:w-[240px] bg-slate-900 text-white flex items-center justify-between px-6 py-4 rounded-2xl shadow-xl hover:bg-blue-600 transition-all duration-300 active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1 w-5">
              <span className={`h-0.5 bg-white transition-all ${isMenuOpen ? 'w-5' : 'w-3'}`}></span>
              <span className="h-0.5 bg-white w-5"></span>
              <span className={`h-0.5 bg-white transition-all ${isMenuOpen ? 'w-5' : 'w-4'}`}></span>
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-xs italic">MENU</span>
          </div>
          <span className={`text-[10px] transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {/* MEGA MENU OVERLAY */}
        <div 
          className={`
            fixed inset-0 md:absolute md:inset-auto md:top-[110%] md:left-0 
            ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-2'}
            transition-all duration-300 z-[1001]
          `}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 md:hidden" onClick={closeAll}></div>

          <div className="relative w-full h-full md:w-[750px] md:h-[450px] bg-white md:rounded-[2rem] shadow-2xl flex flex-row overflow-hidden animate-fade-in">
            
            <button 
              onClick={closeAll}
              className="md:hidden absolute top-4 right-4 w-10 h-10 bg-slate-100/80 rounded-full flex items-center justify-center font-black text-slate-800 z-10 shadow-sm"
            >
              ✕
            </button>

            {/* CỘT TRÁI: DANH MỤC */}
            <div className="w-[130px] md:w-[260px] bg-slate-50 border-r border-slate-100 flex flex-col hide-scrollbar overflow-y-auto h-full">
              <div className="p-4 border-b border-slate-100 md:hidden font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">Danh mục</div>
              {danhMucList.map((dm) => (
                <div 
                  key={dm.id}
                  onMouseEnter={() => setActiveCategory(dm)}
                  onClick={() => setActiveCategory(dm)}
                  className={`
                    flex flex-col md:flex-row items-center gap-3 p-4 md:px-6 md:py-5 cursor-pointer transition-all
                    ${activeCategory?.id === dm.id ? 'bg-white text-blue-600 shadow-sm md:border-l-4 md:border-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'}
                  `}
                >
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform">{dm.icon || '⌨️'}</span>
                  <span className="text-[9px] md:text-xs font-black uppercase tracking-tighter text-center md:text-left leading-tight">
                    {dm.ten_danh_muc}
                  </span>
                </div>
              ))}
            </div>

            {/* CỘT PHẢI: HÃNG (ĐÃ LỌC THÔNG MINH) */}
            <div className="flex-1 bg-white p-5 md:p-8 overflow-y-auto hide-scrollbar h-full flex flex-col">
              {activeCategory && (
                <div className="animate-fade-in flex flex-col h-full w-full">
                  <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-3 flex justify-between items-center">
                    Thương hiệu {activeCategory.ten_danh_muc}
                    <span className="md:hidden text-lg">👉</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 content-start">
                    {hangHienThi.length > 0 ? (
                      hangHienThi.map((hang) => (
                        <Link 
                          key={hang.id}
                          href={`/${activeCategory.slug.toLowerCase()}/${hang.slug.toLowerCase()}`}
                          onClick={closeAll}
                          className="flex items-center gap-3 p-3 md:p-4 rounded-xl text-[11px] md:text-sm font-bold text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100 shadow-sm group"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 group-hover:scale-150 transition-transform"></span>
                          <span className="truncate">{hang.ten_hang}</span>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center h-full min-h-[200px] opacity-50">
                        <p className="text-5xl md:text-6xl mb-4">📦</p>
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">Danh mục đang trống</p>
                        <p className="text-[10px] text-slate-400 mt-2 text-center">Hãy đăng sản phẩm cho mục này để hãng tự động xuất hiện nhé!</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-50">
                    <Link 
                      href={`/${activeCategory.slug.toLowerCase()}`}
                      onClick={closeAll}
                      className="block w-full bg-slate-900 hover:bg-blue-600 text-white text-center py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 shadow-slate-200"
                    >
                      🚀 Xem tất cả {activeCategory.ten_danh_muc} →
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}