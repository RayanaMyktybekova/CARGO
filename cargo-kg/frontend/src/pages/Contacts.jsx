import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contacts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-10">Контакты</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow border">
            <h2 className="text-xl font-bold mb-4">Наш офис</h2>
            <p className="mb-2"><strong>Адрес:</strong> г. Талас, ул. Бердике Баатыр 349</p>
            <p className="mb-2"><strong>Телефон:</strong> +996 702138700</p>
            <p className="mb-6"><strong>Режим работы:</strong> Пн-Сб: 09:00 - 18:00</p>
            
            <a href="https://wa.me/996702138700" className="block w-full text-center bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 mb-3">
              Написать в WhatsApp
            </a>
            <a href="#" className="block w-full text-center bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600">
              Написать в Telegram
            </a>
          </div>
          <div>
            <div className="w-full h-full bg-slate-200 rounded-2xl min-h-[300px] flex items-center justify-center text-slate-500">
              [Карта Google Maps]
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Contacts;
