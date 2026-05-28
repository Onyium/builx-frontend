import React, { useEffect } from 'react';

const BotonSuscripcion = ({ empresaId, emailEmpresa }) => {
  
  // 1. Configuramos los datos de Lemon Squeezy
  // REEMPLAZA: 'tu-tienda' por el nombre de tu tienda en Lemon Squeezy
  // REEMPLAZA: '12345' por el Variant ID de tu producto de $9.99
  const variantId = "715a2b85-e0d9-49d4-9f48-9e3193e44049"; 
  const storeUrl = "https://builx.lemonsqueezy.com";
  
  // 2. Construimos la URL con los datos ocultos (empresa_id)
  const checkoutUrl = `${storeUrl}/checkout/buy/${variantId}?checkout[custom][empresa_id]=${empresaId}&checkout[email]=${emailEmpresa}&embed=1`;

  useEffect(() => {
    // Esto inicializa Lemon Squeezy cuando el componente carga
    if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <a
        href={checkoutUrl}
        className="lemonsqueezy-button"
        style={{
          display: 'inline-block',
          backgroundColor: '#deff9a', // El color verde BuilX que te gusta
          color: '#000',
          padding: '16px 32px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '16px',
          boxShadow: '0 4px 14px rgba(222, 255, 154, 0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        <i className="fa-solid fa-bolt" style={{ marginRight: '8px' }}></i>
        Activar BuilX Pro — $9.99/mes
      </a>
    </div>
  );
};

export default BotonSuscripcion;