import React from 'react';
import { Typography, Box, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../imgs/404.png';
import HomeIcon from '@mui/icons-material/Home';

function NotFound() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vw-100 vh-100">
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <img src={NotFoundImage} alt="Not Found" style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }} />
          <Typography variant="h4">
            404 Not Found
          </Typography>
          <Typography variant="body1">
            The page you are looking for does not exist.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
            style={{ marginTop: '20px', backgroundColor: '#757575' }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default NotFound;
