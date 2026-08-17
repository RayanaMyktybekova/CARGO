import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TrackingForm = ({ onSearch, loading, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white p-2 rounded-full shadow-lg border border-slate-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
        <div className="pl-4 text-slate-400">
          <Search size={24} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите трек-код посылки (например, CN123456789)"
          className="w-full py-3 px-4 outline-none text-slate-800 text-lg bg-transparent placeholder-slate-400"
          required
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Отследить'
          )}
        </button>
      </div>
      <p className="text-center text-sm text-slate-500 mt-4">
        Узнайте статус вашей посылки в реальном времени
      </p>
    </form>
  );
};

export default TrackingForm;
