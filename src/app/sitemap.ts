import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vua-ban-phim.vercel.app', // Mặc định để tạm, sau này có tên miền chính thức sếp đổi lại sau
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}