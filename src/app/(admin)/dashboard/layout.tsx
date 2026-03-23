'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // KIỂM TRA ĐĂNG NHẬP
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };
    checkUser();
  }, [router]);

  // HÀM ĐĂNG XUẤT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-black tracking-widest animate-pulse">ĐANG TẢI DỮ LIỆU...</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-100 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10 shrink-0">
        <div className="p-6 border-b border-slate-800 text-center">
          <h1 className="text-2xl font-black text-blue-400 tracking-tighter italic">LC ADMIN</h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Manager System v2.0</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto hide-scrollbar">
          
          <p className="text-[10px] text-slate-500 font-black px-4 py-2 uppercase tracking-widest text-white/50">Sản phẩm</p>
          <Link href="/dashboard" className="block hover:bg-slate-800 text-slate-300 px-4 py-3 rounded-xl font-bold transition-all text-sm">➕ Đăng SP Mới</Link>
          <Link href="/dashboard/san-pham" className="block hover:bg-slate-800 text-slate-300 px-4 py-3 rounded-xl font-bold transition-all text-sm">📋 Danh Sách SP</Link>
          
          {/* NÚT CRAWLER MỚI THÊM VÀO ĐÂY NÀY ANH */}
          <p className="text-[10px] text-slate-500 font-black px-4 py-2 mt-4 uppercase tracking-widest text-white/50">Công cụ Auto</p>
          <Link href="/dashboard/crawler" className="block bg-purple-900/30 border border-purple-800/30 text-purple-400 hover:bg-purple-600 hover:text-white px-4 py-3 rounded-xl font-bold transition-all text-sm shadow-sm">
            🕷️ Trạm Cào Dữ Liệu
          </Link>

          <p className="text-[10px] text-slate-500 font-black px-4 py-2 mt-4 uppercase tracking-widest text-white/50">Nội dung & Deal</p>
          <Link href="/dashboard/banners" className="block bg-green-900/20 border border-green-800/30 text-green-400 px-4 py-3 rounded-xl font-bold transition-all text-sm mb-1">📺 Quản lý Banner</Link>
          <Link href="/dashboard/hdsd" className="block bg-blue-900/30 border border-blue-800/30 text-blue-300 px-4 py-3 rounded-xl font-bold transition-all text-sm mb-1">📚 Quản lý HDSD</Link>
          <Link href="/dashboard/vouchers" className="block bg-orange-900/30 border border-orange-800/30 text-orange-300 px-4 py-3 rounded-xl font-bold transition-all text-sm">🎁 Mã Giảm Giá</Link>
          
          <p className="text-[10px] text-slate-500 font-black px-4 py-2 mt-4 uppercase tracking-widest text-white/50">Phân loại</p>
          <Link href="/dashboard/danh-muc" className="block hover:bg-slate-800 text-slate-300 px-4 py-3 rounded-xl font-medium text-sm transition-all">📂 Danh mục</Link>
          <Link href="/dashboard/hang" className="block hover:bg-slate-800 text-slate-300 px-4 py-3 rounded-xl font-medium text-sm transition-all">🏷️ Hãng sản xuất</Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link href="/" target="_blank" className="block text-center bg-slate-800 hover:bg-white hover:text-black py-3 rounded-xl font-black text-xs transition-all uppercase tracking-widest border border-slate-700">👁️ Xem Web</Link>
          
          <button onClick={handleLogout} className="w-full text-center bg-red-900/20 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-xl font-black text-xs transition-all uppercase tracking-widest border border-red-900/30">
            🚪 Đăng xuất
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}