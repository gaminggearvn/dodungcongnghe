import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function createSlug(text: string) {
  return text.toString().toLowerCase()
    .replace(/đ/g, 'd')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9 -]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-'); 
}

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ success: false, message: "Sếp chưa nhập món cần cào kìa!" });
    }

    // ĐỊA CHỈ KHO HÀNG SHOPEE
    const shopeeApiUrl = `https://shopee.vn/api/v4/search/search_items?keyword=${encodeURIComponent(keyword)}&limit=30&newest=0&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`;

    // 🕵️ CHIẾN THUẬT NGỤY TRANG (DÙNG COOKIE SẾP VỪA LẤY)
    const response = await fetch(shopeeApiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'X-API-Source': 'pc',
        'X-Shopee-Language': 'vi',
        'Referer': 'https://shopee.vn/',
        'Cookie': '_gcl_au=1.1.969776560.1769234811; SPC_F=fycZXMTBEYkFmF8L36pa3KG49KUkZN1l; REC_T_ID=e0b3e0d6-f8ea-11f0-93e3-1aec3474ce7c; _QPWSDCXHZQA=c81dc86e-6ac5-4ce9-d8f4-10f8159dbb2b; REC7iLP4Q=844e58c0-bedb-4bb4-ab72-31824d6761f3; SPC_CLIENTID=ZnljWlhNVEJFWWtGzodoikhosmdtonws; _fbp=fb.1.1769234813168.189191043374049649; language=vi; SPC_R_T_ID=OwV4TeAKDlMyUvwXPXBvkSOE5joJVIcUZsJmNWXbIoS7BXc47LN/YkoZdGLP5fXJEvk/gwb3H0SO+J5b3EN6m31Q2DXEurJRJkQCAe/HKmao+QZeM6YZL1UkEmCqclI6jcUh3uh5CWwZGXAY8Y77vsNLD3UB41w/UX6Re+ijjlM=; SPC_T_ID=OwV4TeAKDlMyUvwXPXBvkSOE5joJVIcUZsJmNWXbIoS7BXc47LN/YkoZdGLP5fXJEvk/gwb3H0SO+J5b3EN6m31Q2DXEurJRJkQCAe/HKmao+QZeM6YZL1UkEmCqclI6jcUh3uh5CWwZGXAY8Y77vsNLD3UB41w/UX6Re+ijjlM=; SPC_SI=S9C3aQAAAABqNDV1WGxXT/4dAgAAAAAAY1lyWnpvSWU=; csrftoken=HmT7f6a69ExoN1XYsQ5t7A0gyXWiLy5W; ds=8cd9b3de1faa867e62a802cb6934bd51'
      }
    });

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "Shopee nó nhận ra mình là Bot rồi sếp ơi! Có thể Cookie này bị hết hạn." 
      });
    }

    let countSP = 0;

    for (const itemObj of data.items) {
      const item = itemObj.item_basic;
      if (!item) continue;

      const rawName = item.name;
      const price = Math.floor(item.price / 100000); 
      const image = `https://down-vn.img.susercontent.com/file/${item.image}`;
      const originalLink = `https://shopee.vn/product/${item.shopid}/${item.itemid}`;

      // GẮN LINK AFFILIATE (Sếp thay Pub ID của sếp vào đây nhé)
      const myPubId = "YOUR_PUB_ID_HERE"; 
      const affLink = `https://go.isclix.com/deep_link/v5?pub_id=${myPubId}&url=${encodeURIComponent(originalLink)}`;

      let brandRaw = item.brand || "Chính hãng";
      const brandSlug = createSlug(brandRaw);
      const productSlug = createSlug(rawName) + '-' + Math.floor(Math.random() * 10000);

      // Lưu Hãng
      await supabase.from('hang').upsert({ ten_hang: brandRaw, slug: brandSlug }, { onConflict: 'slug' });

      // Lưu Sản phẩm
      const { error: spError } = await supabase.from('san_pham').insert([{
        ten: rawName,                  
        slug: productSlug,               
        gia: price.toString(),      
        hinh_anh: image,            
        link_shopee: affLink,       
        brand_slug: brandSlug,      
        category_slug: 'san-pham-shopee',    
        diem: 5.0,                       
        ts_noi_bat_1: "Hàng chất lượng",   
        ts_noi_bat_2: "Shopee Mall",      
        ts_noi_bat_3: "Giá cực tốt"   
      }]);

      if (!spError) countSP++;
    }

    return NextResponse.json({ 
        success: true, 
        message: `Thắng rồi sếp ơi! Đã hốt ${countSP} sản phẩm về kho thành công.` 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: `Lỗi hệ thống: ${error.message}` }, { status: 500 });
  }
}