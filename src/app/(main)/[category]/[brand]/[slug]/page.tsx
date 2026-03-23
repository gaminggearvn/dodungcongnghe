import React from 'react';
import Link from 'next/link';
import ProductCard from "@/components/ui/ProductCard";
import ComparisonModal from "@/components/review/ComparisonModal";
import ProductGallery from "@/components/ui/ProductGallery"; 
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// 1. COMPONENT: Huy hiệu tin cậy
function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-3 mt-6 border-t border-dashed border-slate-200 pt-6 relative z-10">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
        🛡️ ĐÃ KIỂM CHỨNG
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
        🔗 LINK AN TOÀN
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
        🔥 DEAL TỐT NHẤT
      </div>
    </div>
  );
}

// 2. COMPONENT: Khung Thông Số Nổi Bật
function FeaturedSpecsBox({ sp }: { sp: any }) {
  if (!sp.ts_noi_bat_1 && !sp.ts_noi_bat_2 && !sp.ts_noi_bat_3) return null;
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-2 border-yellow-200 rounded-3xl p-5 mb-8 shadow-inner relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-100/50 rounded-full"></div>
      <h3 className="text-[11px] text-yellow-700 uppercase tracking-[0.2em] font-black mb-4 flex items-center gap-2 relative z-10">
        <span className="text-base">✨</span> THÔNG SỐ ĐÁNG CHÚ Ý
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[sp.ts_noi_bat_1, sp.ts_noi_bat_2, sp.ts_noi_bat_3].map((text, i) => (
          text && (
            <div key={i} className="bg-white/80 p-3 rounded-xl border border-yellow-100 flex items-center gap-3 relative z-10">
              <span className="text-xl">{i === 0 ? '⌨️' : i === 1 ? '🌈' : '📶'}</span>
              <p className="font-bold text-gray-800 text-xs leading-tight">{text}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

// 3. TRANG CHÍNH
export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; brand: string; slug: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category?.toLowerCase() || 'danh-muc';
  const slug = resolvedParams.slug?.toLowerCase();

  const { data: sanPham } = await supabase.from('san_pham').select('*').eq('slug', slug).single();
  if (!sanPham) return notFound();

  const { data: productImages } = await supabase.from('san_pham_hinh_anh').select('*').eq('san_pham_id', sanPham.id).order('order_index', { ascending: true });
  const { data: dsLienQuan } = await supabase.from('san_pham').select('*').eq('category_slug', sanPham.category_slug).neq('id', sanPham.id).limit(5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 min-h-screen relative z-0">
      
      {/* 🔴 ĐÃ FIX BREADCRUMB CHUẨN VIP: KHÔNG CÒN BỊ LỖI LINK TRẮNG */}
      <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 overflow-hidden whitespace-nowrap relative z-10">
        <Link href="/" className="hover:text-blue-600 transition-colors">TRANG CHỦ</Link>
        <span>/</span>
        <Link href={`/${categorySlug}`} className="hover:text-blue-600 transition-colors">
          {categorySlug.replace(/-/g, ' ')}
        </Link>
        <span>/</span>
        {sanPham.brand_slug && (
          <>
            <Link href={`/${categorySlug}/${sanPham.brand_slug}`} className="hover:text-blue-600 transition-colors">
              {sanPham.brand_slug.replace(/-/g, ' ')}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-800 truncate">{sanPham.ten}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10 bg-white p-5 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden mb-12 z-[50]">
        
        {sanPham.diem >= 4.7 && (
          <div className="absolute top-8 -left-12 bg-red-600 text-white font-black py-2 px-14 transform -rotate-45 shadow-lg z-10 text-[10px] tracking-[0.2em]">
            SIÊU PHẨM
          </div>
        )}

        <div className="lg:w-1/2">
           <ProductGallery images={productImages || []} anhChinh={sanPham.hinh_anh} />
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-[1.1] tracking-tight">
            {sanPham.ten}
          </h1>
          
          <div className="flex items-center mb-8 border-b pb-6 border-slate-50">
            <div className="flex text-yellow-400 text-xl mr-3">
              {"★".repeat(Math.floor(sanPham.diem || 5))}{"☆".repeat(5 - Math.floor(sanPham.diem || 5))}
            </div>
            <span className="text-slate-500 font-bold text-sm tracking-tight">{sanPham.diem}/5 đánh giá từ chuyên gia</span>
          </div>

          <FeaturedSpecsBox sp={sanPham} />

          <div className="mt-8 mb-6 relative z-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Nơi bán uy tín nhất</h3>
            
            <div className="space-y-3">
              {sanPham.link_shopee && (
                <a 
                  href={sanPham.link_shopee} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 pr-4 bg-white border-2 border-slate-50 rounded-2xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-orange-50 rounded-xl group-hover:bg-orange-500 transition-colors p-1 shrink-0 overflow-hidden">
                      <img src="https://i.ibb.co/X7P4W8L/Shopee-logo-2022.png" alt="Shopee Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-black text-slate-700 uppercase text-sm">Shopee Mall</span>
                  </div>
                  <div className="bg-orange-500 text-white px-5 py-3 rounded-xl font-black text-xs flex items-center gap-1 group-hover:scale-105 transition-transform shadow-md shadow-orange-200">
                    ⚡ XEM GIÁ
                  </div>
                </a>
              )}

              {sanPham.link_tiktok && (
                <a 
                  href={sanPham.link_tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 pr-4 bg-white border-2 border-slate-50 rounded-2xl hover:border-slate-800 hover:shadow-lg hover:shadow-slate-800/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl group-hover:bg-slate-900 transition-colors p-1 shrink-0 overflow-hidden">
                      <img src="https://i.ibb.co/3WqP4bH/Tik-Tok-Shop-Icon-black.png" alt="TikTok Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-black text-slate-700 uppercase text-sm">TikTok Shop</span>
                  </div>
                  <div className="bg-slate-900 text-white px-5 py-3 rounded-xl font-black text-xs flex items-center gap-1 group-hover:scale-105 transition-transform shadow-md shadow-slate-200">
                    ⚡ XEM GIÁ
                  </div>
                </a>
              )}

              {!sanPham.link_shopee && !sanPham.link_tiktok && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center relative z-10">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đang cập nhật link mua hàng...</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 relative z-10">
            {/* NÚT CỘNG ĐỒNG ZALO */}
            <a href="https://zalo.me/g/nwbaao575" target="_blank" className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3.5 rounded-2xl transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm shrink-0">💬</span>
                <div>
                  <p className="font-black text-blue-900 text-xs leading-tight uppercase">Cộng đồng Zalo</p>
                  <p className="text-[10px] text-blue-600 font-bold mt-0.5 uppercase tracking-tighter">Hỏi đáp & Săn Deal</p>
                </div>
              </div>
              <span className="text-blue-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* NÚT TẢI DRIVER / APP */}
            {sanPham.link_driver && (
               <a href={sanPham.link_driver} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-slate-900 hover:bg-black border border-slate-800 p-3.5 rounded-2xl transition-all group shadow-md hover:shadow-xl active:scale-95">
                  <div className="flex items-center gap-3">
                    <span className="text-white group-hover:animate-bounce shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-black text-white text-xs leading-tight uppercase tracking-widest">TẢI DRIVER / APP</p>
                    </div>
                  </div>
                  <span className="text-white text-xl group-hover:translate-x-1 transition-transform">→</span>
               </a>
            )}
          </div>

          <ComparisonModal sanPhamHienTai={sanPham} dsLienQuan={dsLienQuan || []} />
          <TrustBadges />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 relative z-20">
        <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-12 rounded-[2rem] shadow-sm border border-slate-100 relative z-10">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-slate-800 flex items-center gap-3 italic">
              <span className="w-2 h-10 bg-blue-600 rounded-full not-italic">#</span> 
              ĐÁNH GIÁ CHI TIẾT
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
              {sanPham.noi_dung || sanPham.mo_ta || 'Đang cập nhật đánh giá chi tiết...'}
            </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl sticky top-24 z-10">
            <h3 className="font-black text-xl mb-8 text-white uppercase tracking-widest border-b border-slate-800 pb-4 flex items-center gap-2 relative z-10">
                📝 Tóm tắt nhanh
            </h3>
            <div className="space-y-8">
              <div>
                <h4 className="font-black text-green-400 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest relative z-10">✅ Ưu điểm nổi bật</h4>
                <ul className="space-y-4 text-sm text-slate-300 font-bold relative z-10">
                  {sanPham.uu_diem ? (
                    (Array.isArray(sanPham.uu_diem) ? sanPham.uu_diem : String(sanPham.uu_diem).split('\n')).map((item: any, i: number) => {
                      if(typeof item !== 'string' || item.trim() === '') return null;
                      return (
                        <li key={i} className="flex gap-3 leading-snug">
                          <span className="text-green-500 shrink-0 text-lg leading-none">•</span> 
                          <span>{item}</span>
                        </li>
                      )
                    })
                  ) : (
                    <li className="text-slate-500 italic font-medium relative z-10">Đang cập nhật ưu điểm...</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-16 relative z-10">
        <div className="flex items-center justify-between mb-10 overflow-hidden relative z-10">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter shrink-0">
             CÓ THỂ ANH EM SẼ THÍCH
          </h2>
          <div className="h-1 flex-1 mx-8 bg-slate-100 rounded-full hidden md:block relative z-10"></div>
        </div>
        
        {dsLienQuan && dsLienQuan.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 relative z-10">
            {dsLienQuan.map((sp: any) => (<ProductCard key={sp.id} sanPham={sp} />))}
          </div>
        ) : (
          <div className="bg-slate-50 p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center text-slate-400 font-black uppercase tracking-widest relative z-10">
            Sản phẩm duy nhất trong phân khúc!
          </div>
        )}
      </div>

    </div>
  );
}