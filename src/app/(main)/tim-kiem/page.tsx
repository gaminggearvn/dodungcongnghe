import { supabase } from '@/lib/supabase';
import ProductCard from "@/components/ui/ProductCard";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const resolvedParams = await searchParams;
  const tuKhoa = resolvedParams.q || "";

  // Dùng .ilike để tìm kiếm từ khóa trong cột 'ten' của database
  const { data: ketQua } = await supabase
    .from('san_pham')
    .select('*')
    .ilike('ten', `%${tuKhoa}%`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="border-b-2 border-blue-600 pb-4 mb-10">
        <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">Kết quả tìm kiếm cho</p>
        <h1 className="text-3xl font-black text-slate-800">"{tuKhoa}"</h1>
      </div>

      {ketQua && ketQua.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {ketQua.map((sp) => (
            <ProductCard key={sp.id} sanPham={sp} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-300 text-center">
           <span className="text-5xl mb-4 block">🕵️‍♂️</span>
           <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào khớp với từ khóa <strong>"{tuKhoa}"</strong>.</p>
           <p className="text-sm text-gray-400 mt-2">Anh em thử gõ tên Hãng hoặc tên chung chung (VD: bàn phím, chuột) xem sao nhé!</p>
        </div>
      )}
    </div>
  );
}