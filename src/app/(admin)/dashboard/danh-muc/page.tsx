'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const taoSlugChuan = (text: string) => {
  return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/([^0-9a-z-\s])/g, "").replace(/(\s+)/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
};

export default function CategoryManager() {
  const [formData, setFormData] = useState({ ten_danh_muc: '', slug: '', icon: '' });
  const [danhSach, setDanhSach] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDanhSach = async () => {
    const { data } = await supabase.from('danh_muc').select('*').order('created_at', { ascending: false });
    if (data) setDanhSach(data);
  };

  useEffect(() => { fetchDanhSach(); }, []);

  const handleNameChange = (e: any) => setFormData({ ...formData, ten_danh_muc: e.target.value, slug: taoSlugChuan(e.target.value) });
  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    try {
      if (isEditing) {
        await supabase.from('danh_muc').update(formData).eq('id', isEditing);
      } else {
        await supabase.from('danh_muc').insert([formData]);
      }
      setFormData({ ten_danh_muc: '', slug: '', icon: '' });
      setIsEditing(null);
      fetchDanhSach();
      alert(isEditing ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
    } catch (error) { alert('Lỗi rồi đại vương ơi!'); } 
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setFormData({ ten_danh_muc: item.ten_danh_muc, slug: item.slug, icon: item.icon || '' });
    setIsEditing(item.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Xóa danh mục này sẽ ảnh hưởng tới các sản phẩm thuộc danh mục. Anh em chắc chứ?')) {
      await supabase.from('danh_muc').delete().eq('id', id);
      fetchDanhSach();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-black text-slate-800 mb-8 border-b pb-4">📂 Quản Lý Danh Mục</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Thêm/Sửa */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border shadow-sm h-fit">
          <h3 className="font-bold text-lg mb-4 text-blue-600">{isEditing ? '✏️ Cập nhật Danh Mục' : '✨ Thêm Danh Mục Mới'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Tên danh mục *</label>
              <input required name="ten_danh_muc" value={formData.ten_danh_muc} onChange={handleNameChange} className="w-full border rounded-lg px-4 py-2 outline-none" placeholder="VD: Bàn Phím Cơ" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Slug (Auto)</label>
              <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 bg-slate-50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Icon (Emoji)</label>
              <input name="icon" value={formData.icon} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 outline-none" placeholder="VD: ⌨️ hoặc 🖱️" />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                {loading ? '⏳ Đang lưu...' : (isEditing ? '💾 Cập Nhật' : '💾 Lưu Danh Mục')}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(null); setFormData({ ten_danh_muc: '', slug: '', icon: '' }); }} className="bg-slate-200 text-slate-700 font-bold px-4 rounded-lg hover:bg-slate-300">
                  Hủy
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Danh sách */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm"><th className="p-4 border-b">ID</th><th className="p-4 border-b">Icon & Tên</th><th className="p-4 border-b">Slug</th><th className="p-4 border-b text-right">Thao tác</th></tr>
            </thead>
            <tbody>
              {danhSach.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Chưa có danh mục nào. Hãy thêm ở bên trái!</td></tr>
              ) : (
                danhSach.map((dm) => (
                  <tr key={dm.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 text-slate-400">#{dm.id}</td>
                    <td className="p-4 font-bold text-slate-800">{dm.icon} {dm.ten_danh_muc}</td>
                    <td className="p-4 text-sm text-blue-500">{dm.slug}</td>
                    <td className="p-4 text-right flex gap-2 justify-end">
                      <button onClick={() => handleEdit(dm)} className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm font-bold">Sửa</button>
                      <button onClick={() => handleDelete(dm.id)} className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm font-bold">Xóa</button>
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