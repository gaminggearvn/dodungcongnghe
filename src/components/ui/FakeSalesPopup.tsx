'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo trạm hút dữ liệu Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Danh sách tạo độ "Tin chuẩn"
const fakeNames = ["Nguyễn Huy", "Trần Phát", "Lê Nam", "Hoàng Tuấn", "Phạm Khang", "Bùi Đức", "Đỗ Quân", "Minh Tú", "Anh Khoa", "Quốc Bảo"];
const fakeTimes = ["vừa xong", "1 phút trước", "2 phút trước", "3 phút trước", "vài giây trước"];
const fakeLocations = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Bình Dương", "Bắc Ninh", "Vũng Tàu"];

// Danh sách dự phòng (Lỡ web sếp chưa có bài nào thì nó lấy tạm cái này)
const fallbackProducts = ["Bàn Phím Cơ Xinmeng", "Chuột Attack Shark", "Bàn Phím Aula F75", "Tai nghe Gaming"];

export default function FakeSalesPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentData, setCurrentData] = useState({ name: '', product: '', time: '', location: '' });
  
  // Biến lưu danh sách sản phẩm thật
  const [realProducts, setRealProducts] = useState<string[]>([]);

  // 1. KÉO TÊN SẢN PHẨM THẬT TỪ DATABASE LÚC VỪA VÀO WEB
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('san_pham')
        .select('ten')
        .limit(30); // Lấy ngẫu nhiên 30 SP gần nhất để làm chim mồi
      
      if (data && data.length > 0) {
        setRealProducts(data.map(p => p.ten));
      }
    };
    fetchProducts();
  }, []);

  // 2. VÒNG LẶP HIỆN POPUP MUA HÀNG
  useEffect(() => {
    const showRandomPopup = () => {
      // Bốc thăm ngẫu nhiên dữ liệu người mua
      const rName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const rTime = fakeTimes[Math.floor(Math.random() * fakeTimes.length)];
      const rLocation = fakeLocations[Math.floor(Math.random() * fakeLocations.length)];
      
      // Bốc ngẫu nhiên SẢN PHẨM THẬT (nếu chưa tải kịp thì lấy đồ dự phòng)
      const productList = realProducts.length > 0 ? realProducts : fallbackProducts;
      const rProduct = productList[Math.floor(Math.random() * productList.length)];
      
      setCurrentData({ name: rName, product: rProduct, time: rTime, location: rLocation });
      setShowPopup(true);

      // Hiện 4.5 giây rồi tắt
      setTimeout(() => setShowPopup(false), 4500);
    };

    // Đợi 3 giây đầu tiên mới hiện phát đầu
    const initialDelay = setTimeout(showRandomPopup, 3000);

    // Sau đó cứ 12 đến 20 giây sẽ cho nhảy random 1 lần
    const loopInterval = setInterval(() => {
      showRandomPopup();
    }, Math.floor(Math.random() * 8000) + 12000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(loopInterval);
    };
  }, [realProducts]); // Chạy lại vòng lặp khi tải xong đồ thật

  return (
    <>
      {/* KHUNG POP-UP GÓC TRÁI DƯỚI */}
      <div 
        className={`fixed bottom-4 md:bottom-8 left-4 md:left-8 z-[999999] transition-all duration-700 ease-in-out transform ${
          showPopup ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white border-2 border-green-500 rounded-2xl p-3 md:p-4 shadow-2xl flex items-center gap-4 max-w-[280px] md:max-w-xs">
          {/* Chấm xanh nhấp nháy */}
          <div className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          
          <div className="flex-1">
            <p className="text-[10px] md:text-xs text-slate-500 font-bold mb-1">
              <span className="text-slate-800 font-black">{currentData.name}</span> ở {currentData.location}
            </p>
            <p className="text-[11px] md:text-sm font-black text-green-600 leading-tight line-clamp-2" title={currentData.product}>
              Vừa chốt đơn {currentData.product}
            </p>
            <p className="text-[9px] md:text-[10px] text-slate-400 mt-1 italic">{currentData.time}</p>
          </div>
        </div>
      </div>
    </>
  );
}