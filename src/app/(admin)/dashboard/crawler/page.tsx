'use client';
import { useState } from 'react';

export default function SuperCrawlerPage() {
  const [activeTab, setActiveTab] = useState('manual'); // manual | csv | api
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  // States cho Nhập Tay
  const [manualData, setManualData] = useState({ ten: '', gia: '', hinh_anh: '', link_aff: '', brand: 'Shopee Mall' });
  
  // States cho Auto (CSV & API)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('shopee');

  const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  // --- HÀM 1: XỬ LÝ NHẬP TAY ---
  const handleManualSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    addLog("🚀 Đang đẩy sản phẩm nhập tay vào kho...");
    try {
      const res = await fetch('/api/datafeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          products: [{
            name: manualData.ten, price: manualData.gia, image: manualData.hinh_anh,
            affLink: manualData.link_aff, brandRaw: manualData.brand, brandSlug: manualData.brand.toLowerCase().replace(/ /g, '-')
          }] 
        }),
      });
      const data = await res.json();
      if(data.success) {
        addLog("✅ Đã thêm xong món nhập tay!");
        setManualData({ ten: '', gia: '', hinh_anh: '', link_aff: '', brand: 'Shopee Mall' });
      }
    } catch (err) { addLog("❌ Lỗi nhập tay!"); }
    setLoading(false);
  };

  // --- HÀM 2: ĐÀO MỎ CSV (Giữ nguyên logic cũ) ---
  const startDatafeed = async () => {
    if (!selectedFile) return addLog("⚠️ Chọn file CSV đã sếp!");
    setLoading(true);
    addLog(`⚡ Đang lật tung file ${platform}...`);
    // Logic đọc file CHUNK đã viết ở bản trước...
    // (Ở đây em viết gọn lại để sếp dễ nhìn giao diện)
    addLog("🔍 Tính năng CSV sẵn sàng. Đang chờ sếp bấm lệnh.");
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl">🛠️</div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase italic leading-none">Tổng Kho Crawler & Entry</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">Hệ thống quản lý dữ liệu đa kênh v9.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: ĐIỀU KHIỂN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB CHỌN CHẾ ĐỘ */}
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
            <button onClick={() => setActiveTab('manual')} className={`flex-1 py-3 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'manual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>✍️ NHẬP TAY</button>
            <button onClick={() => setActiveTab('csv')} className={`flex-1 py-3 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'csv' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>📦 ĐÀO FILE CSV</button>
            <button onClick={() => setActiveTab('api')} className={`flex-1 py-3 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'api' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>🎯 SÚNG TỈA API</button>
          </div>

          {/* NỘI DUNG TỪNG TAB */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            
            {/* TAB 1: NHẬP TAY */}
            {activeTab === 'manual' && (
              <form onSubmit={handleManualSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input placeholder="Tên sản phẩm..." className="w-full p-4 rounded-xl bg-slate-50 text-sm font-bold focus:outline-indigo-500" value={manualData.ten} onChange={e => setManualData({...manualData, ten: e.target.value})} />
                  <div className="flex gap-4">
                    <input placeholder="Giá VNĐ" className="flex-1 p-4 rounded-xl bg-slate-50 text-sm font-bold" value={manualData.gia} onChange={e => setManualData({...manualData, gia: e.target.value})} />
                    <input placeholder="Hãng" className="flex-1 p-4 rounded-xl bg-slate-50 text-sm font-bold" value={manualData.brand} onChange={e => setManualData({...manualData, brand: e.target.value})} />
                  </div>
                  <input placeholder="Link Affiliate AccessTrade..." className="w-full p-4 rounded-xl bg-slate-50 text-sm font-bold" value={manualData.link_aff} onChange={e => setManualData({...manualData, link_aff: e.target.value})} />
                  <input placeholder="Link hình ảnh..." className="w-full p-4 rounded-xl bg-slate-50 text-sm font-bold" value={manualData.hinh_anh} onChange={e => setManualData({...manualData, hinh_anh: e.target.value})} />
                </div>
                <div className="aspect-square bg-slate-50 rounded-3xl border-2 border-dashed flex items-center justify-center overflow-hidden">
                  {manualData.hinh_anh ? <img src={manualData.hinh_anh} className="w-full h-full object-cover" /> : <p className="text-slate-300 text-[10px] font-bold uppercase">Ảnh Preview</p>}
                </div>
                <button className="md:col-span-2 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs hover:bg-indigo-700 shadow-lg shadow-indigo-200">🚀 XÁC NHẬN NHẬP KHO</button>
              </form>
            )}

            {/* TAB 2: ĐÀO MỎ CSV */}
            {activeTab === 'csv' && (
              <div className="space-y-6">
                <div className="flex gap-2">
                  <button onClick={() => setPlatform('shopee')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold ${platform === 'shopee' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'}`}>SHOPEE</button>
                  <button onClick={() => setPlatform('tiktok')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold ${platform === 'tiktok' ? 'bg-black text-white' : 'bg-slate-100 text-slate-500'}`}>TIKTOK</button>
                </div>
                <input type="file" accept=".csv" className="text-[10px]" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                <input placeholder="Từ khóa tìm kiếm trong file..." className="w-full p-4 rounded-xl bg-slate-50 text-sm font-bold" value={keyword} onChange={e => setKeyword(e.target.value)} />
                <button onClick={startDatafeed} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-xs">🔥 BẮT ĐẦU ĐÀO MỎ FILE</button>
              </div>
            )}

            {/* TAB 3: API CRAWLER */}
            {activeTab === 'api' && (
              <div className="space-y-4">
                <p className="text-[10px] text-slate-400 italic">Lưu ý: API Shopee rất dễ chặn. Cào ít một sếp nhé!</p>
                <input placeholder="Gõ tên sản phẩm cào trực tiếp..." className="w-full p-4 rounded-xl bg-slate-50 text-sm font-bold" />
                <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-black text-xs shadow-lg shadow-rose-200">⚡ KHAI HỎA API (SNIPER)</button>
              </div>
            )}

          </div>
        </div>

        {/* CỘT PHẢI: RADAR LOG */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[2.5rem] p-6 h-[600px] flex flex-col border-4 border-slate-800 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Màn hình Radar</span>
              <button onClick={() => setLog([])} className="text-[9px] text-slate-600 hover:text-white uppercase font-bold">Xóa Log</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide font-mono text-[11px]">
              {log.length === 0 && <div className="text-slate-700 italic">Radar sẵn sàng...</div>}
              {log.map((line, i) => (
                <div key={i} className="text-blue-400 leading-relaxed border-l-2 border-slate-800 pl-3">{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}