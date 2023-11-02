import React, { useState, useEffect } from 'react';
import UserService from '../../services/userService';
import { Tab, Tabs, Box, Typography, Button } from '@mui/material';

const UserDetails = () => {
    const [user, setUser] = useState();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await UserService.loadCurrentUser(token);
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const updateUser = async () => {
        
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}>
            <Tabs
                orientation="vertical"
                value={tabValue}
                onChange={handleTabChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="View Profile" />
                <Tab label="Your Addresses" />
                <Tab label="Your Orders" />
            </Tabs>
            <Box sx={{ flex: 1, p: 3 }}>
                {tabValue === 0 && user && (
                    <Box>
                        <Typography variant="h5">User Profile</Typography>
                        <Typography variant="subtitle1">Name: {user.name}</Typography>
                        <Typography variant="subtitle1">Apellidos: {user.subname}</Typography>
                        <Typography variant="subtitle1">Email: {user.email}</Typography>
                        <Button variant="contained" color="primary" onClick={updateUser}>
                            Edit profile
                        </Button>
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box>
                        <Typography variant="h5">Your addresses</Typography>
                    </Box>
                )}
                {tabValue === 2 && (
                    <Box>
                        <Typography variant="h5">Your orders</Typography>
                    </Box>
                )}
            </Box>
        </Box >
    );
};


export default UserDetails;