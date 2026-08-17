import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TrackingResult from '../components/TrackingResult';
import api from '../api/axios';

const ShipmentDetail = () => {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await api.get(`/shipments/${id}`);
        setShipment(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShipment();
  }, [id]);

  if (!shipment) return <div className="p-10 text-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-5xl mx-auto w-full">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-primary-600 mb-6 font-medium">
          &larr; Назад
        </button>
        <TrackingResult shipment={shipment} />
      </main>
    </div>
  );
};
export default ShipmentDetail;
