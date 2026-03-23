import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function HDSDListPage() {
  const { data: posts } = await supabase.from('huong_dan').select('*').order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="mb-12 border-b-4 border-blue-600 pb-6">
         <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Thư viện Hướng Dẫn</h1>
         <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Tổ hợp phím, Chỉnh Led, Driver & Firmware chuẩn 100%</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <Link key={post.id} href={`/hdsd/${post.slug}`} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
               {post.hinh_anh_cover ? (
                 <img src={post.hinh_anh_cover} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-4xl grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all">📚</div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
            </div>
            <div className="p-8">
               <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors uppercase italic">{post.ten_bai_viet}</h3>
               <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Cập nhật: {new Date(post.created_at).toLocaleDateString()}</span>
                  <span className="text-blue-600 font-black text-sm group-hover:translate-x-1 transition-transform">XEM NGAY →</span>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}