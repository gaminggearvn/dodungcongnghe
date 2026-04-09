'use client';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const removeDiacritics = (str: string) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // 🔴 VŨ KHÍ MỚI: Biến lưu trạng thái xem khách đang bấm vào món nào để hiện Loading
  const [loadingId, setLoadingId] = useState<number | null>(null); 
  
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase.from('san_pham').select('id, ten, slug, hinh_anh, gia, category_slug, brand_slug');
      if (data) setAllProducts(data);
    };
    loadProducts();

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const normalizedQuery = removeDiacritics(query);
      const filtered = allProducts.filter(product => {
        const normalizedName = removeDiacritics(product.ten);
        return normalizedName.includes(normalizedQuery);
      }).slice(0, 5);

      setResults(filtered);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query, allProducts]);

  return (
    <header className="bg-white sticky top-0 z-[100] border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
        
        {/* LOGO LCTECH */}
        <Link href="/" className="text-3xl font-black tracking-tighter shrink-0 hover:scale-105 transition-transform">
          <span className="text-slate-800">LC</span><span className="text-blue-600">TECH</span>
        </Link>

        {/* KHU VỰC TÌM KIẾM */}
        <div className="relative w-full max-w-xl z-50 flex-1" ref={searchRef}>
          <div className="relative group w-full">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors">
              🔍
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm "
              className="w-full pl-12 pr-4 py-3 rounded-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm font-bold text-sm transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowDropdown(true)}
            />
          </div>

          {showDropdown && results.length > 0 && (
            <div className="absolute top-[110%] left-0 w-full bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-[999] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 bg-slate-50/50">
                Sản phẩm gợi ý cho sếp:
              </div>
              <div className="max-h-[350px] overflow-y-auto scrollbar-hide">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      // 🔴 BẬT HIỆU ỨNG LOADING LÊN NGAY TỨC KHẮC
                      setLoadingId(product.id); 
                      // Thực hiện chuyển trang
                      router.push(`/${product.category_slug || 'danh-muc'}/${product.brand_slug || 'thuong-hieu'}/${product.slug}`);
                    }}
                    // Thêm relative và overflow-hidden để nhốt cái hiệu ứng loading lại
                    className="flex items-center gap-4 p-4 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-50 last:border-0 group relative overflow-hidden"
                  >
                    
                    {/* 🔴 LỚP PHỦ LOADING - CHỈ HIỆN KHI KHÁCH BẤM VÀO ĐÚNG MÓN NÀY */}
                    {loadingId === product.id && (
                      <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <span className="font-black text-blue-600 text-[11px] uppercase tracking-widest animate-pulse flex items-center gap-2">
                          <span className="animate-spin text-lg">⏳</span> ĐANG BAY TỚI...
                        </span>
                      </div>
                    )}

                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-100 flex-shrink-0 p-1">
                      <img src={product.hinh_anh} alt={product.ten} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-700 line-clamp-1 group-hover:text-blue-600">
                        {product.ten}
                      </h4>
                      <p className="text-xs font-black text-rose-500 mt-1">
                        {Number(product.gia).toLocaleString()}đ
                      </p>
                    </div>
                    <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all font-bold">
                        ➜
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center cursor-pointer hover:bg-slate-200 transition-colors">
                 <button className="text-[11px] font-black text-blue-600 uppercase tracking-widest w-full">
                   Xem tất cả kết quả
                 </button>
              </div>
            </div>
          )}

          {showDropdown && query.length > 0 && results.length === 0 && (
            <div className="absolute top-[110%] left-0 w-full bg-white rounded-3xl p-8 text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-slate-100 z-[999]">
              <div className="text-4xl mb-3">🏜️</div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Không thấy "{query}" trong kho sếp ơi!
              </p>
            </div>
          )}
        </div>

        {/* MENU BÊN PHẢI (CHUẨN LOGIC SẾP YÊU CẦU) */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <Link href="/hdsd" className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors">
            HDSD
          </Link>
          <Link href=" /san-deal" className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors">
            Mã Giảm Giá
          </Link>
          <a 
            href="https://zalo.me/g/nwbaao575" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-black text-white bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95"
          >
            Cộng Đồng
          </a>
        </div>

      </div>
    </header>
  );
}