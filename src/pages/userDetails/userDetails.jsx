import React, { useState, useEffect } from 'react';
import UserService from '../../services/userService';
import { Tab, Tabs, Box, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import FormDialog from '../../components/FormDialog/FormDialog';
import PasswordChangeForm from '../../components/FormDialog/userForm/PasswordChangeForm';
import AddressList from '../../components/AddressList/AddressList';
import AddressForm from '../../components/FormDialog/AdressForm/AddressForm';
import AddressService from '../../services/adresssService';
import OrderList from '../../components/Order/OrderList';
import AlertMessageComponent from '../../components/AlertMessageComponent/AlertMessageComponent';
import addressValidation from '../../components/FormDialog/AdressForm/addressValidation';
import validPassword from '../../components/FormDialog/userForm/validPassword';

const UserDetails = () => {
    const [tabValue, setTabValue] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const [isAddressValid, setIsAddressValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [user, setUser] = useState();
    const [userData, setUserData] = useState();

    const [passwordData, setPasswordData] = useState({ password: '' });
    const [addressData, setAddressData] = useState({
        country: '',
        city: '',
        postalCode: '',
        street: '',
        home: '',
        apartament: '',
        userId: ''
    });

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');

    const makeAlert = (msg, severity) => {
        setMessage(msg);
        setSeverity(severity);
        setShowAlert(true);
    }

    useEffect(() => {
        const check = addressValidation(addressData);
        setIsAddressValid(check);
    }, [addressData]);

    useEffect(() => {
        const check = validPassword(passwordData);
        setIsPasswordValid(check);
    }, [passwordData])

    const [isOpen, setIsOpen] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await UserService.loadCurrentUser(token);
                setUser(response.data);
                setUserData(response.data);
                setAddressData(prevAddressData => ({
                    ...prevAddressData,
                    userId: parseInt(response.data.id, 10),
                }));
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const makeEditable = () => {
        setIsEditing(!isEditing);

        if (isEditing) {
            setUserData(user);
        }
    }

    const updateUser = async () => {
        try {
            await UserService.updateUser(userData);
            setUser(userData);
            setIsEditing(false);
            makeAlert("Profile updated succesfully", "success");
        } catch (error) {
            makeAlert(error.response.data, "error");
        }
    }

    const updatePassword = async() =>{
        try{
            if(isPasswordValid){
                await UserService.updatePassword(user.id, passwordData);
                setIsOpen(false);
                makeAlert("Password changed succesfully", "success");
            } else{
                makeAlert("Please fill out the field to change your password", "error");
            }
        } catch (error) {
            console.error("Error changin password: ", error);
        }
    }

    const createAddress = async() => {
        try{
            if(isAddressValid){
                await AddressService.addAddress(addressData);
                window.location.reload();
            } else{
                makeAlert("Please fill out all fields to create an address", "error");
            }
        } catch (error){
            makeAlert("Unexpected error creating address, please try again later");
        }
    }

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleInputChange = (data, setData) => (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;

        setData({
            ...data,
            [fieldName]: value,
        });
    };

    let formDialogProps = {};

    if (tabValue === 0) {
        formDialogProps = {
            open: isOpen ? true : false,
            onClose: handleCancel,
            dataForm: {
                component: PasswordChangeForm,
                formData: passwordData,
                handleInputChange: handleInputChange(passwordData, setPasswordData),
            },
            updateItem: updatePassword
        };
    } else if (tabValue === 1) {
        formDialogProps = {
            open: isOpen ? true : false,
            onClose: handleCancel,
            dataForm: {
                component: AddressForm,
                formData: addressData,
                handleInputChange: handleInputChange(addressData, setAddressData),
            },
            updateItem: createAddress
        };
    } else if (tabValue === 2) {
        formDialogProps = {
            open: isOpen ? true : false,
        };
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vw-100 vh-100">
            <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)}/>
            <FormDialog {...formDialogProps}/>
            <Paper elevation={3}>
                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                    <Tabs
                        orientation="vertical"
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="View Profile" />
                        <Tab label="Your Addresses" />
                        <Tab label="Your Orders" />
                    </Tabs>
                    <Box sx={{ flex: 1, p: 3, minWidth: 0 }}>
                        
                        {tabValue === 0 && user && (
                            <Box className="m-4">
                                <Typography variant="h5" >User Profile</Typography>
                                <div className="mb-3">
                                    <Typography variant="h5" >Name</Typography>
                                    <TextField
                                        label="Name"
                                        value={userData.name}
                                        onChange={handleInputChange(userData, setUserData)('name')}
                                        disabled={!isEditing}
                                        className="m-1"
                                    />
                                    <TextField
                                        label="Subname"
                                        value={userData.subname}
                                        onChange={handleInputChange(userData, setUserData)('subname')}
                                        disabled={!isEditing}
                                        className="m-1"
                                    />
                                </div>

                                <Divider variant="fullWidth" />

                                <div className="mb-3">
                                    <Typography variant="h5" >Email</Typography>
                                    <TextField
                                        label="Email"
                                        value={userData.email}
                                        onChange={handleInputChange(userData, setUserData)('email')}
                                        disabled={!isEditing}
                                        className="m-1"
                                    />
                                </div>

                                <Divider variant="fullWidth" />

                                <div className="mb-3">
                                    <Typography variant="h5" >Password</Typography>
                                    <Button variant='contained' color='primary' onClick={() => setIsOpen(true)} className="m-1">
                                        Change password
                                    </Button>
                                </div>

                                <Button variant="contained" color="primary" onClick={makeEditable}>
                                    {isEditing ? 'Cancel' : 'Edit profile'}
                                </Button>

                                <Button variant="contained" color="primary" onClick={updateUser} disabled={!isEditing}>
                                    Commit changes
                                </Button>
                            </Box>
                        )}

                        {tabValue === 1 && (
                            <Box className="m-4">
                                <div className="mb-3">
                                    <Typography variant="h5">Your addresses</Typography>
                                    <AddressList user_id={user.id}/>
                                </div>

                                <div className="mb-3">
                                    <Button variant='contained' color='primary' onClick={() => setIsOpen(true)}>
                                        Add address
                                    </Button>
                                </div>
                            </Box>
                        )}
                        
                        {tabValue === 2 && (
                            <Box>
                                <Typography variant="h5">Your orders</Typography>
                                <OrderList user_id={user.id}/>
                            </Box>
                        )}
                    </Box>
                </Box >
            </Paper>
        </div>
    );
};


export default UserDetails;