import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, BarChart3, List, TrendingUp, Shield, Activity } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import PredictiveAnalytics from '@/components/PredictiveAnalytics';

const AdminAnalytics = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100 gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-1 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                            <BrandLogo size="md" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <Activity className="w-8 h-8 text-purple-600" />
                                Predictive Analytics
                            </h1>
                            <p className="text-slate-600 mt-1">Demand forecasting and business insights</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/admin/dashboard')}
                            className="rounded-xl"
                        >
                            Back to Dashboard
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="rounded-xl text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>

                {/* Predictive Analytics Component */}
                <PredictiveAnalytics />
            </div>
        </div>
    );
};

export default AdminAnalytics;
