import { getApiUrl } from "@/config";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
    Rocket, ShieldCheck, Lock, Eye, EyeOff,
    AlertCircle, Loader2, CheckCircle2
} from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const { toast } = useToast();

    // Load remembered email on mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('admin_remembered_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const validateEmail = (val: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val && !re.test(val)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError(null);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(getApiUrl('/api/auth/login'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: email, password })
            });

            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error("Server returned non-JSON response");
            }

            if (response.ok) {
                const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
                const role = tokenPayload.user?.role?.toLowerCase();

                if (role === 'admin') {
                    if (rememberMe) {
                        localStorage.setItem('admin_remembered_email', email);
                    } else {
                        localStorage.removeItem('admin_remembered_email');
                    }

                    localStorage.setItem('token', data.token);
                    navigate('/admin/dashboard');
                    toast({
                        title: "Welcome Back",
                        description: "Secure access granted to Command Center.",
                        className: "bg-[#2563EB] text-white border-blue-700"
                    });
                } else {
                    setError("You do not have administrator privileges.");
                }
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            setError("Connection to server failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#F8FAFC] px-4 py-12">
            {/* Soft decorative element */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#2563EB]/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex-1 flex items-center justify-center w-full relative z-10 py-8">
                <Card className="w-full max-w-[440px] bg-white border-[#E5E7EB] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[2.5rem] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#2563EB]"></div>

                    <CardHeader className="space-y-6 text-center pt-12 pb-4">
                        <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-[#2563EB] rounded-[1.75rem] flex items-center justify-center shadow-xl shadow-blue-500/10 group cursor-default">
                            <Rocket className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <div className="space-y-1.5">
                            <CardTitle className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">Admin <span className="text-[#2563EB]">Portal</span></CardTitle>
                            <p className="text-[#64748B] font-bold uppercase tracking-[0.2em] text-[10px]">Secure Command Center</p>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 md:p-10 pt-4 space-y-8">
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#64748B] text-[10px] font-black uppercase tracking-widest ml-1">Administrator Access</Label>
                                <div className="relative group">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@roshni.com"
                                        autoComplete="email"
                                        className={`h-14 bg-[#F9FAFB] border-[#CBD5E1] text-[#334155] placeholder:text-[#94A3B8] rounded-2xl focus:bg-white transition-all text-lg font-medium pl-5 pr-5 border-2 ${emailError ? 'border-[#EF4444]/50 focus:border-[#EF4444]' : 'focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/5'}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={(e) => validateEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    {emailError && (
                                        <p className="text-[#EF4444] text-[10px] font-bold mt-1.5 ml-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> {emailError}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <Label htmlFor="password" className="text-[#64748B] text-[10px] font-black uppercase tracking-widest">Secure Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/forgot-password')}
                                        className="text-[10px] font-black text-[#2563EB]/70 hover:text-[#2563EB] uppercase tracking-widest transition-colors"
                                    >
                                        Forgot?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="h-14 bg-[#F9FAFB] border-[#CBD5E1] text-[#334155] placeholder:text-[#94A3B8] rounded-2xl focus:bg-white transition-all text-lg font-medium pl-5 pr-14 border-2 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/5"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#334155] transition-colors p-2"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 px-1">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-[#CBD5E1] bg-[#F9FAFB] text-[#2563EB] focus:ring-[#2563EB]"
                                />
                                <Label htmlFor="remember" className="text-[11px] font-bold text-[#64748B] cursor-pointer select-none">Remember this device</Label>
                            </div>

                            {error && (
                                <div className="bg-[#EF4444]/5 border border-[#EF4444]/10 text-[#EF4444] p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 animate-in fade-in zoom-in-95">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#93C5FD] text-white h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/10 active:scale-[0.98] transition-all relative overflow-hidden group"
                                disabled={isLoading}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 tracking-tight">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Authenticating...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="w-5 h-5" />
                                            Access Dashboard
                                        </>
                                    )}
                                </span>
                            </Button>
                        </form>

                        <div className="space-y-6 pt-2">
                            <div className="text-center">
                                <Link to="/" className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] transition-colors text-[10px] font-black uppercase tracking-widest group">
                                    <span>← Return to Public Site</span>
                                </Link>
                            </div>

                            <div className="pt-4 border-t border-[#E5E7EB] flex flex-col items-center gap-2">
                                <div className="flex items-center gap-1.5 text-[#64748B]/50 text-[9px] font-black uppercase tracking-[0.1em]">
                                    <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                                    Protected with enterprise security
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 text-[#94A3B8] text-[9px] font-black tracking-[0.3em] uppercase select-none relative z-10">
                System Core v2.5 // Roshni Enterprise
            </div>
        </div>
    );
};

export default AdminLogin;
