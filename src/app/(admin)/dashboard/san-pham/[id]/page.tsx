'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams, useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id; 

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  // KHO CHỨA DỮ LIỆU ĐỘNG TỪ SUPABASE
  const [danhMucList, setDanhMucList] = useState<any[]>([]);
  const [hangSxList, setHangSxList] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    ten: '', gia: '', diem: '5.0', ts_1: '', ts_2: '', ts_3: '', 
    hinh_anh: '', link_driver: '', noi_dung: '', danh_muc: '', 
    hang_sx: '', uu_diem: '', link_shopee: '', link_tiktok: ''
  });

  // 1. TỰ ĐỘNG HÚT DỮ LIỆU CŨ VÀ DANH SÁCH TỪ KHO
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        // 🔴 LẤY DANH MỤC (Dùng select * để vét sạch, không sợ sai tên cột)
        const { data: dmData } = await supabase.from('danh_muc').select('*');
        if (dmData) setDanhMucList(dmData);

        // 🔴 LẤY HÃNG SẢN XUẤT (Lấy từ bảng 'hang' như ảnh sếp chụp)
        const { data: hangData } = await supabase.from('hang').select('*');
        if (hangData) setHangSxList(hangData);

        // 🔴 LẤY THÔNG TIN SẢN PHẨM HIỆN TẠI
        const { data, error } = await supabase.from('san_pham').select('*').eq('id', id).single();
        
        if (data && !error) {
          setFormData({
            ten: data.ten || '',
            gia: data.gia || '',
            diem: data.diem?.toString() || '5.0',
            ts_1: data.ts_noi_bat_1 || '',
            ts_2: data.ts_noi_bat_2 || '',
            ts_3: data.ts_noi_bat_3 || '',
            hinh_anh: data.hinh_anh || '', 
            link_driver: data.link_driver || '',
            noi_dung: data.noi_dung || '',
            danh_muc: data.category_slug || '', 
            hang_sx: data.brand_slug || '',     
            uu_diem: data.uu_diem || '',
            link_shopee: data.link_shopee || '',
            link_tiktok: data.link_tiktok || ''
          });
        } else {
          alert("Không tìm thấy món này sếp ơi!");
          router.push('/dashboard/san-pham'); 
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. LƯU LẠI VÀO SUPABASE
  const handleUpdate = async () => {
    if (!formData.ten) return alert("Sếp không được để trống Tên sản phẩm nha!");
    setLoading(true);

    try {
      // Tự động tạo slug từ tên sản phẩm
      const slug = formData.ten.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');

      const { error } = await supabase.from('san_pham').update({
        ten: formData.ten,
        slug: slug,
        gia: formData.gia,
        diem: parseFloat(formData.diem),
        ts_noi_bat_1: formData.ts_1,
        ts_noi_bat_2: formData.ts_2,
        ts_noi_bat_3: formData.ts_3,
        hinh_anh: formData.hinh_anh,
        link_driver: formData.link_driver,
        noi_dung: formData.noi_dung,
        brand_slug: formData.hang_sx,
        category_slug: formData.danh_muc,
        uu_diem: formData.uu_diem,
        link_shopee: formData.link_shopee,
        link_tiktok: formData.link_tiktok
      }).eq('id', id);

      if (error) throw error;
      alert("🎉 Cập nhật thành công!");
      router.push('/dashboard/san-pham'); 
      
    } catch (err: any) {
      alert("❌ Lỗi: " + err.message);
    }
    setLoading(false);
  };

  if (fetching) return <div className="p-20 text-center font-bold text-slate-400 uppercase tracking-widest animate-pulse">⏳ Đang moi hàng từ trong kho ra...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in text-slate-800">
      
      {/* HEADER CÓ NÚT QUAY LẠI */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => router.push('/dashboard/san-pham')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-all font-black text-slate-400 text-xl">←</button>
        <div>
          <h1 className="text-3xl font-black uppercase text-rose-500 tracking-tight flex items-center gap-3">✏️ Chỉnh Sửa Sản Phẩm</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Sửa xong nhớ lưu nha sếp</p>
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
                <input name="ten" value={formData.ten} onChange={handleChange} className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Giá hiển thị (VNĐ)</label>
                  <input name="gia" value={formData.gia} onChange={handleChange} className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-bold text-blue-600" />
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
              <input name="ts_1" value={formData.ts_1} onChange={handleChange} className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-orange-500 focus:outline-none text-sm font-medium" />
              <input name="ts_2" value={formData.ts_2} onChange={handleChange} className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-orange-500 focus:outline-none text-sm font-medium" />
              <input name="ts_3" value={formData.ts_3} onChange={handleChange} className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-orange-500 focus:outline-none text-sm font-medium" />
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
                  <label className="text-[10px] font-black text-slate-400 uppercase">Link Ảnh Chính</label>
                  <input name="hinh_anh" value={formData.hinh_anh} onChange={handleChange} className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Link Driver / App</label>
                  <input name="link_driver" value={formData.link_driver} onChange={handleChange} className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Nội dung Review chi tiết</label>
                <textarea name="noi_dung" value={formData.noi_dung} onChange={handleChange} rows={6} className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-medium" />
              </div>
            </div>
          </div>

        </div>

        {/* ================= CỘT PHẢI (CÀI ĐẶT & NÚT) ================= */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl">
            <h3 className="font-black text-white uppercase text-sm mb-6">Cài đặt xuất bản</h3>
            
            <div className="space-y-4 mb-8">
              {/* 🟢 DANH MỤC */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Danh mục</label>
                <select name="danh_muc" value={formData.danh_muc} onChange={handleChange} className="w-full p-3 mt-1 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-rose-500 focus:outline-none text-sm font-bold cursor-pointer">
                  <option value="">-- Chọn danh mục --</option>
                  {danhMucList.map((dm) => (
                    // Tự động nhận diện ten_danh_muc hoặc ten
                    <option key={dm.id || dm.slug} value={dm.slug}>
                      {dm.ten_danh_muc || dm.ten || dm.slug}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🟢 HÃNG SẢN XUẤT */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Hãng sản xuất</label>
                <select name="hang_sx" value={formData.hang_sx} onChange={handleChange} className="w-full p-3 mt-1 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-rose-500 focus:outline-none text-sm font-bold cursor-pointer">
                  <option value="">-- Chọn hãng --</option>
                  {hangSxList.map((hang) => (
                    <option key={hang.id || hang.slug} value={hang.slug}>
                      {hang.ten_hang || hang.ten || hang.slug}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleUpdate} disabled={loading} className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all ${loading ? 'bg-slate-600' : 'bg-rose-500 hover:bg-rose-600 hover:-translate-y-1 active:scale-95 shadow-rose-500/30'}`}>
              {loading ? 'ĐANG LƯU...' : '💾 LƯU THAY ĐỔI'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-black text-slate-800 uppercase text-sm mb-4">✅ Ưu điểm nổi bật</h3>
            <textarea name="uu_diem" value={formData.uu_diem} onChange={handleChange} placeholder="Gõ xong 1 ý thì bấm Enter xuống dòng nha sếp..." rows={5} className="w-full p-4 rounded-xl bg-green-50/50 border border-green-200 focus:border-green-500 focus:outline-none text-sm font-medium text-green-900" />
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