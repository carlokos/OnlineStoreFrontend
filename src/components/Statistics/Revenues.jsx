import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import StatisticsService from '../../services/StatisticsService';
import { BarChart } from '@mui/x-charts/BarChart';

const Revenues = () => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(today.month() + 1);
  const [selectedYear, setSelectedYear] = useState(today.year());
  const [chartData, setChartData] = useState([]);
  const [monthlyRevenue, setMontlyRevenue] = useState(0);

  const handleDateSelection = (date) => {
    const month = dayjs(date).month() + 1;
    const year = dayjs(date).year();

    console.log('Mes seleccionado:', month);
    console.log('Año seleccionado:', year);

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  useEffect(() => {
    setSelectedMonth(selectedDate.month() + 1);
    setSelectedYear(selectedDate.year());
  }, [selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StatisticsService.getMonthlyRevenue(selectedMonth, selectedYear);
        const response = await StatisticsService.getWeeklyRevenue(selectedMonth, selectedYear);

        setMontlyRevenue(data.data);
        if (Array.isArray(response.data)) {
          setChartData(response.data);
        } else if (response.data) {
          setChartData([response.data]);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error('Error al llamar a la API:', error);
      }
    };
    fetchData();
  }, [selectedYear, selectedMonth]);



  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Seleccione una fecha"
          views={['month', 'year']}
          value={selectedDate}
          onChange={(date) => handleDateSelection(date)}
          renderInput={(params) => <input {...params} />}
        />
      </LocalizationProvider>

      <div>
        <p>Total month revenue: {`$${monthlyRevenue}`}</p>
      </div>

      {Array.isArray(chartData) && chartData.length > 0 ? (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: chartData.map((entry) => `Week ${entry.week}`),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: chartData.map((entry) => entry.weeklyRevenue),
            },
          ]}
          width={500}
          height={300}
        />
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default Revenues;





