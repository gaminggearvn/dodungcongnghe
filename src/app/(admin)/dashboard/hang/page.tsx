'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const taoSlugChuan = (text: string) => {
  return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/([^0-9a-z-\s])/g, "").replace(/(\s+)/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
};

export default function BrandManager() {
  const [formData, setFormData] = useState({ ten_hang: '', slug: '', hinh_anh: '' });
  const [danhSach, setDanhSach] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDanhSach = async () => {
    const { data } = await supabase.from('hang_san_xuat').select('*').order('created_at', { ascending: false });
    if (data) setDanhSach(data);
  };

  useEffect(() => { fetchDanhSach(); }, []);

  const handleNameChange = (e: any) => setFormData({ ...formData, ten_hang: e.target.value, slug: taoSlugChuan(e.target.value) });
  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    try {
      if (isEditing) {
        await supabase.from('hang_san_xuat').update(formData).eq('id', isEditing);
      } else {
        await supabase.from('hang_san_xuat').insert([formData]);
      }
      setFormData({ ten_hang: '', slug: '', hinh_anh: '' });
      setIsEditing(null);
      fetchDanhSach();
      alert(isEditing ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
    } catch (error) { alert('Lỗi hệ thống!'); }
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setFormData({ ten_hang: item.ten_hang, slug: item.slug, hinh_anh: item.hinh_anh || '' });
    setIsEditing(item.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Chắc chắn xóa Hãng này?')) {
      await supabase.from('hang_san_xuat').delete().eq('id', id);
      fetchDanhSach();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-black text-slate-800 mb-8 border-b pb-4">🏷️ Quản Lý Hãng (Brands)</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border shadow-sm h-fit">
          <h3 className="font-bold text-lg mb-4 text-blue-600">{isEditing ? '✏️ Cập nhật Hãng' : '✨ Thêm Hãng Mới'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-bold mb-1">Tên Hãng *</label><input required name="ten_hang" value={formData.ten_hang} onChange={handleNameChange} className="w-full border rounded-lg px-4 py-2 outline-none" /></div>
            <div><label className="block text-sm font-bold mb-1">Slug (Auto)</label><input required name="slug" value={formData.slug} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 bg-slate-50 outline-none" /></div>
            <div>
              <label className="block text-sm font-bold mb-1">Link Logo</label>
              <input name="hinh_anh" value={formData.hinh_anh} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 outline-none" placeholder="https://..." />
              {formData.hinh_anh && <img src={formData.hinh_anh} alt="preview" className="mt-2 h-10 object-contain" />}
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                {loading ? '⏳...' : (isEditing ? '💾 Cập Nhật' : '💾 Lưu Hãng')}
              </button>
              {isEditing && <button type="button" onClick={() => { setIsEditing(null); setFormData({ ten_hang: '', slug: '', hinh_anh: '' }); }} className="bg-slate-200 text-slate-700 font-bold px-4 rounded-lg">Hủy</button>}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm"><th className="p-4 border-b">Logo</th><th className="p-4 border-b">Tên Hãng</th><th className="p-4 border-b">Slug</th><th className="p-4 border-b text-right">Thao tác</th></tr>
            </thead>
            <tbody>
              {danhSach.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Chưa có hãng nào.</td></tr>
              ) : (
                danhSach.map((hang) => (
                  <tr key={hang.id} className="border-b hover:bg-slate-50">
                    <td className="p-4">{hang.hinh_anh ? <img src={hang.hinh_anh} alt="" className="w-10 h-10 object-contain" /> : 'No Logo'}</td>
                    <td className="p-4 font-bold text-slate-800">{hang.ten_hang}</td>
                    <td className="p-4 text-sm text-blue-500">{hang.slug}</td>
                    <td className="p-4 text-right flex gap-2 justify-end">
                      <button onClick={() => handleEdit(hang)} className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm font-bold">Sửa</button>
                      <button onClick={() => handleDelete(hang.id)} className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm font-bold">Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}