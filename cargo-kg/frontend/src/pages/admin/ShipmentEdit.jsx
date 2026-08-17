import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';
import { STATUS_ORDER, STATUS_LABELS } from '../../utils/constants';

const ShipmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipmentData, setShipmentData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [statusForm, setStatusForm] = useState({
    status: '',
    location: '',
    comment: ''
  });

  useEffect(() => {
    fetchShipment();
  }, [id]);

  const fetchShipment = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/shipments/${id}`);
      const s = res.data.shipment || res.data;
      const h = res.data.history || [];
      setShipmentData(s);
      setHistory(h);
      setStatusForm(prev => ({
        ...prev,
        status: s.current_status || 'received_in_china'
      }));
    } catch (err) {
      console.error('Error fetching shipment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccessMsg('');
    try {
      await api.post(`/admin/shipments/${id}/status`, {
        status: statusForm.status,
        location: statusForm.location || null,
        comment: statusForm.comment || null
      });
      setSuccessMsg('Статус успешно обновлён!');
      setStatusForm(prev => ({ ...prev, location: '', comment: '' }));
      await fetchShipment();
    } catch (err) {
      console.error(err);
      alert('Ошибка обновления статуса: ' + (err.response?.data?.detail || err.message));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <AdminLayout><div className="p-6">Загрузка данных посылки...</div></AdminLayout>;
  if (!shipmentData) return <AdminLayout><div className="p-6 text-red-600">Посылка не найдена</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Редактирование посылки №{shipmentData.track_code}</h1>
        <button onClick={() => navigate('/admin/shipments')} className="text-blue-600 hover:underline">
          ← Назад к списку
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium">
          ✅ {successMsg}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipment Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Информация о посылке</h2>
          <div className="space-y-3 text-slate-700">
            <p><strong>Трек-код:</strong> <span className="font-mono text-blue-700 font-bold">{shipmentData.track_code}</span></p>
            <p><strong>Код клиента:</strong> <span className="font-mono font-semibold">{shipmentData.client?.client_code || '—'}</span></p>
            <p><strong>Клиент:</strong> {shipmentData.client ? `${shipmentData.client.first_name} ${shipmentData.client.last_name}` : 'Не привязан'}</p>
            <p><strong>Текущий статус:</strong> <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">{STATUS_LABELS[shipmentData.current_status] || shipmentData.current_status}</span></p>
            <p><strong>Текущая локация:</strong> {shipmentData.current_location || 'Не указана'}</p>
            <p><strong>Вес:</strong> {shipmentData.weight ? `${shipmentData.weight} кг` : 'Не указан'}</p>
            <p><strong>Дата отправки:</strong> {shipmentData.date_sent || '—'}</p>
          </div>

          {/* History Timeline */}
          <h3 className="text-lg font-bold mt-8 mb-4 border-b pb-2 text-slate-800">История изменений статусов</h3>
          <div className="space-y-4">
            {history.length === 0 ? (
              <p className="text-slate-400 text-sm">История пуста</p>
            ) : (
              history.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-slate-800">{STATUS_LABELS[item.status] || item.status}</p>
                    {item.location && <p className="text-slate-500 text-xs">📍 {item.location}</p>}
                    {item.comment && <p className="text-slate-600 text-xs italic">💬 {item.comment}</p>}
                    <p className="text-slate-400 text-xs mt-0.5">{new Date(item.created_at).toLocaleString('ru-RU')}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Update Status Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-200">
          <h2 className="text-xl font-bold mb-4 text-orange-600 border-b pb-2">Обновить статус</h2>
          <form onSubmit={handleUpdateStatus} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Новый статус</label>
              <select 
                value={statusForm.status}
                onChange={(e) => setStatusForm({...statusForm, status: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                required
              >
                {STATUS_ORDER.map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Текущая локация</label>
              <input 
                type="text" 
                placeholder="Например: Бишкек, Главный склад" 
                value={statusForm.location}
                onChange={(e) => setStatusForm({...statusForm, location: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Комментарий клиенту</label>
              <textarea 
                rows="3"
                placeholder="Например: Груз взвешен и готов к выдаче в офисе" 
                value={statusForm.comment}
                onChange={(e) => setStatusForm({...statusForm, comment: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={updating}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
            >
              {updating ? 'Сохранение...' : 'Обновить статус'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ShipmentEdit;
