'use client';

import React, { useState } from 'react';

export default function ProductGallery({ images, anhChinh }: { images: any[], anhChinh: string }) {
  // Gộp ảnh chính và ảnh từ kho (gallery) lại. Nếu kho ảnh trống thì lấy ảnh chính.
  const tatCaAnh = images.length > 0 ? images : [{ url: anhChinh }];
  const [selectedImage, setSelectedImage] = useState(tatCaAnh[0]?.url || '');

  if (!tatCaAnh[0]?.url) {
    return (
      <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 p-4">
        <span className="text-gray-400 font-medium">[ Hình ảnh đang cập nhật ]</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ẢNH LỚN ĐANG CHỌN */}
      <div className="aspect-square bg-white rounded-3xl flex items-center justify-center border border-gray-100 p-6 shadow-inner">
        <img src={selectedImage} alt="main product" className="w-full h-full object-contain" />
      </div>

      {/* DANH SÁCH ẢNH NHỎ (THUMBNAILS) Ở DƯỚI */}
      {tatCaAnh.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
          {tatCaAnh.map((img, index) => (
            <button 
              key={index} 
              onClick={() => setSelectedImage(img.url)} 
              className={`w-20 h-20 flex-shrink-0 aspect-square flex items-center justify-center rounded-2xl border-2 transition-all p-2 bg-white ${selectedImage === img.url ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100 hover:border-gray-300'}`}
            >
              <img src={img.url} alt={`thumbnail ${index}`} className="w-full h-full object-contain rounded-lg" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}