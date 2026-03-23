import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { products } = await req.json();
    if (!products || products.length === 0) return NextResponse.json({ success: false, message: "Hàng đâu sếp ơi?" });

    let count = 0;
    for (const item of products) {
      // 1. Lưu Hãng
      await supabase.from('hang').upsert({ ten_hang: item.brandRaw, slug: item.brandSlug }, { onConflict: 'slug' });

      // 2. Lưu Sản phẩm
      const { error } = await supabase.from('san_pham').insert([{
        ten: item.name,
        slug: item.name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000),
        gia: item.price.toString(),
        hinh_anh: item.image,
        link_shopee: item.affLink,
        brand_slug: item.brandSlug,
        category_slug: 'san-pham-shopee',
        diem: 5.0,
        ts_noi_bat_1: "Hàng nội gián",
        ts_noi_bat_2: "Đúng hàng 100%",
        ts_noi_bat_3: "Giá cực thơm"
      }]);
      if (!error) count++;
    }

    return NextResponse.json({ success: true, message: `Hốt được ${count} món về kho rồi sếp nhé!` });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// Thêm cái này để trình duyệt Shopee không chặn khi gửi hàng về web mình
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}