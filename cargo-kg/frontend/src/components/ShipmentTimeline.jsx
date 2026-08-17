import React from 'react';
import { STATUS_ORDER, STATUS_LABELS, STATUS_ICONS } from '../utils/constants';
import { Check } from 'lucide-react';

const ShipmentTimeline = ({ currentStatus, history }) => {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  // Group history by status to find the latest update for each status
  const historyMap = history.reduce((acc, event) => {
    // Keep the most recent or detailed event for a status
    if (!acc[event.status] || new Date(event.date) > new Date(acc[event.status].date)) {
      acc[event.status] = event;
    }
    return acc;
  }, {});

  return (
    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-4">
      {STATUS_ORDER.map((statusKey, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;
        
        const eventData = historyMap[statusKey];

        return (
          <div key={statusKey} className={`relative pl-8 md:pl-10 transition-opacity duration-300 ${isFuture ? 'opacity-40' : 'opacity-100'}`}>
            {/* Timeline Dot */}
            <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center
              ${isCompleted ? 'border-green-500 bg-green-500' : 
                isCurrent ? 'border-primary-500 ring-4 ring-primary-100' : 
                'border-slate-300'}`}
            >
              {isCompleted && <Check size={12} className="text-white" />}
              {isCurrent && <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>}
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{STATUS_ICONS[statusKey]}</span>
                  <h4 className={`font-bold text-lg ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                    {STATUS_LABELS[statusKey]}
                  </h4>
                </div>
                
                {eventData && eventData.location && (
                  <p className="text-slate-600 mt-1 flex items-center gap-1 text-sm">
                    <span className="font-medium text-slate-700">Локация:</span> {eventData.location}
                  </p>
                )}
                
                {eventData && eventData.comment && (
                  <p className="text-slate-500 mt-1 italic text-sm">
                    "{eventData.comment}"
                  </p>
                )}
              </div>

              {eventData && eventData.date && (
                <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md inline-block mt-2 md:mt-0">
                  {new Date(eventData.date).toLocaleString('ru-RU', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute:'2-digit'
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShipmentTimeline;
