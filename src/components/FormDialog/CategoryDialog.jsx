import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CategoryService from "../../services/categoryService";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ResponsiveDialog from "../ResponsiveDialog/ResponsiveDialog";

const CategoryDialog = ({ open, onClose, id }) => {
    const [category, setCategory] = useState({});
    const [formData, setFormData] = useState({});
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const result = await CategoryService.getCategory(id);
                setCategory(result.data);
                setFormData(result.data);

                const categoriesResult = await CategoryService.getCategories();
                setCategories(categoriesResult.data);
            } catch (error) {
            }
        };

        if (open && id) {
            loadCategory();
        }
    }, [open, id]);

    const updateCategory = async () => {
        try {
            await CategoryService.updateCategory(formData);
            onClose();
            window.location.reload()
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const deleteCategory = async () => {
        try{
            await CategoryService.deleteCategory(id);
            onClose();
            window.location.reload();
        } catch(error){
            console.log('Error deleting the category: ', error);
        }
    };

    const handleInputChange = (fieldName) => (event) => {
        setFormData({
            ...formData,
            [fieldName]: event.target.value,
        });
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
                        label="Category Name"
                        value={formData.name || ''}
                        onChange={handleInputChange('name')}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={updateCategory} style={{ marginRight: '8px' }}>
                        Update
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
                    onConfirm={deleteCategory}
                    title="Delete category?"
                    msg={`${formData.name} is going to be delete, proceed?`}/>
        </div>
    );
};

export default CategoryDialog;