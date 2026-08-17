import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';
import { Users, Package, Truck, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_clients: 0,
    total_shipments: 0,
    in_transit: 0,
    arrived: 0,
    delivered: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Дашборд</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><Users size={28} /></div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Всего клиентов</p>
            <p className="text-2xl font-bold text-slate-800">{stats.total_clients}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600"><Package size={28} /></div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Всего посылок</p>
            <p className="text-2xl font-bold text-slate-800">{stats.total_shipments}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-orange-100 p-4 rounded-xl text-orange-600"><Truck size={28} /></div>
          <div>
            <p className="text-slate-500 text-sm font-medium">В пути</p>
            <p className="text-2xl font-bold text-slate-800">{stats.in_transit}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-xl text-green-600"><CheckCircle size={28} /></div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Выдано</p>
            <p className="text-2xl font-bold text-slate-800">{stats.delivered}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default Dashboard;
