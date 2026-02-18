import { getApiUrl } from "@/config";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Mail, Lock, Phone, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Strict 8-character password check
        if (password.length !== 8) {
            toast({
                title: "Invalid Password",
                description: "Password must be exactly 8 characters.",
                variant: "destructive"
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Passwords mismatch",
                description: "Please make sure your passwords match.",
                variant: "destructive"
            });
            return;
        }

        if (phoneNumber.length !== 10) {
            toast({
                title: "Invalid Phone",
                description: "Please enter a valid 10-digit phone number.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl('/api/auth/register'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, phoneNumber, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                toast({
                    title: "Welcome aboard!",
                    description: "Your account has been created successfully.",
                });
                navigate('/');
            } else {
                throw new Error(data.message || "Registration failed");
            }
        } catch (error: any) {
            toast({
                title: "Registration Failed",
                description: error.message || "Something went wrong",
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
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-50 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">

                {/* Visual Side: Modern & Minimal */}
                <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <img
                            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop"
                            className="w-full h-full object-cover grayscale"
                            alt="Background"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <BrandLogo size="md" variant="light" />
                            <div className="mt-20 space-y-6">
                                <h1 className="text-6xl font-black leading-[1.1] tracking-tight text-white">
                                    Start your <br />
                                    <span className="text-blue-400 font-medium italic">cooling journey</span> <br />
                                    with us.
                                </h1>
                                <p className="text-slate-400 text-lg font-medium max-w-sm leading-relaxed">
                                    Trusted by thousands of homes in Vadodara for reliable AC services.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Priority Scheduling</p>
                                    <p className="text-sm text-slate-400">Get faster response times as a member.</p>
                                </div>
                            </div>
                            <p className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">Roshni Enterprise • Est. 2014</p>
                        </div>
                    </div>
                </div>

                {/* Form Side: Clean & Spacious */}
                <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
                    <div className="mb-12 space-y-3">
                        <div className="lg:hidden mb-10">
                            <BrandLogo size="sm" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create Account</h2>
                        <p className="text-slate-500 font-medium">Please fill in your details to get started.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-600 font-bold text-sm ml-1">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="alex@example.com"
                                        className="pl-12 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all text-base font-medium"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-slate-600 font-bold text-sm ml-1">Phone Number</Label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="98765 43210"
                                        className="pl-12 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all text-base font-medium"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-600 font-bold text-sm ml-1">Password (Exactly 8 chars)</Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    maxLength={8}
                                    className="pl-12 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all text-base font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-slate-600 font-bold text-sm ml-1">Confirm Password</Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    maxLength={8}
                                    className="pl-12 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all text-base font-medium"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-slate-950 hover:bg-slate-900 text-white h-16 rounded-[1.25rem] font-bold text-lg shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all group overflow-hidden relative"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Create Account
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-12 text-center text-slate-500 font-medium">
                        Already have an account?
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-black ml-2 underline underline-offset-4 decoration-2 decoration-blue-100 hover:decoration-blue-500 transition-all">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
