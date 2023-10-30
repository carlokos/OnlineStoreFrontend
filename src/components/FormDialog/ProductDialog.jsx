import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import ProductService from "../../services/productService";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ResponsiveDialog from "../ResponsiveDialog/ResponsiveDialog";
import ProductForm from "./ProductoForm/ProductForm";
import isValid from "./ProductoForm/isValid";

const UpdateProductDialog = ({ open, onClose, id }) => {
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({});
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const result = await ProductService.getProduct(id);
                setProduct(result.data);
                setFormData(result.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (open && id) {
            loadProduct();
        }
    }, [open, id]);

    useEffect(() => {
        const check = isValid(formData);
        setIsFormValid(check);
    }, [formData]);

    const handleInputChange = (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;

        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const updateProduct = async () => {
        try {
            if(isFormValid){
                await ProductService.updateProduct(formData);
                onClose();
                window.location.reload();
            } else{
                console.log("hay campos vacios");
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async () => {
        try {
            await ProductService.deleteProduct(id);
            onClose();
            window.location.reload()
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
    }

    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Formulario</DialogTitle>
                <DialogContent>
                    <ProductForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                    <Button variant="contained" color="primary" onClick={updateProduct} style={{ marginRight: '8px' }}>
                        Actualizar
                    </Button>

                    <Button variant="contained" color="secondary" onClick={onClose} style={{ marginRight: '8px' }}>
                        Cancel
                    </Button>

                    <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={openDeleteDialog}
                    >
                        <DeleteIcon />
                    </IconButton>
                </DialogContent>
            </Dialog>

            <ResponsiveDialog
                open={isDeleteDialogOpen ? true : false}
                onClose={closeDeleteDialog}
                onConfirm={deleteProduct}
                title="Delete product?"
                msg={`${formData.title} is going to be delete, proceed?`} />
        </div>
    );
};

export default UpdateProductDialog;
