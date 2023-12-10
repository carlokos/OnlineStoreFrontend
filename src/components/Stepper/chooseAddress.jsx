import React, { useEffect, useState } from "react";
import AddressList from "../AddressList/AddressList";
import FormDialog from "../FormDialog/FormDialog";
import AddressForm from "../FormDialog/AdressForm/AddressForm";
import Button from '@mui/material/Button';
import addressValidation from "../FormDialog/AdressForm/addressValidation";
import AddressService from "../../services/adresssService";

function ChooseAddress( {user_id, handleNext, onSelectAddress} ) {  
    const [open, setOpen] = useState(false);
    const [addressFormData, setAddressFormData] = useState({
        country: '',
        city: '',
        postalCode: '',
        street: '',
        home: '',
        apartament: '',
        userId: user_id,
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [key, setKey] = useState(0);

    const handleAddressClick = () => {
        onSelectAddress();
    };

    useEffect(() => {
        const check = addressValidation(addressFormData);
        setIsFormValid(check);
    }, [addressFormData]);

    const createAddress = async () => {
        try{
            if(isFormValid){
                await AddressService.addAddress(addressFormData);
                setKey(prevKey => prevKey + 1);
                setOpen(false);
            }
        } catch (error){
            console.log(error);
        }
    }

    const handleInputChange = (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;

        setAddressFormData({
            ...addressFormData,
            [fieldName]: value,
        });
    };

    const handleOpenCreateDialog = () => {
        setOpen(true);
    }
 
    return(
        <>
            <AddressList user_id={user_id} onSelectAddress={handleAddressClick} key={key}/>

            <Button variant="contained" color="primary" onClick={handleOpenCreateDialog}>
                Add address
            </Button>

            <FormDialog
                open={open ? true : false}
                onClose={() => setOpen(false)}
                dataForm={{
                    component: AddressForm,
                    formData: addressFormData,
                    setFormData: setAddressFormData,
                    handleInputChange: handleInputChange
                }}
                updateItem={createAddress}
            />
        </>
    );
}

export default ChooseAddress;