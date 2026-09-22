import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { 
  LogOut, 
  Search, 
  Calendar, 
  Mail, 
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Package
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return null;
    }
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }, [navigate]);

  const fetchStats = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      const response = await axios.get(`${BACKEND_URL}/api/admin/bookings/stats`, headers);
      setStats(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
      console.error('Error fetching stats:', error);
    }
  }, [getAuthHeaders, navigate]);

  const fetchBookings = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (search) params.append('search', search);

      const response = await axios.get(
        `${BACKEND_URL}/api/admin/bookings?${params.toString()}`,
        headers
      );
      setBookings(response.data.bookings);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  }, [getAuthHeaders, navigate, search, statusFilter]);

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, [fetchBookings, fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_expires_at');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('bg-BG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C7A6B] mx-auto mb-4"></div>
          <p className="text-[#4A4A4A]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard min-h-screen bg-[#F5F1EB]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#D8CFC4]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-[#2C2C2C]">
              Admin Dashboard
            </h1>
            <p className="text-[#8C7A6B]">milenapetrova.bg</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#8C7A6B] text-[#8C7A6B] hover:bg-[#8C7A6B] hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8C7A6B] mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold text-[#2C2C2C]">{stats.total_bookings}</p>
                  </div>
                  <Users className="w-10 h-10 text-[#8C7A6B] opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8C7A6B] mb-1">Confirmed</p>
                    <p className="text-3xl font-bold text-green-600">{stats.confirmed_bookings}</p>
                  </div>
                  <CheckCircle2 className="w-10 h-10 text-green-600 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8C7A6B] mb-1">Canceled</p>
                    <p className="text-3xl font-bold text-red-600">{stats.canceled_bookings}</p>
                  </div>
                  <XCircle className="w-10 h-10 text-red-600 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8C7A6B] mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-[#2C2C2C]">€{stats.total_revenue.toFixed(0)}</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-[#8C7A6B] opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="bg-white border-none shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-[#8C7A6B]" />
                <Input
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-[#D8CFC4] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]"
              >
                <option value="">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="bg-white border-none shadow-lg">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl text-[#2C2C2C] mb-6">
              Recent Bookings
            </h2>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-[#8C7A6B]">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.invitee_name || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#8C7A6B]" />
                            {booking.invitee_email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#8C7A6B]" />
                            {booking.event_type_name || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#8C7A6B]" />
                            {formatDate(booking.event_start_time)}
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">
                          {booking.payment_amount && booking.payment_currency ? (
                            `€${booking.payment_amount}`
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-[#8C7A6B]">
                          {formatDate(booking.created_at)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
