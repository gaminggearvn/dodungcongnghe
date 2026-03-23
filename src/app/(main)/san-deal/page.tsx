import { supabase } from '@/lib/supabase';

// Dòng lệnh "Thần thánh" để web luôn cập nhật dữ liệu mới từ Database
export const dynamic = 'force-dynamic';

export default async function VoucherPage() {
  const { data: vouchers } = await supabase
    .from('ma_giam_gia')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-slate-50/50 font-sans">
      <div className="text-center mb-16 relative">
         <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[8rem] md:text-[12rem] font-black text-slate-200/50 -z-10 tracking-tighter select-none">DEALS</div>
         <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter">Săn Mã Giảm Giá</h1>
         <p className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-4 animate-pulse">🔥 Voucher Shopee & TikTok Mall cập nhật mỗi ngày 🔥</p>
      </div>

      {vouchers && vouchers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vouchers.map((v) => (
            <div key={v.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-2 border-white hover:border-orange-200 group flex flex-col">
               {/* Nền tảng Label */}
               <div className={`p-2 text-center text-[10px] font-black text-white uppercase tracking-widest ${v.nen_tang === 'Shopee' ? 'bg-[#ee4d2d]' : 'bg-black'}`}>
                 {v.nen_tang} Mall Exclusive
               </div>

               <div className="p-10 flex flex-col items-center text-center flex-1">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{v.ten_ma}</p>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-6xl font-black text-slate-900 tracking-tighter">{v.gia_tri}</span>
                    <span className="text-xl font-black text-orange-600 uppercase">OFF</span>
                  </div>

                  {v.code ? (
                    <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 px-6 py-4 rounded-2xl font-black text-blue-600 text-2xl mb-8 select-all cursor-copy hover:bg-white hover:border-blue-300 transition-all">
                      {v.code}
                    </div>
                  ) : (
                    <div className="mb-8 text-slate-400 text-sm font-bold italic tracking-tight">Mã đã được tự động áp dụng</div>
                  )}

                  <div className="mt-auto w-full">
                    <div className="flex items-center justify-center gap-2 mb-8 bg-slate-50 py-2 px-4 rounded-full border border-slate-100">
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">HSD:</span>
                       <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{v.ngay_het_han ? new Date(v.ngay_het_han).toLocaleDateString() : 'Vô thời hạn'}</span>
                    </div>

                    <a 
                      href={v.link_voucher} 
                      target="_blank" 
                      className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-orange-200 transition-all active:scale-95 text-sm uppercase tracking-[0.1em]"
                    >
                      LẤY MÃ NGAY
                    </a>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        /* TRẠNG THÁI KHI CHƯA CÓ VOUCHER */
        <div className="bg-white p-20 rounded-[3rem] border-4 border-dashed border-slate-100 text-center max-w-2xl mx-auto">
           <span className="text-6xl mb-6 block">😴</span>
           <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Hiện chưa có deal thơm...</h3>
           <p className="text-slate-400 font-bold mt-2">Anh em quay lại sau nhé, pháp sư đang đi săn mã!</p>
        </div>
      )}
    </div>
  );
}