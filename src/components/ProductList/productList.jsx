import React from 'react';
import './productList.css';
import ProductCard from './ProductCard/productCard';

const ProductList = ({ products }) => (
  <div className='list-wrap'>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} title={product.title} price={product.price} id={product.id}/>
    ))}
  </div>
);

export default ProductList;