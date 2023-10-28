import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/productService";
import "./productView.css";
import testImg from '../../imgs/test.jpg';
import Image from 'react-bootstrap/Image';

function ProductView() {
  const [product, setProduct] = useState({
    title: "default title",
    brand: "default brand",
    price: "default price",
  })

  const { id } = useParams();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const result = await ProductService.getProduct(id);
      setProduct(result.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleQuantityChange = ({ targer: { value } }) => {
    setSelectedQuantity(value);
  };

  return (
    <div className="details-container d-flex justify-content-center align-items-center vh-100 vw-100">
      <div>
        <div className="image-container">
          <Image src={testImg} alt="imagen" className="image" thumbnail />
        </div>
      </div>

      <div>
        <h3 className="title">{product.title}</h3>
        <div className="product-details">
          <p className="price">{product.price}€</p>
          <p className="brand">brand: {product.brand}</p>
          <p className="color">colors: {product.color}</p>
        </div>
        <input
          type="number"
          id="quantity"
          className="quantity"
          name="quantity"
          value= {selectedQuantity}
          onChange={handleQuantityChange}
        />

        {/* Botón "Añadir al carrito" */}
        <button className="btn btn-primary" onClick={() => console.log('Add to cart clicked')}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductView;