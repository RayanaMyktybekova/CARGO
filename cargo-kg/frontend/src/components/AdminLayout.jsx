import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, Package, Settings, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/clients', icon: <Users size={20} />, label: 'Клиенты' },
    { to: '/admin/shipments', icon: <Package size={20} />, label: 'Посылки' },
  ];

  if (isAdmin) {
    navItems.push({ to: '/admin/settings', icon: <Settings size={20} />, label: 'Настройки' });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-primary-900 text-white z-30
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 bg-primary-800">
          <span className="text-xl font-bold tracking-wider">📦 КАРГО KG</span>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between h-[calc(100vh-4rem)]">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-primary-800 hover:text-white'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-auto w-full"
          >
            <LogOut size={20} />
            <span className="ml-3 font-medium">Выход</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
