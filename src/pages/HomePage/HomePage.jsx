import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import fondo1 from '../../imgs/fondo.png';

const HomePage = () => {
    return (
        <div className='login template d-flex justify-content-center align-items-center vw-100 vh-100'>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <img src={fondo1} alt="Fondo 1" style={{ width: '100%', height: '100%' }} />
                <Typography variant="h4">Welcome to SwiftSteps </Typography>
                <Typography variant="body1">Being stylish has never been that easy </Typography>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <Button variant="contained" 
                    color="primary" 
                    style={{ backgroundColor: '#757575' }}
                    component={Link}
                    to="/productList">
                        See products
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default HomePage;
