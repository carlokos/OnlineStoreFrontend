import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CategoryService from "../../../services/categoryService";

const ProductForm = ({ formData, handleInputChange, isValid }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <div>
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
                onChange={handleInputChange('stock')}
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
        </div>
    );
}

export default ProductForm;