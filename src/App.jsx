import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingFunnel from './pages/BuilXLanding.jsx'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import CheckoutPage from './pages/CheckoutPage'; // 👈 Importamos la nueva página
import ProtectedRoute from './components/pays/ProtectedRoute.jsx'; 
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Zona Pública */}
        <Route path="/" element={<LandingFunnel />} />
        <Route path="/login" element={<Login />} />

        {/* 🚨 2. Sala de Espera / Pantalla de Pago (Si la cuenta está en trial/past_due caen aquí) */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* 🔒 3. Zona VIP Blindada (Solo entran si están 'active') */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/builder" 
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } 
        />

        <Route path="/register" element={<Register />} />

        {/* 4. Comodín */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;