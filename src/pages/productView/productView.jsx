import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/productService";
import { Typography } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { addToCart } from "../../components/cart/CartLogic";
import Paper from '@mui/material/Paper';
import placeholder from '../../imgs/placeholder.png';
import "./productView.css";
import AlertMessageComponent from "../../components/AlertMessageComponent/AlertMessageComponent";
import { OutOfStockError } from "../../exceptions/outOfStockException";

function ProductView() {
  const [productImage, setProductImage] = useState();
  const [product, setProduct] = useState({
    title: "default title",
    brand: "default brand",
    price: "default price",
  });
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { id } = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('Default message');
  const [severity, setSeverity] = useState('info');

  const makeAlert = (msg, severity) => {
    setMessage(msg);
    setSeverity(severity);
    setShowAlert(true);
  }

  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    loadProductImage();
  }, []);

  const loadProduct = async () => {
    try {
      const result = await ProductService.getProduct(id);
      setProduct(result.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const loadProductImage = async () => {
    try {
      const result = await ProductService.getFirstProductImage(id);
      setProductImage(result);
    } catch (error) {
      console.error('error fetching image: ', error);
    }
  }

  const handleQuantityChange = (event) => {
    const value = Math.max(1, event.target.value);
    setSelectedQuantity(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    event.preventDefault();
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product, selectedQuantity);
      console.log(selectedQuantity);
    } catch (error) {
      if (error instanceof OutOfStockError) {
        makeAlert("Product out of stock", "error");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="details-container d-flex justify-content-center align-items-center vh-100 vw-100">
      <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)} />

      <Paper elevation={3} className="details-container d-flex justify-content-center align-items-center ">
        <div>
          <div className="image-container">
            {productImage ? (
              <img src={`data:image/${productImage.format};base64,${productImage}`} alt="imagen" className="image" />
            ) : (
              <img src={placeholder} alt="imagen" className="image" />
            )}
          </div>
        </div>

        <div className="details-information-container">
          <Typography variant="h3" className="title">{product.title}</Typography>
          <div className="product-details">
            <Typography variant="h5" className="price">{`${product.price}€`}</Typography>
            <Typography variant="body1" className="brand">{`Brand: ${product.brand}`}</Typography>
            <Typography variant="body1" className="color">{`Colors: ${product.color}`}</Typography>
            <Typography variant="body1" className="volume">{`Colors: ${product.volume}`}</Typography>
          </div>
          <Input
            type="number"
            id="stock"
            className="stock"
            name="stock"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            onKeyDown={handleInputKeyDown}
            inputProps={{
              min: 1,
            }}
          />

          <br />
          <Button className="btn-cart" variant="contained" color="success" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default ProductView;
