import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
        
        <div className="bg-white rounded-2xl shadow p-8 mb-8 border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Здравствуйте, {user.first_name}!</h2>
              <p className="text-slate-500">{user.email}</p>
            </div>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
              Выйти
            </button>
          </div>

          <div className="bg-primary-50 border border-primary-100 p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 font-bold uppercase tracking-wider mb-1">Ваш код клиента</p>
              <p className="text-3xl font-mono font-bold text-primary-900">{user.client_code}</p>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(user.client_code)}
              className="bg-white border border-primary-200 text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50"
            >
              Копировать
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow p-8 border border-slate-200">
            <h3 className="text-xl font-bold mb-4">Мои посылки</h3>
            <p className="text-slate-600 mb-6">Управляйте своими посылками и отслеживайте их статус.</p>
            <button onClick={() => navigate('/my-shipments')} className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700">
              Перейти к посылкам
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 border border-slate-200">
            <h3 className="text-xl font-bold mb-4">Адрес склада в Китае</h3>
            <p className="text-slate-600 mb-2"><strong>Адрес:</strong> 广州市白云区...</p>
            <p className="text-slate-600 mb-2"><strong>Получатель:</strong> CARGO KG - {user.client_code}</p>
            <p className="text-slate-600"><strong>Телефон:</strong> 13800138000</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Profile;
