import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Revenues = () => {
  const [selectedDate, handleDateChange] = useState(null);

  const handleDateSelection = (date) => {
    // Obtén el mes como un número (de 0 a 11)
    const selectedMonth = dayjs(date).month() + 1;
    
    // Muestra el mes en la consola
    console.log('Mes seleccionado:', selectedMonth);

    // Actualiza el estado con la nueva fecha seleccionada
    handleDateChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Seleccione una fecha"
        views={['month', 'year']}
        value={selectedDate}
        onChange={(date) => handleDateSelection(date)}
        renderInput={(params) => <input {...params} />} // Puedes cambiar esto según tu forma de renderizar el input
      />
    </LocalizationProvider>
  );
};

export default Revenues;





