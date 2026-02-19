import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut, Shield, ArrowLeft } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import AuditLogViewer from '@/components/AuditLogViewer';

const AdminAudit = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-3 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                {/* Header Container */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner group">
                            <BrandLogo size="md" className="group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                Security & Audit Logs
                                <Shield className="w-5 h-5 text-blue-600 animate-pulse" />
                            </h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Administrative Monitoring & Compliance</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/admin/dashboard')}
                            className="flex-1 md:flex-none h-10 md:h-12 rounded-xl border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-4 font-bold text-xs"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="flex-1 md:flex-none h-10 md:h-12 rounded-xl border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100 px-4 font-bold text-xs"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                    </div>
                </div>

                {/* Audit Log Viewer */}
                <div className="bg-white rounded-[2.5rem] p-1 shadow-sm border border-slate-100 overflow-hidden">
                    <AuditLogViewer />
                </div>
            </div>
        </div>
    );
};

export default AdminAudit;
