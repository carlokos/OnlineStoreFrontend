import React from 'react';
import './productList.css';
import ProductCard from './productCard/productCard';

const ProductList = ({ products }) => {
  return(
    <div className='list-wrap'>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} title={product.title} price={product.price} id={product.id}/>
    ))}
  </div>
  );
};

export default ProductList;