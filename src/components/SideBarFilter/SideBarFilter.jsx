import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CategoryService from '../../services/categoryService';
import './SideBarFilter.css'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'; 
import Button from '@mui/material/Button'; 
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function Sidebar({ onCategoryChange, onSearch }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    CategoryService.getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    if(onCategoryChange){
      onCategoryChange(categoryId);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className='filter'>
      <TextField
        label="Buscar producto"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
        InputProps={{
          endAdornment: (
            <SearchIcon color="action" />
          ),
        }}
      />
      <List className='input-group'>
        <Typography variant="h6" gutterBottom>Category</Typography>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <Checkbox
              checked={selectedCategory === category.id}
              onChange={() => handleCheckboxChange(category.id)}
            />
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>

      <Divider variant="fullWidth" />

      <div className='button-container'>
        <Link to={"/"}>
          <Button variant="contained" color="primary">
            Go to category-dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};


