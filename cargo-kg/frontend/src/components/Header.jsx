import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, isManager } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Услуги', path: '/services' },
    { name: 'Отслеживание', path: '/tracking' },
    { name: 'Тарифы', path: '/tariffs' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Контакты', path: '/contacts' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isManager) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center space-x-2 text-primary-900">
              <span className="text-3xl">📦</span>
              <span className="font-bold text-2xl tracking-tight">Карго KG</span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-base font-medium transition-colors hover:text-accent-500
                  ${isActive ? 'text-accent-500' : 'text-slate-600'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://wa.me/996555123456" target="_blank" rel="noreferrer" className="text-green-600 font-medium hover:text-green-700 transition">
              WhatsApp
            </a>
            <button 
              onClick={handleProfileClick}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
            >
              <User size={18} />
              <span>{isAuthenticated ? (isManager ? 'Панель' : 'Кабинет') : 'Войти'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-600 hover:text-primary-600 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-white border-b border-slate-200 shadow-xl z-50">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `block px-3 py-4 rounded-md text-base font-medium border-b border-slate-100
                  ${isActive ? 'text-accent-500 bg-accent-50' : 'text-slate-800 hover:bg-slate-50'}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="mt-6 flex flex-col space-y-4 px-3">
               <a href="https://wa.me/996555123456" target="_blank" rel="noreferrer" className="text-center w-full bg-green-50 text-green-600 font-medium py-3 rounded-lg border border-green-200">
                Написать в WhatsApp
              </a>
              <button 
                onClick={handleProfileClick}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition"
              >
                <User size={20} />
                <span>{isAuthenticated ? 'Личный кабинет' : 'Войти в систему'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
