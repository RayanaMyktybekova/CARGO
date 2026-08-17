import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, [search]);

  const fetchClients = async () => {
    try {
      const res = await api.get('/admin/clients', { params: { search } });
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Клиенты</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
          + Добавить клиента
        </button>
      </div>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Поиск по имени, коду или email" 
          className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Код клиента</th>
              <th className="p-4 font-semibold text-slate-600">Имя</th>
              <th className="p-4 font-semibold text-slate-600">Email</th>
              <th className="p-4 font-semibold text-slate-600">Роль</th>
              <th className="p-4 font-semibold text-slate-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-primary-600">{c.client_code}</td>
                <td className="p-4">{c.first_name} {c.last_name}</td>
                <td className="p-4 text-slate-500">{c.email}</td>
                <td className="p-4">{c.role}</td>
                <td className="p-4">
                  <button 
                    onClick={() => navigate(`/admin/clients/${c.id}`)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Просмотр
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
export default Clients;
