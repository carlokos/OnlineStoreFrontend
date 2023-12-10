import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import ProductList from '../../components/ProductList/productList';
import { Container, Typography, Paper } from '@mui/material';

function TopProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await ProductService.getTop10Products();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProduct();
  }, []);

  return (
    <Paper elevation={3} className="container-fluid d-flex justify-content-center align-items-center vw-100 mx-auto p-3">
      <Container className="text-center">
          <Typography variant="h4" gutterBottom>
            Our Best Products
          </Typography>
          <ProductList products={products} />
      </Container>
    </Paper>
  );
}

export default TopProducts;