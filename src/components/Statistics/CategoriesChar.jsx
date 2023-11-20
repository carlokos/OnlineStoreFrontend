import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import StatisticsService from '../../services/StatisticsService';
import 'chart.js/auto';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const CategoriesChart = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await StatisticsService.getTopCategories();
                const labels = result.data.map(category => category[0]);
                const data = result.data.map(category => category[1]);

                const colorPalette = [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50',
                    '#FF5722',
                ];

                setData({
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: colorPalette.slice(0, data.length),
                            hoverBackgroundColor: colorPalette.slice(0, data.length),
                        },
                    ],
                });
            } catch (error) {
                console.log("Error fetching category data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Paper elevation={3} style={{ maxWidth: '100%', height: '400px', padding: '20px' }}>
            <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
                <h2>Total Sold by Category</h2>
                <Pie data={data} options={{ maintainAspectRatio: false }} />
            </Box>
        </Paper>
    );
};

export default CategoriesChart;
