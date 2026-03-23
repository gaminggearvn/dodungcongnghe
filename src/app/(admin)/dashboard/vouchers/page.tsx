'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminVouchers() {
  const [danhSach, setDanhSach] = useState<any[]>([]);
  const [formData, setFormData] = useState({ 
    ten_ma: '', 
    code: '', 
    gia_tri: '', 
    link_voucher: '', 
    nen_tang: 'Shopee', 
    ngay_het_han: '' 
  });
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. LẤY DANH SÁCH VOUCHER
  const loadData = async () => {
    const { data, error } = await supabase
      .from('ma_giam_gia')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Lỗi load data:", error.message);
    } else {
      setDanhSach(data || []);
    }
  };

  useEffect(() => { loadData(); }, []);

  // 2. XỬ LÝ LƯU (THÊM MỚI HOẶC CẬP NHẬT)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let error;

      if (isEdit) {
        // Lệnh CẬP NHẬT
        const { error: updateError } = await supabase
          .from('ma_giam_gia')
          .update(formData)
          .eq('id', isEdit);
        error = updateError;
      } else {
        // Lệnh THÊM MỚI
        const { error: insertError } = await supabase
          .from('ma_giam_gia')
          .insert([formData]);
        error = insertError;
      }

      if (error) {
        alert("❌ Lỗi: " + error.message);
      } else {
        alert(isEdit ? "✅ Đã cập nhật voucher!" : "🎉 Đã thêm voucher mới thành công!");
        // Reset form sạch sẽ
        setFormData({ ten_ma: '', code: '', gia_tri: '', link_voucher: '', nen_tang: 'Shopee', ngay_het_han: '' });
        setIsEdit(null);
        loadData(); // Load lại danh sách mới nhất
      }
    } catch (err: any) {
      alert("Lỗi hệ thống: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. XỬ LÝ KHI BẤM NÚT SỬA
  const handleEdit = (v: any) => {
    setFormData({
      ten_ma: v.ten_ma,
      code: v.code || '',
      gia_tri: v.gia_tri,
      link_voucher: v.link_voucher,
      nen_tang: v.nen_tang,
      ngay_het_han: v.ngay_het_han || ''
    });
    setIsEdit(v.id);
    // Cuộn lên đầu trang cho anh em dễ sửa
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. XỬ LÝ XÓA
  const handleDelete = async (id: number) => {
    if (confirm('⚠️ Anh em chắc chắn muốn xóa mã này chứ? Không hoàn tác được đâu nhé!')) {
      const { error } = await supabase
        .from('ma_giam_gia')
        .delete()
        .eq('id', id);

      if (error) {
        alert("Lỗi khi xóa: " + error.message);
      } else {
        alert("🗑️ Đã xóa xong!");
        loadData();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 font-sans">
      <div className="mb-10 border-b pb-5">
        <h2 className="text-4xl font-black text-slate-800 flex items-center gap-3">
          🎁 QUẢN LÝ VOUCHER
        </h2>
        <p className="text-slate-500 font-medium">Thêm, sửa, xóa mã giảm giá Shopee & TikTok Mall</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* CỘT TRÁI: FORM NHẬP LIỆU */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className={`sticky top-6 bg-white p-8 rounded-[2.5rem] border-2 shadow-xl space-y-5 transition-colors ${isEdit ? 'border-blue-400 bg-blue-50/10' : 'border-orange-100'}`}>
            <h3 className={`font-black uppercase tracking-widest text-sm ${isEdit ? 'text-blue-600' : 'text-orange-600'}`}>
              {isEdit ? '✏️ Đang chế độ sửa' : '✨ Tạo mã mới'}
            </h3>

            {/* Chọn nền tảng */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, nen_tang: 'Shopee'})} 
                className={`py-3 rounded-2xl text-xs font-black uppercase transition-all border-2 ${formData.nen_tang === 'Shopee' ? 'bg-[#ee4d2d] border-[#ee4d2d] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
              >
                Shopee
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, nen_tang: 'TikTok'})} 
                className={`py-3 rounded-2xl text-xs font-black uppercase transition-all border-2 ${formData.nen_tang === 'TikTok' ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
              >
                TikTok
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Tên chương trình</label>
                <input required placeholder="VD: Siêu Sale Giữa Tháng" value={formData.ten_ma} onChange={(e) => setFormData({...formData, ten_ma: e.target.value})} className="w-full border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-orange-500 transition-all font-bold" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Mã Code</label>
                  <input placeholder="VD: AULA50K" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-orange-500 transition-all font-black text-blue-600 uppercase" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Giá trị giảm</label>
                  <input required placeholder="VD: 100K" value={formData.gia_tri} onChange={(e) => setFormData({...formData, gia_tri: e.target.value})} className="w-full border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-orange-500 transition-all font-black text-orange-600" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Link lụm mã (Affiliate)</label>
                <input required placeholder="https://shope.ee/..." value={formData.link_voucher} onChange={(e) => setFormData({...formData, link_voucher: e.target.value})} className="w-full border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-orange-500 transition-all text-xs font-medium" />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Ngày hết hạn</label>
                <input type="date" value={formData.ngay_het_han} onChange={(e) => setFormData({...formData, ngay_het_han: e.target.value})} className="w-full border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-orange-500 transition-all font-bold text-slate-600" />
              </div>
            </div>

            <button 
              disabled={loading}
              className={`w-full text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all uppercase tracking-widest text-xs active:scale-95 ${isEdit ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200'}`}
            >
              {loading ? '⌛ Đang xử lý...' : (isEdit ? '💾 Cập nhật Voucher' : '🚀 Phát hành Voucher')}
            </button>

            {isEdit && (
              <button 
                type="button" 
                onClick={() => {setIsEdit(null); setFormData({ ten_ma: '', code: '', gia_tri: '', link_voucher: '', nen_tang: 'Shopee', ngay_het_han: '' });}}
                className="w-full text-slate-400 font-bold py-2 text-xs uppercase hover:text-slate-600 transition-all"
              >
                Hủy bỏ sửa đổi
              </button>
            )}
          </form>
        </div>

        {/* CỘT PHẢI: DANH SÁCH VOUCHER */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
          {danhSach.length > 0 ? (
            danhSach.map((v) => (
              <div key={v.id} className="bg-white p-6 rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col justify-between group relative overflow-hidden hover:border-orange-200 transition-all shadow-sm hover:shadow-md">
                 <div className={`absolute top-0 right-0 px-5 py-1.5 text-[9px] font-black uppercase tracking-widest text-white ${v.nen_tang === 'Shopee' ? 'bg-[#ee4d2d]' : 'bg-black'}`}>
                   {v.nen_tang}
                 </div>
                 
                 <div className="mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{v.ten_ma}</p>
                    <h4 className="text-3xl font-black text-slate-900 leading-none">{v.gia_tri} OFF</h4>
                    <div className="mt-3 flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Code:</span>
                       <span className="bg-slate-50 px-3 py-1 rounded-lg text-blue-600 font-black text-sm border border-slate-100">{v.code || 'AUTO'}</span>
                    </div>
                 </div>

                 <div className="flex gap-2 pt-5 border-t border-slate-50">
                    <button 
                      onClick={() => handleEdit(v)} 
                      className="flex-1 bg-blue-50 text-blue-600 font-black py-3 rounded-2xl text-[10px] uppercase hover:bg-blue-100 transition-all"
                    >
                      Sửa mã
                    </button>
                    <button 
                      onClick={() => handleDelete(v.id)} 
                      className="bg-red-50 text-red-500 font-black px-5 py-3 rounded-2xl text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all"
                    >
                      Xóa
                    </button>
                 </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-4 border-dashed border-white">
              <span className="text-4xl block mb-4">🏜️</span>
              <p className="text-slate-400 font-black uppercase tracking-widest">Chưa có mã nào trong kho</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}