import { getApiUrl } from "@/config";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, Calendar, MapPin, Wrench, CheckCircle2, XCircle, Clock, Search, RefreshCw, Building2, Users, ChevronRight, Briefcase, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import socket from '@/lib/socket';
import BrandLogo from '@/components/BrandLogo';

interface Booking {
    _id: string;
    customerName: string;
    name?: string; // Support both naming conventions
    email: string;
    phone: string;
    service: string;
    address: string;
    area?: string; // Support area
    preferredDate: string;
    date?: string; // Support date
    time?: string;
    status: 'pending' | 'Pending' | 'Confirmed' | 'in-progress' | 'completed' | 'Completed' | 'canceled' | 'Cancelled';
    createdAt: string;
}

interface ServiceRequirement {
    type: string;
    units: number;
}

interface Inquiry {
    _id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    requirements: ServiceRequirement[];
    additionalNotes: string;
    status: 'Pending' | 'Quotation Sent' | 'Contacted' | 'Closed';
    quotation?: {
        amount?: number;
        notes?: string;
        pdfUrl?: string;
        sentAt: string;
    };
    adminNotes?: string;
    createdAt: string;
}

const AdminCommandCenter = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { toast } = useToast();
    const navigate = useNavigate();

    const fetchAllData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const [bookingsRes, inquiriesRes] = await Promise.all([
                fetch(getApiUrl('/api/bookings'), { headers }),
                fetch(getApiUrl('/api/bookings/inquiries'), { headers })
            ]);

            if (bookingsRes.ok) {
                const data = await bookingsRes.json();
                setBookings(data);
            } else if (bookingsRes.status === 401) {
                handleLogout();
            }

            if (inquiriesRes.ok) {
                const data = await inquiriesRes.json();
                setInquiries(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Sync Error',
                description: 'Failed to fetch latest updates from server.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    useEffect(() => {
        fetchAllData();

        // Real-time socket listeners
        socket.on('newBooking', (newBooking: Booking) => {
            setBookings(prev => [newBooking, ...prev]);
            toast({
                title: '🚨 New Booking!',
                description: `${newBooking.customerName || newBooking.name} just requested ${newBooking.service}`,
                className: "bg-blue-600 text-white border-blue-700"
            });
        });

        socket.on('newCorporateInquiry', (newInquiry: Inquiry) => {
            setInquiries(prev => [newInquiry, ...prev]);
            toast({
                title: '🏢 New Corporate Lead!',
                description: `${newInquiry.companyName} requested a quote`,
                className: "bg-amber-600 text-white border-amber-700"
            });
        });

        socket.on('inquiryStatusUpdated', (updatedInquiry: Inquiry) => {
            setInquiries(prev => prev.map(i => i._id === updatedInquiry._id ? updatedInquiry : i));
        });

        socket.on('bookingStatusUpdated', (updatedBooking: Booking) => {
            setBookings(prev => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b));
        });

        return () => {
            socket.off('newBooking');
            socket.off('newCorporateInquiry');
            socket.off('bookingStatusUpdated');
        };
    }, []);

    useEffect(() => {
        // Filter Bookings
        let bFiltered = bookings;
        if (statusFilter !== 'all') {
            bFiltered = bFiltered.filter(b => b.status.toLowerCase() === statusFilter.toLowerCase());
        }
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            bFiltered = bFiltered.filter(b =>
                (b.customerName || b.name || '').toLowerCase().includes(lowerSearch) ||
                b.phone.includes(searchTerm) ||
                b.service.toLowerCase().includes(lowerSearch)
            );
        }
        setFilteredBookings(bFiltered);

        // Filter Inquiries
        let iFiltered = inquiries;
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            iFiltered = iFiltered.filter(i =>
                i.companyName.toLowerCase().includes(lowerSearch) ||
                i.contactPerson.toLowerCase().includes(lowerSearch) ||
                i.phone.includes(searchTerm)
            );
        }
        setFilteredInquiries(iFiltered);
    }, [searchTerm, statusFilter, bookings, inquiries]);

    const updateBookingStatus = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl(`/api/bookings/${id}/status`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = 'Status update failed';
                try {
                    const data = JSON.parse(text);
                    errorMessage = data.message || errorMessage;
                } catch (e) {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            setBookings(bookings.map(b =>
                b._id === id ? { ...b, status: newStatus as any } : b
            ));
            toast({ title: 'Status Updated', description: `Booking is now: ${newStatus}` });
        } catch (error: any) {
            console.error('Booking Status Update Error:', error);
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not change status.',
                variant: 'destructive'
            });
        }
    };

    const updateInquiryStatus = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl(`/api/bookings/inquiries/${id}/status`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = 'Status update failed';
                try {
                    const data = JSON.parse(text);
                    errorMessage = data.message || errorMessage;
                } catch (e) {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            setInquiries(inquiries.map(i =>
                i._id === id ? { ...i, status: newStatus as any } : i
            ));
            toast({ title: 'Status Updated', description: `Inquiry is now: ${newStatus}` });
        } catch (error: any) {
            console.error('Inquiry Status Update Error:', error);
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not change status.',
                variant: 'destructive'
            });
        }
    };


    const getStatusBadge = (status: string) => {
        const s = status.toLowerCase();
        const variants: Record<string, string> = {
            pending: 'bg-amber-500',
            confirmed: 'bg-blue-500',
            'in-progress': 'bg-indigo-500',
            completed: 'bg-emerald-500',
            canceled: 'bg-rose-500',
            cancelled: 'bg-rose-500',
            'quotation sent': 'bg-cyan-500',
            'contacted': 'bg-slate-700'
        };
        return <Badge className={`${variants[s] || 'bg-slate-500'} text-white font-black uppercase tracking-widest text-[10px] px-3 py-1`}>{status}</Badge>;
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Premium Header Container */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner group">
                            <BrandLogo size="md" className="group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="h-12 w-px bg-slate-100 hidden md:block"></div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                Control Center
                                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time monitoring active</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xs">AD</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-slate-700">Administrator</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">System Owner</span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleLogout} className="h-12 rounded-2xl border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100 px-6 font-black transition-all active:scale-95">
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                        <Button onClick={fetchAllData} className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 p-0 shadow-sm transition-all active:rotate-180 duration-500">
                            <RefreshCw className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden bg-white group hover:shadow-md transition-all">
                        <CardContent className="p-6 md:p-8 space-y-2">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <div className="text-3xl font-black text-slate-900">{bookings.length}</div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Bookings</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden bg-white group hover:shadow-md transition-all">
                        <CardContent className="p-6 md:p-8 space-y-2">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-500">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div className="text-3xl font-black text-amber-600">{inquiries.length}</div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Corp Leads</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden bg-white group hover:shadow-md transition-all">
                        <CardContent className="p-6 md:p-8 space-y-2">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="text-3xl font-black text-indigo-600">{bookings.filter(b => ['pending', 'in-progress'].includes(b.status.toLowerCase())).length}</div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Jobs</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden bg-white group hover:shadow-md transition-all">
                        <CardContent className="p-6 md:p-8 space-y-2">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="text-3xl font-black text-emerald-600">{bookings.filter(b => b.status.toLowerCase() === 'completed').length}</div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Successful</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <Tabs defaultValue="bookings" className="w-full space-y-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <TabsList className="bg-slate-100 p-1.5 rounded-[1.5rem] border border-slate-200/50">
                            <TabsTrigger value="bookings" className="rounded-2xl font-black px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all uppercase tracking-widest text-[10px]">
                                <Users className="w-4 h-4 mr-2" />
                                Service Bookings
                            </TabsTrigger>
                            <TabsTrigger value="inquiries" className="rounded-2xl font-black px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm transition-all uppercase tracking-widest text-[10px]">
                                <Building2 className="w-4 h-4 mr-2" />
                                Corporate Leads
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    placeholder="Search names, phones, services..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 h-14 bg-white border-0 shadow-sm rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="h-14 w-full sm:w-48 bg-white border-0 shadow-sm rounded-2xl font-bold uppercase tracking-widest text-[10px] px-6">
                                    <SelectValue placeholder="STATUS FILTER" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-0 shadow-xl">
                                    <SelectItem value="all">ALL STATUS</SelectItem>
                                    <SelectItem value="pending">PENDING</SelectItem>
                                    <SelectItem value="confirmed">CONFIRMED</SelectItem>
                                    <SelectItem value="in-progress">IN PROGRESS</SelectItem>
                                    <SelectItem value="completed">COMPLETED</SelectItem>
                                    <SelectItem value="canceled">CANCELED</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <TabsContent value="bookings" className="mt-0 outline-none">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                            {filteredBookings.map((booking) => (
                                <Card key={booking._id} className="rounded-[2.5rem] border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group bg-white">
                                    <div className="bg-blue-600/5 p-8 pb-14 relative group-hover:bg-blue-600/10 transition-colors">
                                        <div className="flex justify-between items-start relative z-10">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-black text-slate-900 leading-tight">{booking.customerName || booking.name}</h3>
                                                <p className="text-blue-600 font-black uppercase tracking-widest text-[10px]">{booking.service}</p>
                                            </div>
                                            {getStatusBadge(booking.status)}
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
                                    </div>
                                    <CardContent className="p-8 -mt-8 relative z-10">
                                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1 border-r border-slate-100">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Information</p>
                                                    <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
                                                        <Phone className="w-3.5 h-3.5" /> {booking.phone}
                                                    </a>
                                                    <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                        <Mail className="w-3.5 h-3.5" /> {booking.email || 'guest@roshni.com'}
                                                    </p>
                                                </div>
                                                <div className="space-y-1 pl-2">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule</p>
                                                    <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                        <Calendar className="w-3.5 h-3.5" /> {booking.preferredDate || booking.date}
                                                    </p>
                                                    <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                        <Clock className="w-3.5 h-3.5" /> {booking.time || 'Flexible'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-slate-50 space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Area</p>
                                                <p className="flex items-start gap-2 text-sm font-bold text-slate-700 leading-snug">
                                                    <MapPin className="w-3.5 h-3.5 mt-1 text-rose-500" /> {booking.address || booking.area}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-6">
                                            {['pending', 'Pending'].includes(booking.status) && (
                                                <Button size="lg" onClick={() => updateBookingStatus(booking._id, 'Confirmed')} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-14 shadow-lg shadow-blue-600/20">
                                                    Confirm Job
                                                </Button>
                                            )}
                                            {['confirmed', 'Confirmed', 'in-progress'].includes(booking.status.toLowerCase()) && booking.status.toLowerCase() !== 'completed' && (
                                                <Button size="lg" onClick={() => updateBookingStatus(booking._id, 'Completed')} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-14 shadow-lg shadow-emerald-600/20">
                                                    Complete Job
                                                </Button>
                                            )}
                                            {!['canceled', 'cancelled', 'completed'].includes(booking.status.toLowerCase()) && (
                                                <Button size="lg" variant="ghost" onClick={() => updateBookingStatus(booking._id, 'Cancelled')} className="px-6 rounded-2xl font-black uppercase tracking-widest text-[10px] text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-14">
                                                    Cancel
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {filteredBookings.length === 0 && (
                                <div className="col-span-1 lg:col-span-2 py-20 bg-white rounded-[3rem] text-center border-2 border-dashed border-slate-100 flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                        <Clock className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching bookings found</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="inquiries" className="mt-0 outline-none">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                            {filteredInquiries.map((inquiry) => (
                                <Card key={inquiry._id} className="rounded-[2.5rem] border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group bg-white">
                                    <div className="bg-amber-600/5 p-8 pb-14 relative group-hover:bg-amber-600/10 transition-colors">
                                        <div className="flex justify-between items-start relative z-10">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-black text-slate-900 leading-tight flex items-center gap-2">
                                                    <Building2 className="w-5 h-5 text-amber-600" />
                                                    {inquiry.companyName}
                                                </h3>
                                                <p className="text-amber-600 font-black uppercase tracking-widest text-[10px]">Corporate Inquiry</p>
                                            </div>
                                            {getStatusBadge(inquiry.status)}
                                        </div>
                                    </div>
                                    <CardContent className="p-8 -mt-8 relative z-10">
                                        <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100/50 space-y-6">
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested Services</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {inquiry.requirements.map((req, idx) => (
                                                        <Badge key={idx} variant="secondary" className="bg-white border-slate-200 text-slate-800 font-bold rounded-lg px-3 py-1">
                                                            {req.type} <span className="text-amber-600 ml-1">x{req.units}</span>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Point of Contact</p>
                                                    <p className="text-sm font-black text-slate-700">{inquiry.contactPerson}</p>
                                                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
                                                        <Phone className="w-3 h-3" /> {inquiry.phone}
                                                    </a>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Email</p>
                                                    <p className="text-sm font-bold text-slate-700 truncate">{inquiry.email || 'Not Provided'}</p>
                                                </div>
                                            </div>

                                            {inquiry.additionalNotes && (
                                                <div className="p-4 bg-white rounded-2xl border border-slate-100 italic text-xs text-slate-500 leading-relaxed">
                                                    "{inquiry.additionalNotes}"
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-3 mt-8">
                                            <Select onValueChange={(val) => updateInquiryStatus(inquiry._id, val)}>
                                                <SelectTrigger className="flex-1 h-14 bg-white border-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-600">
                                                    <SelectValue placeholder="UPDATE STATUS" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-0 shadow-xl">
                                                    <SelectItem value="Pending">PENDING</SelectItem>
                                                    <SelectItem value="Contacted">CONTACTED</SelectItem>
                                                    <SelectItem value="Quotation Sent">QUOTATION SENT</SelectItem>
                                                    <SelectItem value="Closed">CLOSED</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-6 space-y-4 shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-32 rounded-lg" />
                                    <Skeleton className="h-4 w-20 rounded-md" />
                                </div>
                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>
                            <div className="space-y-3 pt-4">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-3/4 rounded" />
                            </div>
                            <div className="flex gap-3 pt-6">
                                <Skeleton className="h-12 flex-1 rounded-xl" />
                                <Skeleton className="h-12 flex-1 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default AdminCommandCenter;
