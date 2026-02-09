import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });


            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                // If not JSON, it's likely a server error text or HTML
                const text = await response.text();
                throw new Error("Server returned non-JSON response: " + text.slice(0, 50));
            }

            if (response.ok) {
                // Check if user is actually an admin before allowing entry
                const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
                const role = tokenPayload.user?.role?.toLowerCase();

                if (role === 'admin') {
                    localStorage.setItem('token', data.token);
                    navigate('/admin/dashboard');
                    toast({
                        title: "Login Successful",
                        description: "Welcome to the Admin Portal",
                    });
                } else {
                    toast({
                        title: "Access Denied",
                        description: "You do not have administrator privileges.",
                        variant: "destructive"
                    });
                    // Don't save token if they aren't admin on the admin login page
                }
            } else {
                toast({
                    title: "Login Failed",
                    description: data.message || "Invalid credentials",
                    variant: "destructive"
                });
            }
        } catch (error: any) {
            console.error("Login error:", error);
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1454165833767-027ffea36c1e?q=80&w=2070&auto=format&fit=crop"
                    alt="Professional Office Background"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-black/90"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 flex justify-center items-center">
                <Card className="w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="space-y-4 text-center py-12 bg-white/5">
                        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 active:scale-95 transition-transform">
                            <span className="text-white font-black text-3xl">R</span>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-black text-white tracking-tight">Admin Portal</CardTitle>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Secure Access Only</p>
                        </div>
                    </CardHeader>

                    <CardContent className="p-10">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300 font-bold ml-1">Admin Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@roshni.com"
                                    className="h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:bg-white/10 focus:border-blue-500/50 transition-all text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" text-slate-300 font-bold ml-1>Security Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:bg-white/10 focus:border-blue-500/50 transition-all text-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all">
                                Authentication Sign In
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link to="/" className="text-slate-500 hover:text-white transition-colors text-sm font-bold">
                                ← Back to Public Site
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminLogin;
