import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tariffs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-10">Тарифы на доставку</h1>
        
        <div className="bg-white rounded-2xl shadow border p-8 max-w-4xl mx-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-4 text-xl">Вес груза</th>
                <th className="py-4 text-xl">Стоимость за 1 кг</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4">0.5 – 5 кг</td>
                <td className="py-4 font-bold text-accent-600">270 сом</td>
              </tr>
              <tr className="border-b">
                <td className="py-4">5 – 20 кг</td>
                <td className="py-4 font-bold text-accent-600">265 сом</td>
              </tr>
              <tr>
                <td className="py-4">Свыше 20 кг</td>
                <td className="py-4 font-bold text-accent-600">Договорная</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Tariffs;
