"use client";

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || 'Invalid credentials');
      setLoading(false);
    } else {
      toast.success('Login successful');
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-dark)] px-4">
      <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-12 h-12 mb-4">
            <Image 
              src="/logos/milestone-logo-dark.png" 
              alt="Milestone Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Login</h1>
          <p className="text-white/60 text-sm mt-2 text-center">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="admin@milestone.academy"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]/50 transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--green-500)] hover:opacity-90 text-black font-semibold rounded-lg px-4 py-3 mt-4 transition-all flex justify-center items-center h-[52px]"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

