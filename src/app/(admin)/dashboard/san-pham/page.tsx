'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// HÀM CHUẨN HÓA TIẾNG VIỆT THẦN THÁNH
const removeDiacritics = (str: string) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

export default function ProductListPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. LẤY HÀNG TỪ DATABASE
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('san_pham')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  // 2. HÀM XÓA SẢN PHẨM
  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Sếp chắc chắn muốn xóa [${name}] không? Xóa xong là bay màu vĩnh viễn đó nha!`)) {
      const { error } = await supabase.from('san_pham').delete().eq('id', id);
      if (!error) {
        alert("Đã xóa xong sếp nhé!");
        fetchProducts(); 
      }
    }
  };

  // 3. LOGIC LỌC TÌM KIẾM THẦN THÁNH BẤT CHẤP DẤU CÂU
  const filteredProducts = products.filter(p => {
    const normalizedTerm = removeDiacritics(searchTerm);
    const normalizedName = removeDiacritics(p.ten);
    const normalizedSlug = removeDiacritics(p.slug);
    
    return normalizedName.includes(normalizedTerm) || normalizedSlug.includes(normalizedTerm);
  });

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in">
      {/* HEADER & THANH TÌM KIẾM */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="text-3xl">📦</div>
          <h1 className="text-2xl font-black text-slate-800 uppercase italic">Quản Lý Sản Phẩm</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Gõ 'ban phim' hoặc 'F75'..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full md:w-[350px] rounded-2xl bg-white border-2 border-slate-200 focus:border-blue-500 focus:outline-none shadow-sm font-medium text-sm transition-all"
            />
          </div>

          <Link href="/dashboard/crawler" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 whitespace-nowrap">
            + Nhập Hàng
          </Link>
        </div>
      </div>

      {/* BẢNG HIỂN THỊ SẢN PHẨM */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Ảnh</th>
              <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thông tin sản phẩm</th>
              <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-40">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={3} className="p-10 text-center text-slate-400 italic font-medium uppercase text-[10px]">Đang lục lọi trong kho...</td></tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="p-5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm p-1">
                      <img src={p.hinh_anh} alt={p.ten} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="text-sm font-bold text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">{p.ten}</div>
                    <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter">ID: #{p.id}</span>
                        <span className="text-[10px] text-slate-400 font-medium italic line-clamp-1">Slug: {p.slug}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/dashboard/san-pham/${p.id}`} className="px-4 py-2 bg-slate-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs font-bold border border-slate-100 hover:border-blue-600">
                        ✏️ Sửa
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.ten)} className="px-4 py-2 bg-slate-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all text-xs font-bold border border-slate-100 hover:border-rose-600">
                        🗑️ Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-20 text-center">
                  <div className="text-4xl mb-3">🏜️</div>
                  <div className="text-slate-500 font-bold uppercase text-xs tracking-widest">Không có món "{searchTerm}" nào trong kho sếp ơi!</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer Bảng */}
      <div className="mt-4 flex justify-end px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Đang hiển thị {filteredProducts.length} sản phẩm
      </div>
    </div>
  );
}