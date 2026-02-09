import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Activity } from 'lucide-react';

interface RevenueData {
    period: string;
    totalRevenue: number;
    totalBookings: number;
    avgOrderValue: number;
    dailyData: Array<{
        date: string;
        revenue: number;
        bookings: number;
    }>;
}

interface ServiceData {
    service: string;
    count: number;
    revenue: number;
}

const RevenueIntelligence = () => {
    const [todayData, setTodayData] = useState<RevenueData | null>(null);
    const [weekData, setWeekData] = useState<RevenueData | null>(null);
    const [monthData, setMonthData] = useState<RevenueData | null>(null);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRevenueData();
        fetchServiceData();
    }, []);

    const fetchRevenueData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-auth-token': token || '' };

            const [todayRes, weekRes, monthRes] = await Promise.all([
                fetch('/api/analytics/revenue?period=today', { headers }),
                fetch('/api/analytics/revenue?period=week', { headers }),
                fetch('/api/analytics/revenue?period=month', { headers })
            ]);

            if (todayRes.ok && weekRes.ok && monthRes.ok) {
                setTodayData(await todayRes.json());
                setWeekData(await weekRes.json());
                setMonthData(await monthRes.json());
            }
        } catch (error) {
            console.error('Error fetching revenue data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchServiceData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/analytics/services', {
                headers: { 'x-auth-token': token || '' }
            });

            if (response.ok) {
                const data = await response.json();
                setServices(data.services);
            }
        } catch (error) {
            console.error('Error fetching service data:', error);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-slate-600">Loading revenue data...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(todayData?.totalRevenue || 0)}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            {todayData?.totalBookings || 0} bookings
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Week</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(weekData?.totalRevenue || 0)}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            {weekData?.totalBookings || 0} bookings
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <Activity className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {formatCurrency(monthData?.totalRevenue || 0)}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            {monthData?.totalBookings || 0} bookings
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">
                            {formatCurrency(monthData?.avgOrderValue || 0)}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            Last 30 days
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Trend Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Trend (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthData?.dailyData || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(date) => new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                labelFormatter={(date) => new Date(date).toLocaleDateString('en-IN')}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                strokeWidth={2}
                                name="Revenue"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Service Popularity */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Services by Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={services.slice(0, 5)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="service" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend />
                            <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                            <Bar dataKey="count" fill="#8b5cf6" name="Bookings" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Service Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Service Performance Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Service</th>
                                    <th className="text-right py-3 px-4">Bookings</th>
                                    <th className="text-right py-3 px-4">Revenue</th>
                                    <th className="text-right py-3 px-4">Avg Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service, index) => (
                                    <tr key={index} className="border-b hover:bg-slate-50">
                                        <td className="py-3 px-4 font-medium">{service.service}</td>
                                        <td className="text-right py-3 px-4">{service.count}</td>
                                        <td className="text-right py-3 px-4">{formatCurrency(service.revenue)}</td>
                                        <td className="text-right py-3 px-4">
                                            {formatCurrency(service.count > 0 ? service.revenue / service.count : 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RevenueIntelligence;
