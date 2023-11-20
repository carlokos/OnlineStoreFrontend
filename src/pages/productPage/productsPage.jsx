import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import Sidebar from '../../components/SideBarFilter/SideBarFilter';
import './productPage.css'
import ProductList from '../../components/ProductList/productList';
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

function ProductPage() {
  /**
   * We need to save all Products in both variables so it always refresh well while searching and filtering
   */
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setRoles(localStorage.getItem('roles'));
      }
    }
    getRoles();
  }, [])

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

      {roles.includes(1) && (
        <Link to={"/addGoods"}>
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: 'fixed', bottom: 10, right: 25 }}
          >
            <AddIcon />
          </Fab>
        </Link>
      )}
    </div>
  );
}

export default ProductPage;

