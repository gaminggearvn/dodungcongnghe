'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductCard({ sanPham }: { sanPham: any }) {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.h === 0 && prev.m === 0 && prev.s === 0) return { h: 2, m: 0, s: 0 }; 
        let h = prev.h, m = prev.m, s = prev.s - 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fNum = (num: number) => num.toString().padStart(2, '0');

  const giaHienTai = sanPham.gia || "";
  const giaGoc = sanPham.gia ? (parseInt(sanPham.gia.replace(/\D/g, '')) * 1.3).toLocaleString() + 'đ' : '';

  const productUrl = `/${sanPham.category_slug}/${sanPham.brand_slug}/${sanPham.slug}`;

  return (
    <Link 
      href={productUrl} 
      prefetch={true} 
      className="block led-running-border bg-slate-800 rounded-2xl border border-slate-700 shadow-lg hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full relative z-10 hover:-translate-y-1 duration-300 cursor-pointer"
    >
      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full z-10 shadow-lg shadow-red-500/30">
        🔥 HOT
      </div>

      <div className="relative pt-2 px-2 bg-slate-800 aspect-square flex items-center justify-center rounded-t-2xl overflow-hidden">
        <img src={sanPham.hinh_anh} alt={sanPham.ten} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md rounded-xl bg-slate-700/30 p-1" />
      </div>

      <div className="p-2.5 md:p-3 flex flex-col flex-1 bg-slate-800 relative z-10 rounded-b-2xl">
        <h3 className="font-black text-[11px] md:text-xs text-white line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors h-6 md:h-8">
          {sanPham.ten}
        </h3>
        
        <div className="flex items-center gap-1 mt-1 mb-1.5 text-[9px] md:text-[11px]">
          <div className="text-yellow-400">{"★".repeat(Math.floor(sanPham.diem || 5))}</div>
          <span className="text-slate-400 font-bold ml-1">({sanPham.diem || 5})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {sanPham.ts_noi_bat_1 && <span className="text-[8px] md:text-[9px] font-bold text-slate-300 bg-slate-700 px-1.5 py-0.5 rounded-md">{sanPham.ts_noi_bat_1}</span>}
          {sanPham.ts_noi_bat_2 && <span className="text-[8px] md:text-[9px] font-bold text-slate-300 bg-slate-700 px-1.5 py-0.5 rounded-md">{sanPham.ts_noi_bat_2}</span>}
          {sanPham.ts_noi_bat_3 && <span className="text-[8px] md:text-[9px] font-bold text-slate-300 bg-slate-700 px-1.5 py-0.5 rounded-md">{sanPham.ts_noi_bat_3}</span>}
        </div>

        <div className="mt-auto">
          <div className="bg-rose-950/40 border border-rose-900/50 rounded-xl p-1 mb-1.5 flex items-center justify-between">
            <span className="text-[8px] font-black text-rose-400 uppercase tracking-tighter">⚡ Kết thúc sau:</span>
            <div className="flex items-center gap-1">
              <span className="bg-rose-600 text-white text-[8px] font-black px-1 py-0.5 rounded animate-pulse">{fNum(timeLeft.h)}</span>:
              <span className="bg-rose-600 text-white text-[8px] font-black px-1 py-0.5 rounded animate-pulse">{fNum(timeLeft.m)}</span>:
              <span className="bg-rose-600 text-white text-[8px] font-black px-1 py-0.5 rounded animate-pulse">{fNum(timeLeft.s)}</span>
            </div>
          </div>

          <div className="flex flex-col mb-1.5">
             <span className="text-rose-500 font-black text-xs md:text-base">{giaHienTai}</span>
             {giaGoc && <span className="text-slate-400 text-[9px] line-through font-bold">{giaGoc}</span>}
          </div>

          <div className="block w-full text-center bg-gradient-to-r from-orange-500 to-rose-500 group-hover:from-orange-600 group-hover:to-rose-600 text-white font-black py-2 md:py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-all group-hover:shadow-lg group-hover:shadow-orange-500/30">
            🛒 Tới nơi bán
          </div>
        </div>
      </div>
    </Link>
  );
}