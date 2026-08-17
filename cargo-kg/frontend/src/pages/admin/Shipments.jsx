import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';
import { STATUS_LABELS } from '../../utils/constants';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchShipments();
  }, [search]);

  const fetchShipments = async () => {
    try {
      const res = await api.get('/admin/shipments', { params: { search } });
      setShipments(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const createShipment = async () => {
    // modal or navigate
    const trackCode = prompt("Введите трек-код");
    const clientCode = prompt("Введите код клиента (необязательно)");
    if(trackCode) {
      try {
        const res = await api.post('/admin/shipments', { track_code: trackCode, client_code: clientCode });
        navigate(`/admin/shipments/${res.data.id}`);
      } catch(e) {
        alert("Ошибка создания");
      }
    }
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Посылки</h1>
        <button onClick={createShipment} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
          + Добавить посылку
        </button>
      </div>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Поиск по трек-коду или клиенту" 
          className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Трек-код</th>
              <th className="p-4 font-semibold text-slate-600">Клиент</th>
              <th className="p-4 font-semibold text-slate-600">Статус</th>
              <th className="p-4 font-semibold text-slate-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-medium">{s.track_code}</td>
                <td className="p-4 font-mono text-slate-500">{s.client_code || '---'}</td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                    {STATUS_LABELS[s.current_status]}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => navigate(`/admin/shipments/${s.id}`)}
                    className="text-primary-600 hover:underline"
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
export default Shipments;
