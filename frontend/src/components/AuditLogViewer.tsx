import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, User, Settings, FileText } from 'lucide-react';

interface AuditLog {
    _id: string;
    adminEmail: string;
    action: string;
    targetType?: string;
    targetId?: string;
    details?: any;
    ipAddress?: string;
    timestamp: string;
}

const AuditLogViewer = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionFilter, setActionFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    useEffect(() => {
        let filtered = logs;

        if (actionFilter !== 'all') {
            filtered = filtered.filter(log => log.action === actionFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(log =>
                log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.action.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredLogs(filtered);
    }, [searchTerm, actionFilter, logs]);

    const fetchAuditLogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/audit-logs?limit=100', {
                headers: { 'x-auth-token': token || '' }
            });

            if (response.ok) {
                const data = await response.json();
                setLogs(data.logs);
                setFilteredLogs(data.logs);
            }
        } catch (error) {
            console.error('Error fetching audit logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getActionBadge = (action: string) => {
        const variants: Record<string, string> = {
            LOGIN: 'bg-green-100 text-green-700',
            LOGOUT: 'bg-slate-100 text-slate-700',
            BOOKING_STATUS_CHANGE: 'bg-blue-100 text-blue-700',
            BOOKING_CANCEL: 'bg-red-100 text-red-700',
            USER_CREATE: 'bg-purple-100 text-purple-700',
            REPORT_GENERATE: 'bg-amber-100 text-amber-700',
            SETTINGS_UPDATE: 'bg-cyan-100 text-cyan-700'
        };

        return (
            <Badge className={variants[action] || 'bg-slate-100 text-slate-700'}>
                {action.replace(/_/g, ' ')}
            </Badge>
        );
    };

    const getActionIcon = (action: string) => {
        if (action.includes('USER')) return <User className="w-4 h-4" />;
        if (action.includes('BOOKING')) return <FileText className="w-4 h-4" />;
        if (action.includes('SETTINGS')) return <Settings className="w-4 h-4" />;
        return <Shield className="w-4 h-4" />;
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Admin Activity Audit Log
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-600 mb-4">
                        Complete record of all administrative actions for security and compliance
                    </p>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="Search by admin email or action..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={actionFilter} onValueChange={setActionFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Filter by action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Actions</SelectItem>
                                <SelectItem value="LOGIN">Login</SelectItem>
                                <SelectItem value="LOGOUT">Logout</SelectItem>
                                <SelectItem value="BOOKING_STATUS_CHANGE">Booking Status Change</SelectItem>
                                <SelectItem value="BOOKING_CANCEL">Booking Cancel</SelectItem>
                                <SelectItem value="REPORT_GENERATE">Report Generate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Audit Log Table */}
                    {loading ? (
                        <div className="text-center py-12 text-slate-600">Loading audit logs...</div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="text-center py-12 text-slate-600">No audit logs found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead>Admin</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Target</TableHead>
                                        <TableHead>IP Address</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredLogs.map((log) => (
                                        <TableRow key={log._id}>
                                            <TableCell className="text-sm">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="font-medium">{log.adminEmail}</TableCell>
                                            <TableCell>{getActionBadge(log.action)}</TableCell>
                                            <TableCell className="text-sm text-slate-600">
                                                {log.targetType || '-'}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600">
                                                {log.ipAddress || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditLogViewer;
