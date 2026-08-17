import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', password: '', confirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError('Пароли не совпадают');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      await login(formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      setError('Ошибка при регистрации. Возможно email уже используется.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Регистрация</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full px-3 py-3 border rounded-md" placeholder="Имя" required value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
          <input className="w-full px-3 py-3 border rounded-md" placeholder="Фамилия" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
          <input className="w-full px-3 py-3 border rounded-md" type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input className="w-full px-3 py-3 border rounded-md" placeholder="Телефон" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <input className="w-full px-3 py-3 border rounded-md" type="password" placeholder="Пароль" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input className="w-full px-3 py-3 border rounded-md" type="password" placeholder="Подтвердите пароль" required value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} />
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <div className="text-center">
            <Link to="/login" className="text-primary-600">Уже есть аккаунт? Войти</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
