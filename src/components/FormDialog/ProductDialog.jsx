import React, { useState, useEffect } from "react";
import ProductService from "../../services/productService";
import ProductForm from "./ProductForm/ProductForm";
import isValid from "./ProductForm/isValid";
import FormDialog from "./FormDialog";
import ImageService from "../../services/ImageService";
import Alert from '../AlertMessageComponent/AlertMessageComponent';

const UpdateProductDialog = ({ open, onClose, id }) => {
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
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

        if (fieldName === 'image') {
            const file = event.target.files[0];
            setImage(file);
        } else {
            setFormData({
                ...formData,
                [fieldName]: value,
            });
        }
    };

    const updateProduct = async () => {
        try {
            if (isFormValid) {
                if(image){
                    await ImageService.uploadImage(image, id);
                }
                await ProductService.updateProduct(formData);
                onClose();
                window.location.reload();
            } else {
                makeAlert("Please make sure to complete all fields.", "error");
            }
        } catch (error) {
            makeAlert("Unexpected error updating product. Check if title is unique");
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
    
    return (
        <div>
            <Alert message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)}/>

            <FormDialog
                open={open}
                onClose={onClose}
                dataForm={{
                    component: ProductForm,
                    formData: formData,
                    handleInputChange: handleInputChange, 
                    isValid: isFormValid,
                }}
                updateItem={updateProduct}
                deleteItem={deleteProduct}         
            />
        </div>
    );
};

export default UpdateProductDialog;
