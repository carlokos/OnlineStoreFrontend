import React, { useState, useContext } from "react";
import Image from 'react-bootstrap/Image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import ProductDialog from "../../FormDialog/ProductDialog";
import { Link } from "react-router-dom";
import { CartContext } from "../../cart/ShoppingCartContext";
import { addToCart } from "../../cart/CartLogic";

const StyledCard = styled(Card)({
    maxWidth: 345,
    transition: 'transform 0.3s',
    boxShadow: '2px 2px 5px #3333',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

function ProductCard(product) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [cart, setCart] = useContext(CartContext);

    const handleDeleteClick = (event) => {
        event.preventDefault();
        setDialogOpen(true);
    }

    const handleCancelDelete = () => {
        setDialogOpen(false);
    };

    const handleAddToCart = (product) => {
        addToCart(product, setCart);
    };

    return (
        <StyledCard>
            <Image className="card-img-top" src="https://picsum.photos/300/200" alt="Card image cap" thumbnail />
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
                    <Link to={`/productview/${product.id}`}>
                        View details
                    </Link>
                </Button>

                <Button size="small" onClick={() => handleAddToCart(product)}>Add to cart</Button>

                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={handleDeleteClick}>
                    Edit
                </Button>

                <ProductDialog
                    open={isDialogOpen ? true : false}
                    onClose={handleCancelDelete}
                    id={product.id}
                />
            </CardActions>
        </StyledCard>
    )
}

export default ProductCard;