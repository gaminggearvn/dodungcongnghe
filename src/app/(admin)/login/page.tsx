'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Đăng nhập thành công, đá thẳng vào Dashboard
      router.push('/dashboard');
      
    } catch (err: any) {
      setError('❌ Sai email hoặc mật khẩu! Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      {/* Hiệu ứng Background cho ngầu */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-700 shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl border border-slate-700 mb-4 shadow-inner">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">LC Admin</h1>
          <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase mt-2">Secure Gateway</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-bold p-4 rounded-2xl mb-6 text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email quản trị</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="admin@lctech.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mật khẩu</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono tracking-widest text-lg"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl mt-4 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            {loading ? '⏳ ĐANG XÁC THỰC...' : '🚀 ĐĂNG NHẬP HỆ THỐNG'}
          </button>
        </form>
      </div>
    </div>
  );
}