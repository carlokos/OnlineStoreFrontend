import React, { useState } from "react";
import Image from 'react-bootstrap/Image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductService from "../../../services/productService";
import ResponsiveDialog from "../../ResponsiveDialog/ResponsiveDialog";
import { Link } from "react-router-dom";

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

    const handleDeleteClick = (event) => {
        event.preventDefault();
        setDialogOpen(true);
    }

    const handleConfirmDelete = () => {
        ProductService.deleteProduct(product.id)
            .then(response => {
                setDialogOpen(false);
                window.location.reload();
            })
            .catch(error => {
                setDialogOpen(false);
            })
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
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

                <Button size="small">Add to cart</Button>
                
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteClick}>
                    Delete
                </Button>

                <ResponsiveDialog
                    open={isDialogOpen ? true : false}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    title="Delete product?"
                    msg={`${product.title} is going to be delete, proceed?`}
                />
            </CardActions>
        </StyledCard>
    )
}

export default ProductCard;