import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductTable from '../../components/Statistics/productsTable';
import CategoriesChar from '../../components/Statistics/CategoriesChar';
import UserTable from '../../components/Statistics/userTable';
import Paper from '@mui/material/Paper';

const Statistics = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper elevation={3} className="container-fluid d-flex justify-content-center align-items-center vw-100 vh-100">
            <Box sx={{ flexGrow: 1 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="Tabs for Statistics"
                >
                    <Tab label="Top Selling Products" />
                    <Tab label="Most Users sessions" />
                    <Tab label="Revenues per Month/Week" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ProductTable />
                        </Grid>
                        <Grid item xs={6}>
                            <CategoriesChar />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <UserTable />
                        </Grid>
                    </Grid>
                </TabPanel>
            </Box>
        </Paper>
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default Statistics;
