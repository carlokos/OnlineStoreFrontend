import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import ProductDialog from "../../FormDialog/ProductDialog";
import ProductService from "../../../services/productService";
import { Link } from "react-router-dom";
import { addToCart } from "../../cart/CartLogic";
import AlertMessageComponent from "../../AlertMessageComponent/AlertMessageComponent";
import { OutOfStockError } from "../../../exceptions/outOfStockException";
import placeholder from "../../../imgs/placeholder.png";

const StyledCard = styled(Card)({
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s',
    boxShadow: '2px 2px 5px #3333',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const StyledLink = styled(Link)({
    color: '#333',
    textDecoration: 'none',
    transition: 'color 0.3s',
    '&:hover': {
        color: '#000',
    },
});

const StyledImage = styled(Image)({
    flex: 1,
    objectFit: 'cover',
});

function ProductCard(product) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [image, setImage] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');

    const makeAlert = (msg, severity) => {
        setMessage(msg);
        setSeverity(severity);
        setShowAlert(true);
    }

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
        const getImage = async () => {
            try {
                const response = await ProductService.getFirstProductImage(product.id);
                setImage(response);
            } catch (error) {
                console.error("Error fetching product image:", error);
            }
        }

        getImage();
    }, [product.id]);

    const handleDeleteClick = (event) => {
        event.preventDefault();
        setDialogOpen(true);
    }

    const handleCancelDelete = () => {
        setDialogOpen(false);
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product);
        } catch (error) {
            if (error instanceof OutOfStockError) {
                makeAlert("Product out of stock", "error");
            } else {
                console.log(error);
            }
        }
    };

    return (
        <>
            <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)}/>

            <StyledCard>
                {image ? (
                    <Image
                        className="card-img-top"
                        src={`data:image/${image.format};base64,${image}`}
                        alt="Product Image"
                        thumbnail
                        style={{ width: '100%', height: '70%' }}
                    />
                ) : (
                    <Image
                        className="card-img-top"
                        src={placeholder}
                        alt="Placeholder Image"
                        thumbnail
                        style={{ width: '100%', height: '70%' }}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${product.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        <StyledLink to={`/productview/${product.id}`}>
                            View details
                        </StyledLink>
                    </Button>

                    <Button size="small" onClick={() => handleAddToCart(product)} color="success">Add to cart</Button>

                    {roles.includes(1) && (
                        <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            startIcon={<EditIcon />}
                            onClick={handleDeleteClick}>
                            Edit
                        </Button>
                    )}

                    <ProductDialog
                        open={isDialogOpen ? true : false}
                        onClose={handleCancelDelete}
                        id={product.id}
                    />
                </CardActions>
            </StyledCard>
        </>
    )
}

export default ProductCard;