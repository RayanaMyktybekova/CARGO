import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api/axios';
import { STATUS_LABELS } from '../utils/constants';

const MyShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await api.get('/shipments/my');
        setShipments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Мои посылки</h1>
          <button onClick={() => navigate('/profile')} className="text-primary-600 hover:underline font-medium">
            &larr; Назад в профиль
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">Загрузка...</div>
        ) : shipments.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow border">
            <h3 className="text-xl font-bold mb-2">У вас пока нет посылок</h3>
            <p className="text-slate-500">Как только вы закажете товар на наш склад, посылка появится здесь.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden border">
            <table className="w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 font-bold text-slate-600">Трек-код</th>
                  <th className="p-4 font-bold text-slate-600">Статус</th>
                  <th className="p-4 font-bold text-slate-600">Вес</th>
                  <th className="p-4 font-bold text-slate-600">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipments.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-4 font-mono font-medium">{s.track_code}</td>
                    <td className="p-4">
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                        {STATUS_LABELS[s.current_status]}
                      </span>
                    </td>
                    <td className="p-4">{s.weight ? `${s.weight} кг` : '-'}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => navigate(`/shipments/${s.id}`)}
                        className="text-accent-600 font-medium hover:underline"
                      >
                        Подробнее
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
export default MyShipments;
