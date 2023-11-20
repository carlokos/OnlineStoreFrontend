import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CategoryService from '../../services/categoryService';
import './SideBarFilter.css'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CategoryDialog from '../FormDialog/CategoryDialog';

export default function Sidebar({ onCategoryChange, onSearch }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [roles, setRoles] = useState([]);

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
    CategoryService.getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  const handleEditClick = (categoryId) => {
    setEditCategoryId(categoryId);
    console.log(editCategoryId);
    openCategoryDialog();
  };

  const openCategoryDialog = () => {
    setCategoryDialogOpen(true);
  }

  return (
    <div className='filter'>
      <TextField
        label="Search by name"
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
            { roles.includes(1) && (
            <IconButton
              edge="end"
              aria-label="edit"
              size='small'
              onClick={() => handleEditClick(category.id)}
            >
              <EditIcon />
            </IconButton>
            )}
          </ListItem>
        ))}
      </List>

      <Divider variant="fullWidth" />

      <CategoryDialog
        open={isCategoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        id={editCategoryId}
      />
    </div>
  );
};


