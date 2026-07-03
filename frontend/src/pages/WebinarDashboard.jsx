import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendar, FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa';

const WebinarDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, spots_taken: 39, spots_remaining: 11 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${apiUrl}/api/webinar/registrations`);
      const data = await response.json();
      
      if (data.success) {
        setRegistrations(data.registrations);
        setStats(prev => ({ ...prev, total: data.total }));
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Име', 'Имейл', 'Телефон', 'Дата на регистрация'];
    const rows = registrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      new Date(reg.registered_at).toLocaleString('bg-BG')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `webinar_registrations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C3E50] mx-auto"></div>
          <p className="mt-4 text-[#8C7A6B]">Зареждане...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Webinar Dashboard</h1>
          <p className="text-white/80">Управление на регистрации за "Защо попадаме в отношения които ни нараняват"</p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8C7A6B] mb-1">Общо регистрирани</p>
                <p className="text-4xl font-bold text-[#2C3E50]">{stats.total}</p>
              </div>
              <FaUsers className="w-12 h-12 text-[#8C7A6B]/20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8C7A6B] mb-1">Заети места</p>
                <p className="text-4xl font-bold text-orange-600">{stats.spots_taken}/50</p>
              </div>
              <FaCalendar className="w-12 h-12 text-orange-600/20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8C7A6B] mb-1">Свободни места</p>
                <p className="text-4xl font-bold text-green-600">{stats.spots_remaining}</p>
              </div>
              <FaUsers className="w-12 h-12 text-green-600/20" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#2C3E50]">Регистрирани участници ({stats.total})</h2>
            <button
              onClick={exportToCSV}
              disabled={registrations.length === 0}
              className="flex items-center gap-2 bg-[#2C3E50] hover:bg-[#34495E] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaDownload />
              <span>Експортирай CSV</span>
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        {registrations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaUsers className="w-16 h-16 text-[#8C7A6B]/20 mx-auto mb-4" />
            <p className="text-[#8C7A6B] text-lg">Все още няма регистрации</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F1EB]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#2C3E50] uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#2C3E50] uppercase tracking-wider">Име</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#2C3E50] uppercase tracking-wider">Имейл</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#2C3E50] uppercase tracking-wider">Телефон</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#2C3E50] uppercase tracking-wider">Регистриран на</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {registrations.map((reg, index) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8C7A6B]">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#2C3E50]">{reg.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-[#8C7A6B] w-4 h-4" />
                          <span className="text-sm text-[#4A4A4A]">{reg.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-[#8C7A6B] w-4 h-4" />
                          <span className="text-sm text-[#4A4A4A]">{reg.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8C7A6B]">
                        {new Date(reg.registered_at).toLocaleString('bg-BG')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebinarDashboard;
