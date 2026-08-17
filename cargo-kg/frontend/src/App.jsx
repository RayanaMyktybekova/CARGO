import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import Tariffs from './pages/Tariffs';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyShipments from './pages/MyShipments';
import ShipmentDetail from './pages/ShipmentDetail';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminClients from './pages/admin/Clients';
import AdminClientDetail from './pages/admin/AdminClientDetail';
import AdminShipments from './pages/admin/Shipments';
import AdminShipmentEdit from './pages/admin/ShipmentEdit';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/tariffs" element={<Tariffs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacts" element={<Contacts />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Client Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/my-shipments" element={
          <ProtectedRoute>
            <MyShipments />
          </ProtectedRoute>
        } />
        <Route path="/shipments/:id" element={
          <ProtectedRoute>
            <ShipmentDetail />
          </ProtectedRoute>
        } />

        {/* Protected Admin/Manager Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="manager">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/clients" element={
          <ProtectedRoute requiredRole="manager">
            <AdminClients />
          </ProtectedRoute>
        } />
        <Route path="/admin/clients/:id" element={
          <ProtectedRoute requiredRole="manager">
            <AdminClientDetail />
          </ProtectedRoute>
        } />
        <Route path="/admin/shipments" element={
          <ProtectedRoute requiredRole="manager">
            <AdminShipments />
          </ProtectedRoute>
        } />
        <Route path="/admin/shipments/:id" element={
          <ProtectedRoute requiredRole="manager">
            <AdminShipmentEdit />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute requiredRole="admin">
            <AdminSettings />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
