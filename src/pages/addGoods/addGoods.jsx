import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductForm from '../../components/FormDialog/ProductForm/ProductForm'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProductService from '../../services/productService';
import CategoryService from '../../services/categoryService';
import AlertMessageComponent from '../../components/AlertMessageComponent/AlertMessageComponent';
import isValid from '../../components/FormDialog/ProductForm/isValid';

const AddGoods = () => {
    const [tabValue, setTabValue] = useState(0);

    const [productFormData, setproductFormData] = useState({});
    const [isProductFormValid, setIsProductFormValid] = useState(false);

    const [categoryFormData, setCategoryFormData] = useState({});
    const [isCategoryFormValid, setIsCategoryFormValid] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    
    const makeAlert = (msg, severity) => {
        setMessage(msg);
        setSeverity(severity);
        setShowAlert(true);
    }

    const handleProductInputChange = (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;

        setproductFormData({
            ...productFormData,
            [fieldName]: value,
        });
    };

    const handleCategoryInputChange = (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
        
        setCategoryFormData({
            ...categoryFormData,
            [fieldName]: value,
        });
    };

    useEffect(() => {
        const checkProduct = isValid(productFormData);
        setIsProductFormValid(checkProduct);
    }, [productFormData]);

    useEffect(() => {
        const { name } = categoryFormData;

        const isValid =
            name;

        setIsCategoryFormValid(isValid);
    }, [categoryFormData]);

    const addProduct = async () => {
        try {
            if(isProductFormValid){
                const response = await ProductService.addProduct(productFormData);

                if (response.status === 201) {
                    makeAlert(response.data, "success");
                    setproductFormData({});
                } else {
                    makeAlert("Error adding product, check if title is unique", "error");
                }
            } else{
                makeAlert("Please, fill out all fields", "error");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    const addCategory = async () => {
        try{
            if(isCategoryFormValid){
                const response = await CategoryService.addCategory(categoryFormData);

                if(response.status === 201){
                    makeAlert(response.data, "success");
                    setCategoryFormData({});
                } else {
                    makeAlert("Error adding category, check if name is unique", "error");
                }
            } else{
                makeAlert("Please, put a name to the new category", "error");
            }
        } catch (error) {
            console.eorr("Error adding category", error);
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vw-100 vh-100">
            <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)}/>

            <Paper elevation={3} sx={{ minWidth: '1200px', minHeight: '300px', overflowY: 'auto' }}>
                <Box sx={{ alignContent: 'center', width: '100%' }}>
                    <Tabs value={tabValue} onChange={handleChange} centered>
                        <Tab label="Add new product" />
                        <Tab label="Add new category" />
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <ProductForm formData={productFormData} handleInputChange={handleProductInputChange} />
                        <Button variant="contained" color="primary" onClick={addProduct} style={{ m : 2 }}>
                            Add
                        </Button>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <TextField
                            label="Name"
                            value={categoryFormData.name || ''}
                            onChange={handleCategoryInputChange('name')}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={addCategory} style={{ m : 2 }}>
                            Add
                        </Button>
                    </TabPanel>
                </Box>
            </Paper>
        </div>
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
};

export default AddGoods;