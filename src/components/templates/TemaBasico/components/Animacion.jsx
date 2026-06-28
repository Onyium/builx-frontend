import React, { useEffect, useRef, useState } from 'react';

export default function Animacion({ 
  children, 
  direccion = 'arriba', // Opciones: 'arriba', 'abajo', 'izquierda', 'derecha', 'fade'
  retraso = 'delay-0',  // Clases de Tailwind como 'delay-150', 'delay-300', etc.
  duracion = 'duration-1000' 
}) {
  const domRef = useRef();
  const [esVisible, setEsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        // Cuando el elemento entra un 15% en la pantalla, se hace visible
        if (entrada.isIntersecting) {
          setEsVisible(true);
        } else {
          // Opcional: Vuelve a ocultarlo si sale de pantalla (ideal para scroll snap)
          setEsVisible(false);
        }
      });
    }, { threshold: 0.15 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Lógica para asignar el eje de movimiento basado en Tailwind
  const clasesBase = `transition-all ease-out transform ${duracion} ${retraso} ${
    esVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : 'opacity-0'
  }`;

  let clasesDireccion = '';
  if (!esVisible) {
    switch(direccion) {
      case 'arriba': clasesDireccion = 'translate-y-16'; break;
      case 'abajo': clasesDireccion = '-translate-y-16'; break;
      case 'izquierda': clasesDireccion = 'translate-x-16'; break; // Viene desde la derecha
      case 'derecha': clasesDireccion = '-translate-x-16'; break;  // Viene desde la izquierda
      case 'fade': 
      default: clasesDireccion = 'scale-95'; break;
    }
  }

  return (
    <div ref={domRef} className={`${clasesBase} ${clasesDireccion} w-full`}>
      {children}
    </div>
  );
}