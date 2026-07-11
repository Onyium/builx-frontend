// src/components/templates/RealStateLujo/components/UtilidadesCatalogo.jsx

export const formatearUrlPublica = (url) => {
  // 1. Si no viene ninguna URL, devolvemos una foto elegante por defecto 
  // (para que nunca se vea el espacio en blanco roto)
  if (!url) {
    return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800";
  }

  // 2. Si la base de datos devuelve un objeto en lugar de un string 
  // (suele pasar con Supabase o algunos JSON estructurados)
  if (typeof url === 'object') {
    url = url.publicUrl || url.url || Object.values(url)[0];
  }

  // 3. Si ya es un enlace web completo (http/https), lo devolvemos intacto
  if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }

  // 4. Si guardas rutas relativas (ej. "/uploads/foto1.jpg"), 
  // puedes concatenar la URL de tu backend principal aquí si es necesario.
  // Por ahora lo devolvemos tal cual.
  return url;
};