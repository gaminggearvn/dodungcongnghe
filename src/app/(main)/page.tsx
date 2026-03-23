import ProductCard from "@/components/ui/ProductCard";
import Sidebar from "@/components/layout/Sidebar";
import BannerSlider from "@/components/ui/BannerSlider";
import { supabase } from '@/lib/supabase';
import Link from 'next/link'; 

// Ép trang luôn lấy dữ liệu mới nhất (chống Caching)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // 1. KÉO TẤT CẢ DỮ LIỆU TỪ SUPABASE
  const { data: danhMuc } = await supabase.from('danh_muc').select('*').order('created_at', { ascending: true });
  const { data: hang } = await supabase.from('hang_san_xuat').select('*').order('created_at', { ascending: true });
  const { data: sanPham } = await supabase.from('san_pham').select('*').order('created_at', { ascending: false });
  const { data: banners } = await supabase.from('banners').select('*').eq('hien_thi', true).order('thu_tu', { ascending: true });

  // 2. LOGIC PHÂN LOẠI SẢN PHẨM
  // Lấy 10 con phím mới nhất để cho lên đầu
  const sanPhamMoiNhat = sanPham ? sanPham.slice(0, 10) : [];

  // Gom sản phẩm theo từng danh mục để hiển thị bên dưới
  const danhMucCoSanPham = danhMuc?.map(dm => {
    return {
      ...dm,
      san_pham_cua_dm: sanPham?.filter(sp => sp.category_slug === dm.slug) || []
    }
  }).filter(dm => dm.san_pham_cua_dm.length > 0) || [];

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-16 font-sans animate-fade-in">
      <div className="max-w-screen-2xl mx-auto px-3 md:px-6 mt-4 md:mt-10">
        
        {/* ================= KHU VỰC HERO (SIDEBAR & BANNER NẰM NGANG) ================= */}
        <div className="flex flex-row gap-3 md:gap-8 mb-10 md:mb-16">
          
          {/* CỘT TRÁI: SIDEBAR SLIM (Mobile: 100px | Desktop: 1/5) */}
          <div className="w-[100px] md:w-1/4 xl:w-1/5 shrink-0">
            {/* Truyền cả danh mục và hãng vào để làm Menu đa cấp */}
            {/* Truyền THÊM sanPhamList={sanPham || []} vào đây để Lọc Thông Minh hoạt động */}
<Sidebar danhMucList={danhMuc || []} hangList={hang || []} sanPhamList={sanPham || []} />
          </div>

          {/* CỘT PHẢI: BANNER SLIDER DYNAMIC */}
          <div className="flex-1 min-w-0">
            <BannerSlider banners={banners || []} />
            
            {/* Hiệu ứng chuyển động nhẹ (Tagline ẩn hiện trên mobile) */}
            <div className="flex md:hidden items-center justify-between mt-3 px-1 animate-pulse">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Premium Gear Hub</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                <span className="text-[9px] font-black text-blue-600 uppercase">Updating Live</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= CÁC PHÂN KHU SẢN PHẨM ================= */}
        <div className="space-y-12 md:space-y-20">
          
          {(!sanPham || sanPham.length === 0) ? (
            <div className="bg-white py-24 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
               <span className="text-6xl mb-6 block">🚚</span>
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Hàng đang trên đường về kho...</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Pháp sư Review đang chuẩn bị nội dung!</p>
            </div>
          ) : (
            <>
              {/* SECTION 1: SIÊU PHẨM MỚI NHẤT (Card VIP) */}
              {sanPhamMoiNhat.length > 0 && (
                <section className="bg-white p-5 md:p-10 rounded-[2.5rem] shadow-sm border border-blue-50 relative overflow-hidden group">
                  {/* Hiệu ứng background nhẹ nhàng */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                  
                  <div className="relative z-10 flex items-end justify-between mb-10 border-b border-slate-100 pb-5">
                    <div>
                      <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-1 block">New Arrivals</span>
                      <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
                        <span className="text-red-500 animate-bounce">⚡</span> Vừa Lên Kệ
                      </h2>
                    </div>
                    <span className="hidden md:inline-block bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                       {sanPhamMoiNhat.length} Sản phẩm mới
                    </span>
                  </div>

                  <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {sanPhamMoiNhat.map((sp: any) => (
                      <ProductCard key={sp.id} sanPham={sp} />
                    ))}
                  </div>
                </section>
              )}

              {/* SECTION 2: HIỂN THỊ THEO TỪNG DANH MỤC */}
              {danhMucCoSanPham.map((thuMuc) => (
                <section key={thuMuc.id} className="group">
                  <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform group-hover:rotate-6">
                        {thuMuc.icon || '⌨️'}
                      </div>
                      <div>
                        <h2 className="text-xl md:text-4xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">
                          {thuMuc.ten_danh_muc}
                        </h2>
                        <div className="h-1 w-1/2 bg-blue-600 mt-2 rounded-full group-hover:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                    <Link 
                      href={`/${thuMuc.slug.toLowerCase()}`} 
                      className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white border-2 border-blue-600 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all active:scale-90 shadow-sm"
                    >
                      Xem tất cả →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {thuMuc.san_pham_cua_dm.slice(0, 5).map((sp: any) => (
                      <ProductCard key={sp.id} sanPham={sp} />
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}