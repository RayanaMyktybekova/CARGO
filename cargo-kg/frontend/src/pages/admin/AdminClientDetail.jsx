import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axios';

const AdminClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get(`/admin/clients/${id}`);
        setClient(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClient();
  }, [id]);

  if (!client) return <AdminLayout>Загрузка...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Профиль клиента: {client.client_code}</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
        <p><strong>Имя:</strong> {client.first_name} {client.last_name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Телефон:</strong> {client.phone}</p>
        <p><strong>Роль:</strong> {client.role}</p>
      </div>
      <h2 className="text-xl font-bold mb-4">Посылки клиента</h2>
      <div className="bg-white rounded-xl shadow-sm border p-4">
        (Здесь будет список посылок)
      </div>
    </AdminLayout>
  );
};
export default AdminClientDetail;
