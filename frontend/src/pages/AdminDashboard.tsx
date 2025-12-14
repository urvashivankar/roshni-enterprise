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
import { LogOut, Calendar, Phone, MapPin, Wrench } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Booking {
    _id: string;
    service: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    area: string;
    createdAt: string;
}

const AdminDashboard = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-slate-500">Welcome back, Admin</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
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
                            <div className="text-3xl font-bold">{bookings.length}</div>
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
                                                <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                                                    Pending
                                                </Badge>
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
