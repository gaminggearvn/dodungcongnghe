'use client';
import { useEffect, useState } from 'react';

export default function TrollAdminPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Đếm ngược 5 giây
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Hết 5 giây thì đá sang link Rickroll huyền thoại
    if (countdown === 0) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-center p-6 relative overflow-hidden selection:bg-red-900 selection:text-white">
      {/* Hiệu ứng chớp đỏ rùng rợn */}
      <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl border-2 border-red-600 bg-black/80 p-8 md:p-12 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.5)]">
        
        <h1 className="text-red-500 text-4xl md:text-5xl font-black mb-6 flex items-center justify-center gap-3">
          <span className="animate-bounce">⚠️</span> CẢNH BÁO XÂM NHẬP!
        </h1>
        
        <p className="text-green-500 text-lg md:text-xl font-bold mb-8">
          Phát hiện hành vi dò quét đường dẫn Quản trị hệ thống.
        </p>
        
        <div className="text-left text-white/80 text-sm md:text-base space-y-3 mb-8 bg-slate-900/50 p-6 rounded-lg border border-slate-700 font-mono">
          <p className="animate-[pulse_1s_ease-in-out_infinite]">&gt; Đang quét địa chỉ IP mạng...</p>
          <p className="text-yellow-400">&gt; IP Client: 192.168.***.*** [ĐÃ GHI NHẬN]</p>
          <p className="text-yellow-400">&gt; Device MAC: [ĐÃ GHI NHẬN]</p>
          <p className="animate-[pulse_1s_ease-in-out_infinite] text-red-400">&gt; Đang kết nối tới máy chủ cơ quan an ninh mạng...</p>
        </div>

        <p className="text-white text-lg font-bold mb-4">Hệ thống sẽ tự động khóa thiết bị của bạn sau:</p>
        
        <div className="text-red-500 text-7xl font-black mb-8 animate-ping">
          {countdown}
        </div>

        <p className="text-slate-600 text-xs italic mt-10">
          "Tính mò link Admin của LCTECH à? Bạn còn non và xanh lắm!" 😂
        </p>
      </div>
    </div>
  );
}