import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LogOut, Calendar, Phone, MapPin, Wrench, User, LayoutDashboard, Settings, TrendingUp, List } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import RevenueIntelligence from '@/components/RevenueIntelligence';
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Booking {
    _id: string;
    service: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    area: string;
    status: string;
    createdAt: string;
}

const AdminDashboard = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [activeTab, setActiveTab] = useState<'bookings' | 'revenue'>('revenue');
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/bookings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                if (response.status === 401) {
                    handleLogout();
                }
            }
        } catch (error) {
            console.error('Failed to fetch bookings', error);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/bookings/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setBookings(bookings.map(b =>
                    b._id === id ? { ...b, status: newStatus } : b
                ));
                toast({
                    title: "Status Updated",
                    description: `Booking status changed to ${newStatus}`,
                });
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update status",
                variant: "destructive"
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'Completed': return 'bg-green-100 text-green-700 hover:bg-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 hover:bg-red-200';
            default: return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100 gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-1 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                            <BrandLogo size="md" />
                        </div>
                        <div className="h-12 w-px bg-slate-100 hidden md:block"></div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Console</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Secure Control Center</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase tracking-tighter">
                                AD
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-sm font-bold text-slate-700">Administrator</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Full Access</span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleLogout} className="h-11 rounded-xl border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100 px-6 font-bold transition-all active:scale-95">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-blue-500 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">Total Bookings</CardTitle>
                            <Calendar className="w-4 h-4 text-blue-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{bookings.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-amber-500 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">Pending Requests</CardTitle>
                            <Wrench className="w-4 h-4 text-amber-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {bookings.filter(b => b.status === 'Pending').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-500 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">Completed Jobs</CardTitle>
                            <Wrench className="w-4 h-4 text-green-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {bookings.filter(b => b.status === 'Completed').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50">
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking._id} className="hover:bg-slate-50 transition-colors">
                                            <TableCell>
                                                <div className="font-medium text-slate-900">{booking.name}</div>
                                                <div className="text-sm text-slate-500 flex items-center">
                                                    <Phone className="w-3 h-3 mr-1" />
                                                    {booking.phone}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                    {booking.service}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col text-sm text-slate-600">
                                                    <span>{booking.date}</span>
                                                    <span className="text-slate-400">{booking.time}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center text-slate-600">
                                                    <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                                                    {booking.area}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    defaultValue={booking.status || 'Pending'}
                                                    onValueChange={(value) => handleStatusUpdate(booking._id, value)}
                                                >
                                                    <SelectTrigger className={`w-[140px] ${getStatusColor(booking.status || 'Pending')}`}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Pending">Pending</SelectItem>
                                                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                                                        <SelectItem value="Completed">Completed</SelectItem>
                                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
