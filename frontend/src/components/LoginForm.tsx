import { getApiUrl } from "@/config";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock, Loader2, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import BrandLogo from "./BrandLogo";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "", // Email or Phone
    password: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);

        const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
        const role = tokenPayload.user?.role?.toLowerCase();
        const isAdmin = role === 'admin';

        toast({
          title: "Welcome back!",
          description: isAdmin ? "Administrator access granted." : "Successfully logged into your account.",
        });

        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message || "Invalid credentials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Minimal Geometric Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-50 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">

        {/* Visual Side */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Background"
            />
            <div className="absolute inset-0 bg-blue-900/60"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <BrandLogo size="md" variant="light" />
              <div className="mt-20 space-y-6">
                <h1 className="text-6xl font-black leading-[1.1] tracking-tight">
                  Welcome <br />
                  <span className="text-white font-medium italic">back home.</span>
                </h1>
                <p className="text-blue-100 text-lg font-medium max-w-sm leading-relaxed">
                  Log in to manage your bookings and enjoy personalized AC care.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-blue-600 bg-slate-200" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" />
                ))}
                <div className="flex items-center justify-center h-10 w-10 rounded-full ring-4 ring-blue-600 bg-blue-500 text-xs font-bold text-white">+2k</div>
              </div>
              <p className="text-sm font-bold text-blue-100">Joined by 2,000+ happy customers</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <div className="mb-12 space-y-3">
            <div className="lg:hidden mb-10">
              <BrandLogo size="sm" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sign In</h2>
            <p className="text-slate-500 font-medium">Access your Roshni Enterprise dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-slate-600 font-bold text-sm ml-1">Email or Phone</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Email or 10-digit Phone"
                  className="pl-12 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 rounded-2xl transition-all text-base font-medium"
                  value={formData.identifier}
                  onChange={(e) => setFormData(prev => ({ ...prev, identifier: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password" className="text-slate-600 font-bold text-sm">Password</Label>
                <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  maxLength={8}
                  className="pl-12 pr-12 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 rounded-2xl transition-all text-base font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-[1.25rem] font-bold text-lg shadow-[0_20px_40px_-12px_rgba(37,99,235,0.3)] active:scale-[0.98] transition-all group"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-12 text-center text-slate-500 font-medium">
            New to Roshni?
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-black ml-2 underline underline-offset-4 decoration-2 decoration-blue-100 hover:decoration-blue-500 transition-all">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
