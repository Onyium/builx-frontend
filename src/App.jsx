import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingFunnel from './pages/BuilXLanding.jsx'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import CheckoutPage from './pages/CheckoutPage'; // 👈 Importamos la nueva página
import ProtectedRoute from './components/pays/ProtectedRoute.jsx'; 
import Register from './pages/register';
import PaginaLegal from './components/BuilxLanding/PaginaLegal.jsx';

const terminosTexto = `
  <h3>1. Aceptación de los Términos</h3>
  <p>Al acceder y utilizar la plataforma BuilX, usted acepta estar sujeto a estos Términos de Servicio. Nuestra plataforma proporciona herramientas de software como servicio (SaaS) para la creación de catálogos digitales.</p>
  <h3>2. Uso de la Plataforma</h3>
  <p>BuilX proporciona la infraestructura tecnológica. Usted es el único responsable de los productos, servicios, descripciones, precios e imágenes que suba a su catálogo. Está estrictamente prohibido utilizar BuilX para comercializar productos ilegales, regulados sin licencia, o que infrinjan derechos de autor.</p>
  <h3>3. Pagos y Suscripción</h3>
  <p>El acceso a las funciones premium de BuilX requiere una suscripción mensual de $15.00 USD. Los pagos se procesan de forma segura a través de nuestro proveedor de pagos (Merchant of Record). Nos reservamos el derecho de suspender el servicio si el pago no puede ser procesado.</p>
  <h3>4. Limitación de Responsabilidad</h3>
  <p>BuilX no interviene en las transacciones entre usted y sus clientes finales (las cuales se realizan vía WhatsApp o métodos externos). Por lo tanto, no nos hacemos responsables por disputas, reembolsos, logística o problemas derivados de sus ventas.</p>
`;
const privacidadTexto = `
  <h3>1. Información que Recopilamos</h3>
  <p>Recopilamos la información necesaria para brindarle el servicio, incluyendo: nombre, correo electrónico, datos de contacto de su negocio y credenciales de acceso. No almacenamos datos de tarjetas de crédito en nuestros servidores; estos son manejados por nuestra pasarela de pagos segura.</p>
  <h3>2. Uso de la Información</h3>
  <p>Utilizamos sus datos exclusivamente para: proporcionarle acceso al panel de administración de BuilX, enviarle notificaciones sobre su cuenta, procesar el cobro de su suscripción y mejorar el rendimiento de nuestra plataforma.</p>
  <h3>3. Protección de Datos</h3>
  <p>Implementamos medidas de seguridad de nivel de industria para proteger su información. Nunca venderemos, alquilaremos ni compartiremos sus datos personales con terceros para fines publicitarios.</p>
`;
const reembolsosTexto = `
  <h3>1. Política de Suscripción</h3>
  <p>BuilX opera bajo un modelo de suscripción mensual de pago anticipado ($15.00 USD/mes). Usted puede cancelar su suscripción en cualquier momento desde su panel de control para evitar futuros cobros.</p>
  <h3>2. Política de Reembolsos</h3>
  <p>Debido a la naturaleza digital de nuestro software (SaaS), <strong>no ofrecemos reembolsos por meses parciales no utilizados</strong>. Si usted decide cancelar su cuenta a mitad de mes, mantendrá el acceso a las herramientas de BuilX hasta que finalice su ciclo de facturación actual.</p>
  <h3>3. Excepciones</h3>
  <p>Solo se emitirán reembolsos en casos excepcionales donde se demuestre que un cobro duplicado fue realizado por un error técnico de nuestra plataforma o de nuestro procesador de pagos. Para disputar un cobro, contacte a nuestro soporte.</p>
`;

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
        <Route path="/terminos" element={<PaginaLegal titulo="Términos de Servicio" contenido={terminosTexto} />} />
        <Route path="/privacidad" element={<PaginaLegal titulo="Política de Privacidad" contenido={privacidadTexto} />} />
        <Route path="/reembolsos" element={<PaginaLegal titulo="Política de Reembolsos" contenido={reembolsosTexto} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;