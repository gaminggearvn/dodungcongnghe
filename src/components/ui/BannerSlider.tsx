'use client';
import React, { useState, useEffect } from 'react';

export default function BannerSlider({ banners }: { banners: any[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] shadow-lg group">
      <div 
        className="flex transition-transform duration-1000 ease-in-out" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((bn) => (
          <a key={bn.id} href={bn.duong_dan || '#'} target="_blank" className="w-full flex-shrink-0 block bg-slate-100">
            {/* Ép tỉ lệ aspect để banner luôn đẹp, không bị quá dài */}
            <img 
              src={bn.hinh_anh} 
              alt={bn.tieu_de} 
              className="w-full aspect-[2.5/1] md:aspect-[3/1] object-cover hover:brightness-105 transition-all duration-700" 
            />
          </a>
        ))}
      </div>

      {/* Nút chấm điều hướng */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}