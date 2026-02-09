import { getApiUrl } from "@/config";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "Passwords mismatch",
                description: "Please make sure your passwords match.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl('/api/auth/register'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                toast({
                    title: "Welcome! Account created.",
                    description: "You've successfully signed up for Roshni Enterprise.",
                });
                navigate('/');
            } else {
                throw new Error(data.message || "Registration failed");
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1531053270060-6643c5e707fe?q=80&w=2070&auto=format&fit=crop"
                    alt="Corporate AC Systems"
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
                                    Join the <br />
                                    <span className="text-cyan-400">future of comfort.</span>
                                </h1>
                                <p className="text-slate-300 text-lg font-medium max-w-sm">
                                    Create an account to track your service history, schedule appointments, and get exclusive offers.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 text-white/70">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                    <UserPlus className="w-5 h-5 text-cyan-400" />
                                </div>
                                <span className="font-bold">Fast & Free Registration</span>
                            </div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">© 2024 Roshni Enterprise • Trusted Excellence</p>
                        </div>
                    </div>

                    {/* Right Side: Signup Form */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/10">
                        <div className="text-center lg:text-left space-y-4 mb-10">
                            <div className="lg:hidden mb-6 flex justify-center">
                                <BrandLogo size="md" variant="light" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Create Account</h2>
                            <p className="text-slate-400 font-medium">Join Roshni Enterprise for a smarter booking experience.</p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300 font-bold ml-1">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:bg-white/10 focus:border-cyan-500/50 transition-all text-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" text-slate-300 font-bold>Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-12 pr-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:bg-white/10 focus:border-cyan-500/50 transition-all text-lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" text-slate-300 font-bold>Confirm Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-12 pr-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:bg-white/10 focus:border-cyan-500/50 transition-all text-lg"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" />
                                ) : (
                                    <>
                                        Sign Up Now
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="text-center mt-12">
                            <p className="text-slate-400 font-medium">
                                Already have an account?
                                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 ml-2 font-black transition-colors">Login here</Link>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Signup;
