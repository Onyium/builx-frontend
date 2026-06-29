import React, { useState } from 'react';
import Animacion from './components/Animacion';

export default function Footer({ footerConfig, theme, contacto, faq, getUrl }) {
  const [faqAbierta, setFaqAbierta] = useState(null);

  if (!footerConfig || !theme) return null;

  return (
    <footer 
      id="footer"
      className="w-full min-h-screen flex flex-col pt-24 pb-12 px-6 lg:px-20 border-t border-gray-300/50" 
      style={{ backgroundColor: theme.bgBeige, color: theme.textDark }}
    >
      {/* SECCIÓN 1: Título y Preguntas Frecuentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl mx-auto flex-1 mb-20">
        
        <div className="flex flex-col justify-center">
          <Animacion direccion="izquierda" retraso="delay-100">
            <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight" style={{ color: theme.bgGreen }}>
              {footerConfig.frase_final} <br/>
              <span className="italic font-light">{footerConfig.frase_cursiva}</span>
            </h2>
          </Animacion>
        </div>

        <div className="flex flex-col justify-center">
          <Animacion direccion="derecha" retraso="delay-300">
            <h3 className="text-sm tracking-widest uppercase mb-8 font-bold opacity-70">Preguntas Frecuentes</h3>
            <div className="space-y-4">
              {faq && faq.map((item, index) => (
                <div key={index} className="border-b border-gray-300/50 pb-4">
                  <button 
                    onClick={() => setFaqAbierta(faqAbierta === index ? null : index)}
                    className="w-full text-left flex justify-between items-center font-serif text-xl hover:text-opacity-70 transition-colors"
                    style={{ color: theme.accentOrange }}
                  >
                    {item.pregunta}
                    <span className="text-2xl font-light text-gray-500">{faqAbierta === index ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${faqAbierta === index ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm leading-relaxed opacity-80">
                      {item.respuesta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Animacion>
        </div>
      </div>

      {/* SECCIÓN 2: Mapa y Contacto */}
      {contacto && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-300/50 pt-16">
          
          {/* Mapa de Google */}
          <Animacion direccion="arriba">
            <div className="w-full h-64 md:h-full min-h-[250px] rounded-lg overflow-hidden shadow-md">
              {contacto.mapa_embed_url ? (
                <iframe 
                  src={contacto.mapa_embed_url} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Mapa de ubicación"
                ></iframe>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Mapa no disponible</div>
              )}
            </div>
          </Animacion>

          {/* Datos y Redes */}
          <Animacion direccion="arriba" retraso="delay-300">
            <div className="flex flex-col justify-center h-full space-y-8">
              <div>
                <h4 className="text-xs tracking-widest uppercase font-bold opacity-50 mb-2">Ubicación</h4>
                <p className="font-serif text-xl">{contacto.direccion}</p>
              </div>
              
              <div>
                <h4 className="text-xs tracking-widest uppercase font-bold opacity-50 mb-2">Contacto</h4>
                <p className="font-serif text-xl">{contacto.telefono}</p>
                <a href={`mailto:${contacto.email}`} className="text-sm opacity-80 hover:underline">{contacto.email}</a>
              </div>

              {/* Redes Sociales */}
              {contacto.social && (
                <div className="flex gap-4 pt-4">
                  {contacto.social.whatsapp && (
                    <a href={contacto.social.whatsapp} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" style={{ color: theme.bgGreen }}>
                      {/* Icono WhatsApp */}
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824z"/></svg>
                    </a>
                  )}
                  {contacto.social.instagram && (
                    <a href={contacto.social.instagram} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" style={{ color: theme.bgGreen }}>
                      {/* Icono Instagram */}
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                    </a>
                  )}
                  {contacto.social.facebook && (
                    <a href={contacto.social.facebook} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" style={{ color: theme.bgGreen }}>
                      {/* Icono Facebook */}
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </Animacion>

        </div>
      )}
    </footer>
  );
}