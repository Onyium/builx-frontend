import React, { useState } from 'react';

export default function CalendarioPremium({ checkIn, checkOut, setCheckIn, setCheckOut, primaryColor }) {
  const [fechaVista, setFechaVista] = useState(new Date());

  const diasSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const obtenerDiasDelMes = (año, mes) => new Date(año, mes + 1, 0).getDate();
  const obtenerPrimerDiaDelMes = (año, mes) => new Date(año, mes, 1).getDay();

  const añoActual = fechaVista.getFullYear();
  const mesActual = fechaVista.getMonth();
  const diasEnMes = obtenerDiasDelMes(añoActual, mesActual);
  const primerDia = obtenerPrimerDiaDelMes(añoActual, mesActual);

  const cambiarMes = (incremento) => {
    setFechaVista(new Date(añoActual, mesActual + incremento, 1));
  };

  const handleSeleccionDia = (dia) => {
    const fechaSeleccionada = new Date(añoActual, mesActual, dia);
    const fechaString = fechaSeleccionada.toISOString().split('T')[0];
    const hoyString = new Date().toISOString().split('T')[0];

    if (fechaString < hoyString) return; 

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(fechaString);
      setCheckOut('');
    } else if (fechaString > checkIn) {
      setCheckOut(fechaString);
    } else {
      setCheckIn(fechaString);
      setCheckOut('');
    }
  };

  const cuadricula = [];
  for (let i = 0; i < primerDia; i++) cuadricula.push(null); 
  for (let i = 1; i <= diasEnMes; i++) cuadricula.push(i);

  return (
    <div className="bg-white p-5 rounded-none border border-gray-200 shadow-sm w-full select-none font-sans">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => cambiarMes(-1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-serif text-lg text-gray-900 tracking-wide capitalize">
          {meses[mesActual]} {añoActual}
        </span>
        <button onClick={() => cambiarMes(1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {diasSemana.map(dia => (
          <div key={dia} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dia}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {cuadricula.map((dia, index) => {
          if (!dia) return <div key={`empty-${index}`} className="h-10"></div>;

          const fechaActual = new Date(añoActual, mesActual, dia).toISOString().split('T')[0];
          const hoy = new Date().toISOString().split('T')[0];
          const esPasado = fechaActual < hoy;
          const esCheckIn = fechaActual === checkIn;
          const esCheckOut = fechaActual === checkOut;
          const esRango = checkIn && checkOut && fechaActual > checkIn && fechaActual < checkOut;

          let clasesBase = "h-10 w-full flex items-center justify-center text-sm font-medium rounded-full transition-all cursor-pointer ";
          if (esPasado) clasesBase += "text-gray-300 cursor-not-allowed";
          else if (esCheckIn || esCheckOut) clasesBase += "text-white shadow-md transform scale-105 font-bold";
          else if (esRango) clasesBase += "bg-orange-50 text-orange-950 rounded-none";
          else clasesBase += "text-gray-700 hover:bg-gray-100";

          return (
            <div 
              key={index} 
              onClick={() => handleSeleccionDia(dia)}
              className={clasesBase}
              style={(esCheckIn || esCheckOut) ? { backgroundColor: primaryColor } : {}}
            >
              {dia}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs font-bold text-gray-500">
        <div>Llegada: {checkIn ? checkIn.split('-').reverse().join('/') : '--/--/----'}</div>
        <div>Salida: {checkOut ? checkOut.split('-').reverse().join('/') : '--/--/----'}</div>
      </div>
    </div>
  );
}