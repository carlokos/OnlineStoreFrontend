import React, { useEffect, useState } from "react";
import TableComponent from '../../components/TableComponent/TableComponent';
import ProductService from "../../services/productService";

function ProductDashboard() {
    const [products, setProducts] = useState([]);
    const productColumns = [
        { id: 'id', label: 'ID' },
        { id: 'title', label: 'Title' },
        { id: 'category', label: 'Category'},
        { id: 'brand', label: 'Brand' },
        { id: 'price', label: 'Price' },
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await ProductService.getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <TableComponent data={products} columns={productColumns} />
        </div>
    );
}

export default ProductDashboard;