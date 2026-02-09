import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, Calendar, MapPin, Wrench, CheckCircle2, XCircle, Clock, Search, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Booking {
    _id: string;
    customerName: string;
    email: string;
    phone: string;
    service: string;
    address: string;
    preferredDate: string;
    status: 'pending' | 'in-progress' | 'completed' | 'canceled';
    estimatedCost?: number;
    createdAt: string;
}

const AdminCommandCenter = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { toast } = useToast();

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('/api/bookings', {
                headers: {
                    'x-auth-token': token || ''
                }
            });

            if (response.ok) {
                const data = await response.json();
                setBookings(data);
                setFilteredBookings(data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch bookings',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchBookings, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let filtered = bookings;

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(b => b.status === statusFilter);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(b =>
                b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.phone.includes(searchTerm) ||
                b.service.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBookings(filtered);
    }, [searchTerm, statusFilter, bookings]);

    const updateBookingStatus = async (bookingId: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: `Booking status updated to ${newStatus}`,
                });
                fetchBookings();
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update booking status',
                variant: 'destructive'
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { color: string; icon: any }> = {
            pending: { color: 'bg-amber-500', icon: Clock },
            'in-progress': { color: 'bg-blue-500', icon: Wrench },
            completed: { color: 'bg-green-500', icon: CheckCircle2 },
            canceled: { color: 'bg-red-500', icon: XCircle }
        };

        const { color, icon: Icon } = variants[status] || variants.pending;

        return (
            <Badge className={`${color} text-white flex items-center gap-1`}>
                <Icon className="w-3 h-3" />
                {status.toUpperCase()}
            </Badge>
        );
    };

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        inProgress: bookings.filter(b => b.status === 'in-progress').length,
        completed: bookings.filter(b => b.status === 'completed').length
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900">Live Booking Command Center</h1>
                        <p className="text-slate-600 mt-1">Real-time booking management and control</p>
                    </div>
                    <Button onClick={fetchBookings} variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                            <div className="text-sm text-slate-600">Total Bookings</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                            <div className="text-sm text-slate-600">Pending</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                            <div className="text-sm text-slate-600">In Progress</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                            <div className="text-sm text-slate-600">Completed</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    placeholder="Search by name, email, phone, or service..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="canceled">Canceled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {loading ? (
                        <div className="col-span-2 text-center py-12 text-slate-600">Loading bookings...</div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="col-span-2 text-center py-12 text-slate-600">No bookings found</div>
                    ) : (
                        filteredBookings.map((booking) => (
                            <Card key={booking._id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{booking.customerName}</CardTitle>
                                            <p className="text-sm text-slate-600 mt-1">{booking.service}</p>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Phone className="w-4 h-4" />
                                            <a href={`tel:${booking.phone}`} className="hover:text-blue-600">{booking.phone}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Mail className="w-4 h-4" />
                                            <a href={`mailto:${booking.email}`} className="hover:text-blue-600">{booking.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(booking.preferredDate).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <MapPin className="w-4 h-4" />
                                            {booking.address}
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                                        {booking.status === 'pending' && (
                                            <Button
                                                size="sm"
                                                onClick={() => updateBookingStatus(booking._id, 'in-progress')}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                Start Job
                                            </Button>
                                        )}
                                        {booking.status === 'in-progress' && (
                                            <Button
                                                size="sm"
                                                onClick={() => updateBookingStatus(booking._id, 'completed')}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                Mark Complete
                                            </Button>
                                        )}
                                        {(booking.status === 'pending' || booking.status === 'in-progress') && (
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => updateBookingStatus(booking._id, 'canceled')}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCommandCenter;
