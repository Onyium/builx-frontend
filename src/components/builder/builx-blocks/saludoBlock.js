// src/builx-blocks/saludoBlock.js

export const saludoBlock = {
  id: 'bienvenida-bloque',
  opciones: {
    label: '👋 Saludo Inicial',
    category: 'Secciones',
    content: `
      <section style="padding: 40px; text-align: center; background-color: #ffffff; border: 2px solid #3b82f6; border-radius: 12px; margin: 10px;">
        <img src="{{logo_url}}" alt="Logo Empresa" style="max-height: 80px; margin-bottom: 20px; object-fit: contain;">
        
        <h1 style="color: #1e3a8a; font-family: sans-serif; margin-top: 0;">Bienvenido a {{nombre}}</h1>
        <p style="color: #64748b;">Estamos listos para atenderte con calidad premium.</p>
      </section>
    `,
  }
};