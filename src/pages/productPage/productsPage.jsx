import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import Sidebar from '../../components/SideBarFilter/SideBarFilter';
import './productPage.css'
import ProductList from '../../components/ProductList/productList';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    try {
      if (selectedCategory === categoryId) {
        fetchProducts();
        setSelectedCategory(null);
      } else {
        const response = await ProductService.getProductsByCategory(categoryId);
        setProducts(response.data);
        setSelectedCategory(categoryId);
      }
    } catch (error) {
      console.error('Error filtering products by category:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getProducts();
      setProducts(response.data);
      setAllProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === '' && selectedCategory === null) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts
        .filter((product) => product !== undefined)
        .filter((product) =>
          product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === null || product.category_id === selectedCategory)
        ); 
      setProducts(filtered);
    }
  };

  return (
    <div className='product-container'>
      <div className='product_panelList-wrap'>
        <div className='product_panel-wrap'>
          <Sidebar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
        </div>
        <div className='product_list-wrap'>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

