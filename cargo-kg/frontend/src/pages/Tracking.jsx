import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrackingForm from '../components/TrackingForm';
import TrackingResult from '../components/TrackingResult';
import api from '../api/axios';

const Tracking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const queryParam = searchParams.get('q');

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    }
  }, [queryParam]);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setResult(null);
    
    // Update URL without full reload
    if (query !== queryParam) {
      setSearchParams({ q: query });
    }

    try {
      const res = await api.get(`/shipments/track/${query}`);
      setResult(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Посылка с таким трек-кодом не найдена. Проверьте правильность ввода.');
      } else {
        setError('Произошла ошибка при поиске. Пожалуйста, попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Отслеживание посылки</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Введите трек-код вашей посылки, чтобы узнать её текущий статус и местоположение.
          </p>
        </div>

        <div className="mb-12">
          <TrackingForm 
            onSearch={handleSearch} 
            loading={loading} 
            initialValue={queryParam || ''} 
          />
        </div>

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <span className="text-3xl mr-4">🔍</span>
              <div>
                <h3 className="text-red-800 font-bold text-lg mb-1">Не найдено</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {result && <TrackingResult shipment={result} />}
        
        {!result && !error && !loading && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 shadow-sm">
            <div className="text-5xl mb-4 opacity-50">📦</div>
            <p>Здесь появится информация о вашей посылке после ввода трек-кода.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Tracking;
