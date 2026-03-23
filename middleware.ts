import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Lấy thông tin người dùng nhập vào bảng bảo mật
  const basicAuth = req.headers.get('authorization');
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // TÀI KHOẢN VÀ MẬT KHẨU CỦA ANH EM NẰM Ở ĐÂY (CÓ THỂ ĐỔI LẠI TÙY Ý)
    if (user === 'admin' && pwd === 'lckeyboard2026') {
      return NextResponse.next(); // Mật khẩu đúng -> Cho vào
    }
  }

  // Mật khẩu sai hoặc chưa nhập -> Văng ra bảng bắt đăng nhập
  return new NextResponse('Khu vực nội bộ. Vui lòng đăng nhập!', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Báo cho hệ thống biết chỉ khóa thư mục dashboard thôi, còn lại cho khách xem tự do
export const config = {
  matcher: ['/dashboard/:path*'],
};