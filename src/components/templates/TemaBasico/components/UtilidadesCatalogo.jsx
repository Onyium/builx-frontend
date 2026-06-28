import React from 'react';

export const formatearUrlPublica = (rawUrl) => {
  if (!rawUrl) return 'https://via.placeholder.com/600x400?text=Sin+Imagen';
  const BACKEND_URL = "https://builx-api.onrender.com";
  
  let limpia = String(rawUrl).replace(/[\[\]"'\\]/g, '').trim();
  
  if (limpia.includes('cloudinary.com')) {
    const posicionRealHttp = limpia.lastIndexOf('http');
    if (posicionRealHttp !== -1) {
      limpia = limpia.substring(posicionRealHttp); 
    }
  }
  
  limpia = limpia.replace('https//', 'https://').replace('http//', 'http://');
  if (limpia.startsWith('http')) return limpia; 
  return limpia.startsWith('/') ? `${BACKEND_URL}${limpia}` : `${BACKEND_URL}/${limpia}`;
};