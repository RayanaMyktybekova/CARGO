import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const Settings = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border max-w-2xl">
        <p className="text-slate-600 mb-4">Настройки тарифов и контактов управляются через переменные окружения (.env) на сервере.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Базовый тариф за 1 кг</label>
            <input type="text" disabled value="265" className="mt-1 w-full p-2 border rounded bg-slate-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Номер WhatsApp</label>
            <input type="text" disabled value="+996555123456" className="mt-1 w-full p-2 border rounded bg-slate-50" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default Settings;
