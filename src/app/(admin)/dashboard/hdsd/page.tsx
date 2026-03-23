'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const taoSlug = (t: string) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/([^0-9a-z-\s])/g, "").replace(/(\s+)/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");

export default function AdminHDSD() {
  const [danhSach, setDanhSach] = useState<any[]>([]);
  const [formData, setFormData] = useState({ ten_bai_viet: '', slug: '', noi_dung: '', link_driver: '', hinh_anh_cover: '' });
  const [isEdit, setIsEdit] = useState<number | null>(null);

  const loadData = async () => {
    const { data } = await supabase.from('huong_dan').select('*').order('created_at', { ascending: false });
    if (data) setDanhSach(data);
  };
  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isEdit) await supabase.from('huong_dan').update(formData).eq('id', isEdit);
    else await supabase.from('huong_dan').insert([formData]);
    setFormData({ ten_bai_viet: '', slug: '', noi_dung: '', link_driver: '', hinh_anh_cover: '' });
    setIsEdit(null); loadData();
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">📚 QUẢN LÝ HƯỚNG DẪN</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-white p-6 rounded-3xl border shadow-sm h-fit space-y-4">
          <h3 className="font-black text-blue-600 uppercase text-xs tracking-widest">{isEdit ? 'Cập nhật' : 'Viết bài mới'}</h3>
          <input required placeholder="Tên bài viết (VD: HDSD Aula F75)" value={formData.ten_bai_viet} onChange={(e) => setFormData({...formData, ten_bai_viet: e.target.value, slug: taoSlug(e.target.value)})} className="w-full border rounded-xl p-3 outline-none" />
          <input required placeholder="Slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border rounded-xl p-3 outline-none bg-slate-50 text-xs font-mono" />
          <input placeholder="Link ảnh Cover" value={formData.hinh_anh_cover} onChange={(e) => setFormData({...formData, hinh_anh_cover: e.target.value})} className="w-full border rounded-xl p-3 outline-none" />
          <input placeholder="Link Driver (Nếu có)" value={formData.link_driver} onChange={(e) => setFormData({...formData, link_driver: e.target.value})} className="w-full border rounded-xl p-3 outline-none" />
          <textarea placeholder="Nội dung hướng dẫn chi tiết..." rows={8} value={formData.noi_dung} onChange={(e) => setFormData({...formData, noi_dung: e.target.value})} className="w-full border rounded-xl p-3 outline-none whitespace-pre-wrap" />
          <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">Lưu bài viết</button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          {danhSach.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border flex justify-between items-center group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">📄</div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.ten_bai_viet}</h4>
                  <p className="text-[10px] text-blue-500 font-mono italic">/{item.slug}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => {setFormData(item); setIsEdit(item.id);}} className="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-lg text-xs">Sửa</button>
                <button onClick={async () => { if(confirm('Xóa?')) { await supabase.from('huong_dan').delete().eq('id', item.id); loadData(); } }} className="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-lg text-xs">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}