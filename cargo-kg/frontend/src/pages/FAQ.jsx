import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: 'Как получить адрес склада в Китае?', a: 'После регистрации вы получите индивидуальный код клиента и адрес склада.' },
    { q: 'Какие сроки доставки?', a: 'От 10 до 15 дней с момента отправки со склада.' },
    { q: 'Как отследить посылку?', a: 'На странице отслеживания по трек-коду или в личном кабинете.' },
    { q: 'Что запрещено к перевозке?', a: 'Оружие, наркотики, взрывчатые вещества, жидкости, батареи (уточняйте).' },
    { q: 'Как оплатить доставку?', a: 'Оплата производится при получении в нашем офисе.' },
    { q: 'Страхуете ли вы груз?', a: 'Да, страховка составляет 2-5% от стоимости товара.' },
    { q: 'Могу ли я заказать на свой адрес?', a: 'Да, есть курьерская доставка по городу Бишкек.' },
    { q: 'Как связаться с поддержкой?', a: 'Вы можете написать нам в WhatsApp или Telegram.' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-10">Часто задаваемые вопросы</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow border overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-slate-800"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <span className="text-left">{faq.q}</span>
                <ChevronDown size={20} className={`transform transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-4 text-slate-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default FAQ;
