import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Наши услуги</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-3">Прием товаров на складе</h2>
            <p>Мы принимаем ваши товары на нашем складе в Гуанчжоу и бесплатно консолидируем их перед отправкой.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-3">Проверка качества</h2>
            <p>По запросу проверим товар на брак и соответствие заявленному описанию.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-3">Выкуп с платформ</h2>
            <p>Помогаем с выкупом товаров на Taobao, 1688, Pinduoduo, если вы не можете оплатить самостоятельно.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Services;
