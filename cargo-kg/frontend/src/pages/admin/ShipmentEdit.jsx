import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';
import { STATUS_ORDER, STATUS_LABELS } from '../../utils/constants';

const ShipmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
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
      const res = await api.get(`/admin/shipments/${id}`);
      setShipment(res.data);
      setStatusForm({ ...statusForm, status: res.data.current_status });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/admin/shipments/${id}/status`, statusForm);
      fetchShipment();
      setStatusForm({ ...statusForm, location: '', comment: '' });
    } catch (err) {
      alert('Ошибка обновления статуса');
    }
  };

  if (!shipment) return <AdminLayout>Загрузка...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Редактирование посылки</h1>
        <button onClick={() => navigate('/admin/shipments')} className="text-slate-500 hover:underline">
          Назад к списку
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Информация</h2>
          <p><strong>Трек-код:</strong> {shipment.track_code}</p>
          <p><strong>Код клиента:</strong> {shipment.client_code}</p>
          <p><strong>Текущий статус:</strong> {STATUS_LABELS[shipment.current_status]}</p>
          <p><strong>Вес:</strong> {shipment.weight} кг</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-accent-200">
          <h2 className="text-xl font-bold mb-4 text-accent-600">Обновить статус</h2>
          <form onSubmit={handleUpdateStatus} className="space-y-4">
            <select 
              value={statusForm.status}
              onChange={(e) => setStatusForm({...statusForm, status: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {STATUS_ORDER.map(s => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Локация (например, Гуанчжоу или Хоргос)" 
              value={statusForm.location}
              onChange={(e) => setStatusForm({...statusForm, location: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <textarea 
              placeholder="Комментарий" 
              value={statusForm.comment}
              onChange={(e) => setStatusForm({...statusForm, comment: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-accent-500 text-white p-2 rounded hover:bg-accent-600">
              Добавить статус
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ShipmentEdit;
