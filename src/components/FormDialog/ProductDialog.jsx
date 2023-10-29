import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ProductService from "../../services/productService";
import CategoryService from "../../services/categoryService";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ResponsiveDialog from "../ResponsiveDialog/ResponsiveDialog";

const UpdateProductDialog = ({ open, onClose, id }) => {
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({});
    const [categories, setCategories] = useState([]);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const result = await ProductService.getProduct(id);
                setProduct(result.data);
                setFormData(result.data);

                const categoriesResult = await CategoryService.getCategories();
                setCategories(categoriesResult.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (open && id) {
            loadProduct();
        }
    }, [open, id]);

    const handleInputChange = (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;

        setFormData({
            ...formData,
            [fieldName]: event.target.value,
        });
    };

    const updateProduct = async () => {
        try {
            await ProductService.updateProduct(formData);
            onClose();
            window.location.reload()
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
            console.error('Error updating product:', error);
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
                    <TextField
                        label="Title"
                        value={formData.title || ''}
                        onChange={handleInputChange('title')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={formData.price || ''}
                        onChange={handleInputChange('price')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Brand"
                        value={formData.brand || ''}
                        onChange={handleInputChange('brand')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Color"
                        value={formData.color || ''}
                        onChange={handleInputChange('color')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Weight"
                        type="number"
                        value={formData.weight || ''}
                        onChange={handleInputChange('weight')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Volume"
                        value={formData.volume || ''}
                        onChange={handleInputChange('volume')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Stock"
                        type="number"
                        value={formData.stock || ''}
                        onChange={handleInputChange('weight')}
                        fullWidth
                        margin="normal"
                    />
                    <InputLabel id="category-label">Categoría</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={formData.category_id || ''}
                        onChange={handleInputChange('category_id')}
                        fullWidth
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
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
                    msg={`${formData.title} is going to be delete, proceed?`}/>
        </div>
    );
};

export default UpdateProductDialog;
