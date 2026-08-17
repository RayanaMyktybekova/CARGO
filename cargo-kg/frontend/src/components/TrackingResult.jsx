import React from 'react';
import ShipmentTimeline from './ShipmentTimeline';
import { STATUS_LABELS, STATUS_COLORS, STATUS_ICONS } from '../utils/constants';
import { Package, Calendar, MapPin, Scale } from 'lucide-react';

const TrackingResult = ({ shipment }) => {
  if (!shipment) return null;

  const currentStatus = shipment.current_status;
  const colorClass = STATUS_COLORS[currentStatus] || 'slate';

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header Info */}
      <div className="bg-primary-900 p-6 md:p-8 text-white relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary-800 opacity-50 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <span>Трек-код: {shipment.track_code}</span>
            </h2>
            <div className="text-primary-200 flex items-center gap-2">
              <span className="font-medium bg-primary-800 px-3 py-1 rounded-full text-sm">
                Код клиента: {shipment.client_code}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-sm text-primary-200">Текущий статус</span>
            <div className={`px-4 py-2 rounded-lg font-bold text-lg flex items-center gap-2 shadow-sm
              ${colorClass === 'blue' ? 'bg-blue-100 text-blue-800' : 
                colorClass === 'green' ? 'bg-green-100 text-green-800' : 
                colorClass === 'orange' ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-800'}`}
            >
              <span className="text-2xl">{STATUS_ICONS[currentStatus]}</span>
              {STATUS_LABELS[currentStatus]}
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-b border-slate-100 bg-slate-50">
        <div className="p-4 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow-sm text-primary-500"><Calendar size={20} /></div>
          <div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Принято в Китае</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              {new Date(shipment.date_received).toLocaleDateString('ru-RU')}
            </div>
          </div>
        </div>
        
        <div className="p-4 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow-sm text-accent-500"><Calendar size={20} /></div>
          <div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Отправлено</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              {shipment.date_sent ? new Date(shipment.date_sent).toLocaleDateString('ru-RU') : 'Ожидается'}
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow-sm text-blue-500"><MapPin size={20} /></div>
          <div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Локация</div>
            <div className="font-semibold text-slate-800 mt-0.5 truncate" title={shipment.current_location || 'Не указана'}>
              {shipment.current_location || 'Не указана'}
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow-sm text-green-500"><Scale size={20} /></div>
          <div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Вес</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              {shipment.weight ? `${shipment.weight} кг` : 'Взвешивается'}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-8">История перемещений</h3>
        <ShipmentTimeline currentStatus={shipment.current_status} history={shipment.history || []} />
      </div>
    </div>
  );
};

export default TrackingResult;
