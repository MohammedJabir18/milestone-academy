"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Loader2, 
  Save, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function SecurityPage() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        setDisplayName(user.user_metadata?.display_name || "");
      }
      setInitialLoading(false);
    };
    getUser();
  }, [supabase]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated successfully");
    }
    setLoading(false);
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Confirmation email sent to both old and new addresses");
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      setPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[var(--green-600)]" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[var(--green-50)] text-[var(--green-600)]">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">Security Settings</h1>
        </div>
        <p className="text-stone-500 font-medium ml-1">Manage your account credentials and system access.</p>
      </div>

      <div className="grid gap-8">
        {/* Profile Section */}
        <Card className="border-stone-200 rounded-[24px] shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-stone-50/50 p-8 border-b border-stone-100">
            <div className="flex items-center gap-3 mb-1">
              <User size={20} className="text-stone-400" />
              <CardTitle className="text-xl font-bold">Public Profile</CardTitle>
            </div>
            <CardDescription className="font-medium text-stone-400">This information will be displayed in the sidebar and dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 uppercase tracking-wider ml-1">Display Name (Username)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[var(--green-600)] transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]/20 focus:border-[var(--green-500)] transition-all placeholder:text-stone-300"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-[var(--green-600)] hover:bg-[var(--green-700)] rounded-xl font-bold px-8 h-12 shadow-lg shadow-green-500/10 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Email Section */}
        <Card className="border-stone-200 rounded-[24px] shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-stone-50/50 p-8 border-b border-stone-100">
            <div className="flex items-center gap-3 mb-1">
              <Mail size={20} className="text-stone-400" />
              <CardTitle className="text-xl font-bold">Login Email</CardTitle>
            </div>
            <CardDescription className="font-medium text-stone-400">Change the email address you use to sign in.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleUpdateEmail} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[var(--green-600)] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]/20 focus:border-[var(--green-500)] transition-all placeholder:text-stone-300"
                  />
                </div>
                <div className="flex items-start gap-2 mt-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-amber-700 leading-relaxed">
                    Changing your email will require confirmation links sent to both the current and new addresses. You will be signed out until verified.
                  </p>
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-stone-900 hover:bg-stone-800 rounded-xl font-bold px-8 h-12 shadow-lg shadow-stone-500/10 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <CheckCircle2 size={18} className="mr-2" />}
                Update Email
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="border-stone-200 rounded-[24px] shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-stone-50/50 p-8 border-b border-stone-100">
            <div className="flex items-center gap-3 mb-1">
              <Lock size={20} className="text-stone-400" />
              <CardTitle className="text-xl font-bold">Update Password</CardTitle>
            </div>
            <CardDescription className="font-medium text-stone-400">Ensure your account is using a long, random password to stay secure.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider ml-1">New Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[var(--green-600)] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]/20 focus:border-[var(--green-500)] transition-all placeholder:text-stone-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[var(--green-600)] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]/20 focus:border-[var(--green-500)] transition-all placeholder:text-stone-300"
                    />
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-stone-900 hover:bg-stone-800 rounded-xl font-bold px-8 h-12 shadow-lg shadow-stone-500/10 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Lock size={18} className="mr-2" />}
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
