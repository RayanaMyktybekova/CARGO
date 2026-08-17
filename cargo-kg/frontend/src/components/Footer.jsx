import React from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-slate-300 pt-16 pb-8 border-t border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 text-white mb-6">
              <span className="text-3xl">📦</span>
              <span className="font-bold text-2xl tracking-tight">Карго KG</span>
            </div>
            <p className="text-slate-400 mb-6">
              Быстрая, надёжная и прозрачная доставка товаров из Китая в Кыргызстан. Выкупаем с Taobao, 1688, Pinduoduo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white hover:bg-accent-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white hover:bg-green-500 transition-colors">
                <span className="font-bold">WA</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                <span className="font-bold">TG</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Навигация</h3>
            <ul className="space-y-4">
              <li><NavLink to="/" className="hover:text-white transition">Главная</NavLink></li>
              <li><NavLink to="/services" className="hover:text-white transition">Услуги</NavLink></li>
              <li><NavLink to="/tariffs" className="hover:text-white transition">Тарифы</NavLink></li>
              <li><NavLink to="/tracking" className="hover:text-white transition">Отслеживание</NavLink></li>
              <li><NavLink to="/faq" className="hover:text-white transition">FAQ</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Услуги</h3>
            <ul className="space-y-4">
              <li><span className="hover:text-white transition cursor-pointer">Доставка сборных грузов</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Выкуп с фабрик</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Проверка качества</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Денежные переводы в Китай</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Обучение закупкам</span></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-accent-500 flex-shrink-0 mt-1" />
                <span>г. Бишкек, ул. Киевская 100, офис 204</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent-500 flex-shrink-0" />
                <span>+996 555 123 456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-accent-500 flex-shrink-0" />
                <span>info@cargo-kg.com</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-primary-800 rounded-lg border border-primary-700 text-sm">
              <p><span className="text-white font-medium">Режим работы:</span></p>
              <p>Пн-Сб: 09:00 - 18:00</p>
              <p>Вс: Выходной</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-800 text-center text-slate-500 text-sm">
          <p>© 2026 Карго KG. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
