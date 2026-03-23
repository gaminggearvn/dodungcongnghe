import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function HDSDDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: post } = await supabase.from('huong_dan').select('*').eq('slug', resolvedParams.slug).single();
  if (!post) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <Link href="/hdsd" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline mb-8 block">← Quay lại thư viện</Link>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 uppercase italic tracking-tight">{post.ten_bai_viet}</h1>
        <div className="flex flex-wrap gap-4 items-center border-y border-slate-100 py-6">
           <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <span className="text-blue-500 font-black text-[10px] uppercase">Hỗ trợ bởi</span>
              <span className="font-bold text-slate-800 text-xs tracking-tight">LC Keyboard Team</span>
           </div>
           {post.link_driver && (
             <a href={post.link_driver} target="_blank" className="bg-slate-900 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all">⬇️ Tải Driver Gốc</a>
           )}
        </div>
      </header>

      {post.hinh_anh_cover && <img src={post.hinh_anh_cover} className="w-full rounded-[2.5rem] shadow-2xl mb-12" alt="" />}

      <article className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 whitespace-pre-wrap">
         {post.noi_dung}
      </article>

      <footer className="mt-20 p-10 bg-blue-600 rounded-[3rem] text-center text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 text-9xl opacity-10 -mr-10 -mt-10">💬</div>
         <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tighter">Gặp khó khăn khi cài đặt?</h3>
         <p className="font-bold text-blue-100 mb-8 max-w-md mx-auto">Tham gia ngay cộng đồng Zalo của chúng tôi để được các pháp sư hỗ trợ 24/7 hoàn toàn miễn phí!</p>
         <a href="https://zalo.me/g/xxxxxx" target="_blank" className="inline-block bg-white text-blue-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-all uppercase tracking-widest">THAM GIA TEAM NGAY</a>
      </footer>
    </div>
  );
}