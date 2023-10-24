import React, { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import ProductCard from '../components/productCard';
import './productList.css'
import Image from 'react-bootstrap/Image';
import banner from '../imgs/testBanner.jpg';
import { Container, Row, Col } from 'react-bootstrap';

function Home(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await ProductService.getProducts();
            setProducts(response.data); 
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

      return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
          <Image className="banner" src={banner} fluid />
          <Container className='mt-4'>
            <Row className='justice-content-center'>
              <div className='product-container'>
                {products.map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <ProductCard key={product.id} product={product} title={product.title} price={product.price} id={product.id}/>
                  </Col>
                ))}
              </div>
            </Row>
            
          </Container>
        </div>
      );
}

export default Home;

