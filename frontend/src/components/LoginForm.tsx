
import { getApiUrl } from "@/config";
import { useState } from "react";
// ... existing imports which are lines 3-12 in original file
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import BrandLogo from "./BrandLogo";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
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

        // Decode JWT to check user role from database
        const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
        const role = tokenPayload.user?.role?.toLowerCase();
        const isAdmin = role === 'admin';

        toast({
          title: "Success",
          description: isAdmin ? "Welcome Admin!" : "Logged in successfully",
        });

        // Redirect based on role
        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          // If a customer tries to login via the main login form, send them to their dashboard
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      {/* Debug Info - Remove before final production */}
      <div className="absolute top-0 left-0 bg-black/80 text-white p-2 text-xs z-50">
        API URL: {getApiUrl('/api/auth/login')}
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop"
          alt="Professional AC Service Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-black/90"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 flex justify-center items-center">
        <Card className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2">

          {/* Left Side: Brand Promo (Visible on Large Screens) */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600/10 border-r border-white/5">
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <BrandLogo size="md" variant="light" />
              </Link>

              <div className="pt-12 space-y-4">
                <h1 className="text-5xl font-black text-white leading-tight">
                  Premium cooling <br />
                  <span className="text-cyan-400">services in Vadodara.</span>
                </h1>
                <p className="text-slate-300 text-lg font-medium max-w-sm">
                  Join thousands of happy customers who trust Roshni Enterprise for their home comfort needs.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-white/70">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="font-bold">Secure User Authentication</span>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">© 2024 Roshni Enterprise • Trusted Excellence</p>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/10">
            <div className="text-center lg:text-left space-y-4 mb-10">
              <div className="lg:hidden mb-6 flex justify-center">
                <BrandLogo size="md" variant="light" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Welcome Back</h2>
              <p className="text-slate-400 font-medium">Please enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 font-bold ml-1">Email</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:bg-white/10 focus:border-cyan-500/50 transition-all text-lg"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" text-slate-300 font-bold>Password</Label>
                  <a href="#" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Forgot?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:bg-white/10 focus:border-cyan-500/50 transition-all text-lg"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Sign In Now"}
              </Button>
            </form>

            <div className="text-center mt-12">
              <p className="text-slate-400 font-medium">
                Don't have an account?
                <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 ml-2 font-black transition-colors">Create Account</Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
