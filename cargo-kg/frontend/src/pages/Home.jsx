import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrackingForm from '../components/TrackingForm';
import { ShieldCheck, Truck, Clock, PackageCheck, Headphones, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [calcWeight, setCalcWeight] = useState(1);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleTrackingSearch = (query) => {
    navigate(`/tracking?q=${query}`);
  };

  const faqs = [
    { q: 'Как получить адрес склада в Китае?', a: 'После регистрации на сайте, в личном кабинете вы получите индивидуальный код клиента и точный адрес нашего склада в Гуанчжоу.' },
    { q: 'Какие сроки доставки?', a: 'В среднем доставка из Китая в Бишкек занимает от 10 до 15 дней с момента отправки со склада в Китае.' },
    { q: 'Какая минимальная стоимость доставки?', a: 'Стоимость доставки составляет от 265 сом за 1 кг. Минимальный расчетный вес - 100 грамм.' },
    { q: 'Как отследить посылку?', a: 'Вы можете отследить статус посылки на главной странице или в разделе "Отслеживание", введя трек-код. Также все посылки отображаются в личном кабинете.' },
    { q: 'Страхуете ли вы груз?', a: 'Да, мы предоставляем услугу страхования груза. Стоимость страховки составляет 2-5% от заявленной стоимости товара.' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-primary-900 overflow-hidden pt-20 pb-32">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-accent-500 blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-primary-800 text-accent-400 font-semibold text-sm mb-6 border border-primary-700 shadow-inner">
                Надежный партнёр по логистике
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Прямые закупки из Китая <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-yellow-400">
                  выгодно и просто
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Получите личный адрес склада в Китае за 5 минут. Доставка в Кыргызстан от 265 сом за кг. Быстро, надежно, с онлайн-отслеживанием.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 shadow-lg shadow-accent-500/30"
                >
                  Получить адрес склада
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('tracking-section').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-full transition-all"
                >
                  Отследить посылку
                </button>
              </div>
            </div>

            {/* Floating Tracking Form */}
            <div id="tracking-section" className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-full px-4">
              <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20">
                <TrackingForm onSearch={handleTrackingSearch} loading={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Spacer for floating form */}
        <div className="h-32 bg-white"></div>

        {/* Trust Bar */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-nowrap overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-between items-center gap-8 text-slate-500 font-medium">
              <div className="flex items-center gap-2 whitespace-nowrap"><ShieldCheck className="text-primary-500" /> 3+ года опыта</div>
              <div className="flex items-center gap-2 whitespace-nowrap"><PackageCheck className="text-accent-500" /> 10 000+ доставок</div>
              <div className="flex items-center gap-2 whitespace-nowrap"><MapPin className="text-blue-500" /> Свой склад в Китае</div>
              <div className="flex items-center gap-2 whitespace-nowrap"><Clock className="text-green-500" /> От 10 дней в пути</div>
              <div className="flex items-center gap-2 whitespace-nowrap"><Headphones className="text-purple-500" /> Поддержка 24/7</div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Как это работает?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Всего 3 простых шага отделяют вас от получения товаров из Китая по самым выгодным ценам.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-300"></div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-primary-600 shadow-xl border-4 border-slate-50 mb-6 z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-primary-100">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Регистрация</h3>
                <p className="text-slate-600">Пройдите быструю регистрацию и получите индивидуальный код клиента и адрес нашего склада в Китае.</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-accent-500 shadow-xl border-4 border-slate-50 mb-6 z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-accent-100">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Покупка</h3>
                <p className="text-slate-600">Совершайте покупки на Taobao, 1688, Pinduoduo, указывая наш адрес склада и ваш код клиента для доставки.</p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-green-500 shadow-xl border-4 border-slate-50 mb-6 z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-green-100">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Получение</h3>
                <p className="text-slate-600">Отслеживайте статус посылки в личном кабинете и забирайте груз в нашем офисе в Бишкеке.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
              <div className="p-10 md:w-1/2 text-white">
                <h2 className="text-3xl font-bold mb-4">Рассчитать стоимость</h2>
                <p className="text-primary-200 mb-8">Узнайте примерную стоимость доставки вашего груза из Китая в Бишкек.</p>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2 text-primary-200">Вес груза (кг)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    className="w-full h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
                  />
                  <div className="flex justify-between mt-2 text-xs text-primary-300">
                    <span>1 кг</span>
                    <span className="font-bold text-white text-base">{calcWeight} кг</span>
                    <span>100+ кг</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent-500 p-10 md:w-1/2 flex flex-col justify-center items-center text-white text-center">
                <span className="text-accent-100 font-medium mb-2 uppercase tracking-wide text-sm">Примерная стоимость</span>
                <div className="text-5xl font-bold mb-2">{(calcWeight * 265).toLocaleString()} сом</div>
                <div className="text-sm text-accent-100 mb-8">({calcWeight} кг × 265 сом)</div>
                
                <button 
                  onClick={() => navigate('/register')}
                  className="w-full bg-white text-accent-600 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition shadow-lg"
                >
                  Начать работу
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Частые вопросы</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between font-bold text-slate-800 focus:outline-none"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span className="text-left pr-4">{faq.q}</span>
                    <span className={`transform transition-transform duration-300 text-primary-500 ${activeFaq === index ? 'rotate-180' : ''}`}>
                      <ChevronDown size={20} />
                    </span>
                  </button>
                  
                  <div 
                    className={`px-6 transition-all duration-300 ease-in-out ${
                      activeFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
