import { supabase } from '@/lib/supabase';
import ProductCard from "@/components/ui/ProductCard";

export default async function BrandPage({ params }: { params: Promise<{ category: string; brand: string }> }) {
  const resolvedParams = await params;
  const category = decodeURIComponent(resolvedParams.category).trim();
  const brand = decodeURIComponent(resolvedParams.brand).trim();

  // DÙNG .ilike() ĐỂ KHÔNG PHÂN BIỆT CHỮ HOA CHỮ THƯỜNG
  const { data: dsSanPham } = await supabase
    .from('san_pham')
    .select('*')
    .ilike('category_slug', category)
    .ilike('brand_slug', brand);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="border-b-2 border-blue-600 pb-4 mb-10 flex justify-between items-end">
        <div>
          <p className="text-blue-600 font-bold uppercase text-sm tracking-widest">Thương hiệu</p>
          <h1 className="text-4xl font-black uppercase text-slate-800">{brand.replace(/-/g, ' ')}</h1>
        </div>
        <p className="text-slate-400 font-medium">Danh mục: {category.replace(/-/g, ' ')}</p>
      </div>
      
      {dsSanPham && dsSanPham.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {dsSanPham.map((sp) => (
            <ProductCard key={sp.id} sanPham={sp} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-300 text-center">
           <p className="text-gray-500 text-lg">Hãng <strong className="uppercase">{brand}</strong> hiện chưa có sản phẩm nào.</p>
        </div>
      )}
    </div>
  );
}