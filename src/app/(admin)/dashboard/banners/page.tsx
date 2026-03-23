'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminBanners() {
  const [danhSach, setDanhSach] = useState<any[]>([]);
  const [formData, setFormData] = useState({ tieu_de: '', hinh_anh: '', duong_dan: '', thu_tu: 0 });
  const [isEdit, setIsEdit] = useState<number | null>(null);

  const loadData = async () => {
    const { data } = await supabase.from('banners').select('*').order('thu_tu', { ascending: true });
    if (data) setDanhSach(data);
  };
  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isEdit) await supabase.from('banners').update(formData).eq('id', isEdit);
    else await supabase.from('banners').insert([formData]);
    setFormData({ tieu_de: '', hinh_anh: '', duong_dan: '', thu_tu: 0 });
    setIsEdit(null); loadData();
    alert("Đã lưu banner thành công!");
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase italic">📺 QUẢN LÝ BANNER QUẢNG CÁO</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-white p-6 rounded-3xl border shadow-sm h-fit space-y-4">
          <input required placeholder="Tên chiến dịch (VD: Sale tháng 3)" value={formData.tieu_de} onChange={(e) => setFormData({...formData, tieu_de: e.target.value})} className="w-full border rounded-xl p-3 outline-none" />
          <input required placeholder="Link hình ảnh (Tỉ lệ 3:1 hoặc 4:1 là đẹp)" value={formData.hinh_anh} onChange={(e) => setFormData({...formData, hinh_anh: e.target.value})} className="w-full border rounded-xl p-3 outline-none" />
          <input placeholder="Link đích khi bấm vào" value={formData.duong_dan} onChange={(e) => setFormData({...formData, duong_dan: e.target.value})} className="w-full border rounded-xl p-3 outline-none" />
          <input type="number" placeholder="Thứ tự hiện" value={formData.thu_tu} onChange={(e) => setFormData({...formData, thu_tu: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 outline-none" />
          <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">Lưu Banner</button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          {danhSach.map((bn) => (
            <div key={bn.id} className="bg-white p-4 rounded-2xl border flex gap-4 items-center group">
              <img src={bn.hinh_anh} className="w-40 h-20 object-cover rounded-lg bg-slate-100" alt="" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{bn.tieu_de}</h4>
                <p className="text-[10px] text-blue-500 truncate max-w-xs">{bn.duong_dan}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {setFormData(bn); setIsEdit(bn.id);}} className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded text-xs">Sửa</button>
                <button onClick={async () => { if(confirm('Xóa?')) { await supabase.from('banners').delete().eq('id', bn.id); loadData(); } }} className="bg-red-50 text-red-500 font-bold px-3 py-1 rounded text-xs">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}