'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  
  const [danhMucList, setDanhMucList] = useState<any[]>([]);
  const [hangList, setHangList] = useState<any[]>([]);
  
  // 1. ĐÃ ĐỔI TÊN KHAI BÁO THÀNH `hang_san_xuat` CHO CHUẨN VỚI SẾP
  const [formData, setFormData] = useState({
    ten: '', gia: '', diem: '5.0', ts_1: '', ts_2: '', ts_3: '', 
    hinh_anh: '', link_driver: '', noi_dung: '', danh_muc: '', 
    hang_san_xuat: '', // <-- Đổi chỗ này nè sếp
    uu_diem: '', link_shopee: '', link_tiktok: ''
  });

  useEffect(() => {
    const fetchOptions = async () => {
      // Hút danh mục
      const { data: dmData } = await supabase.from('danh_muc').select('*');
      if (dmData) setDanhMucList(dmData);

      // 2. CHỌC ĐÚNG VÀO BẢNG `hang_san_xuat` CỦA SẾP
      const { data: hangData } = await supabase.from('hang_san_xuat').select('*');
      if (hangData) setHangList(hangData);
    };
    fetchOptions();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    if (!formData.ten) return alert("Sếp điền thiếu Tên sản phẩm rồi!");
    setLoading(true);

    try {
      const slug = formData.ten.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');

      const { error } = await supabase.from('san_pham').insert([{
        ten: formData.ten,
        slug: slug,
        gia: formData.gia,
        diem: parseFloat(formData.diem),
        ts_noi_bat_1: formData.ts_1,
        ts_noi_bat_2: formData.ts_2,
        ts_noi_bat_3: formData.ts_3,
        hinh_anh: formData.hinh_anh, 
        link_shopee: formData.link_shopee,
        link_tiktok: formData.link_tiktok, 
        uu_diem: formData.uu_diem,         
        noi_dung: formData.noi_dung,       
        brand_slug: formData.hang_san_xuat, // <-- Cập nhật chỗ lưu vào DB
        category_slug: formData.danh_muc
      }]);

      if (error) throw error;
      alert("🎉 Xuất bản thành công sếp ơi!");
      
      setFormData({ ten: '', gia: '', diem: '5.0', ts_1: '', ts_2: '', ts_3: '', hinh_anh: '', link_driver: '', noi_dung: '', danh_muc: '', hang_san_xuat: '', uu_diem: '', link_shopee: '', link_tiktok: '' });
    } catch (err: any) {
      alert("❌ Lỗi: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in text-slate-800">
      
      <div className="flex items-center justify-center gap-3 mb-10 text-center">
        <div className="text-4xl">🚀</div>
        <div>
          <h1 className="text-3xl font-black uppercase text-blue-600 tracking-tight">Đăng Sản Phẩm Mới</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Hệ thống quản lý nội dung V2.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= CỘT TRÁI (FORM CHÍNH) ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">1</span>
              <h3 className="font-black text-blue-600 uppercase text-sm">Thông tin cơ bản</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Tên sản phẩm *</label>
                <input name="ten" value={formData.ten} onChange={handleChange} placeholder="VD: Aula F75 Mạch Xuôi" className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Giá hiển thị (VNĐ)</label>
                  <input name="gia" value={formData.gia} onChange={handleChange} placeholder="1.050.000đ" className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-bold text-blue-600" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Điểm Review (1-5)</label>
                  <input name="diem" value={formData.diem} onChange={handleChange} type="number" step="0.1" className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-bold" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/50 p-8 rounded-[2rem] border border-orange-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-xs font-black">2</span>
              <h3 className="font-black text-orange-700 uppercase text-sm">Thông số nổi bật (Card VIP)</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input name="ts_1" value={formData.ts_1} onChange={handleChange} placeholder="VD: Layout 75%" className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-orange-500 focus:outline-none text-sm font-medium" />
              <input name="ts_2" value={formData.ts_2} onChange={handleChange} placeholder="VD: LED RGB" className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-orange-500 focus:outline-none text-sm font-medium" />
              <input name="ts_3" value={formData.ts_3} onChange={handleChange} placeholder="VD: 3 Mode kết nối" className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-orange-500 focus:outline-none text-sm font-medium" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">3</span>
              <h3 className="font-black text-blue-600 uppercase text-sm">Hình ảnh & Bài viết</h3>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Link Ảnh Chính (Mỗi dòng 1 ảnh)</label>
                  <textarea name="hinh_anh" value={formData.hinh_anh} onChange={handleChange} rows={4} placeholder="https://anh1.jpg&#10;https://anh2.jpg" className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-medium whitespace-nowrap overflow-x-auto" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Link Driver / App (Nếu có)</label>
                  <input name="link_driver" value={formData.link_driver} onChange={handleChange} placeholder="https://..." className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Nội dung Review chi tiết</label>
                <textarea name="noi_dung" value={formData.noi_dung} onChange={handleChange} rows={6} placeholder="Viết đánh giá của bạn ở đây..." className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-medium" />
              </div>
            </div>
          </div>

        </div>

        {/* ================= CỘT PHẢI (CÀI ĐẶT & NÚT) ================= */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl">
            <h3 className="font-black text-white uppercase text-sm mb-6">Cài đặt xuất bản</h3>
            <div className="space-y-4 mb-8">
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Danh mục</label>
                <select name="danh_muc" value={formData.danh_muc} onChange={handleChange} className="w-full p-3 mt-1 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none text-sm font-bold">
                  <option value="">-- Chọn danh mục --</option>
                  {danhMucList.map(dm => (
                    <option key={dm.id || dm.slug} value={dm.slug}>{dm.ten || dm.name || dm.ten_danh_muc || dm.title || dm.slug}</option>
                  ))}
                </select>
              </div>

              {/* 3. ĐỒNG BỘ `name` VÀ `value` CHO KHỚP VỚI CÁI MỚI SỬA */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Hãng sản xuất</label>
                <select name="hang_san_xuat" value={formData.hang_san_xuat} onChange={handleChange} className="w-full p-3 mt-1 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none text-sm font-bold">
                  <option value="">-- Chọn hãng --</option>
                  {hangList.map(h => (
                    // Lấy đúng cột ten_hang trong database của sếp
                    <option key={h.id || h.slug} value={h.slug}>{h.ten_hang || h.ten || h.slug}</option>
                  ))}
                </select>
              </div>

            </div>
            <button onClick={handlePublish} disabled={loading} className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all ${loading ? 'bg-slate-600' : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-1 active:scale-95'}`}>
              {loading ? 'ĐANG ĐẨY LÊN...' : '🚀 XUẤT BẢN NGAY'}
            </button>
            <p className="text-[9px] text-slate-500 uppercase font-bold text-center mt-4">Vui lòng kiểm tra kỹ trước khi đăng</p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-black text-slate-800 uppercase text-sm mb-4">✅ Ưu điểm nổi bật</h3>
            <textarea name="uu_diem" value={formData.uu_diem} onChange={handleChange} rows={5} placeholder="Gõ ưu điểm vào đây (mỗi dòng 1 ý)..." className="w-full p-4 rounded-xl bg-green-50/50 border border-green-200 focus:border-green-500 focus:outline-none text-sm font-medium text-green-900 placeholder:text-green-300" />
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-black text-slate-800 uppercase text-sm mb-4">🛒 Link Mua Hàng Affiliate</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 font-black text-xl shrink-0 border border-orange-200">S</div>
                <input name="link_shopee" value={formData.link_shopee} onChange={handleChange} placeholder="Dán link Shopee..." className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none text-sm" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xl shrink-0 border border-slate-700">T</div>
                <input name="link_tiktok" value={formData.link_tiktok} onChange={handleChange} placeholder="Dán link TikTok..." className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-800 focus:outline-none text-sm" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}