import React, { useState } from "react";
import FormDialog from "../FormDialog";
import AddressForm from "./AddressForm";
import AddressService from "../../../services/adresssService";

function AddressDialog({address, isOpen, onClose }) {
    const [addressFormData, setAddressFormData] = useState(address);

    const handleInputChange = (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;

        setAddressFormData({
            ...addressFormData,
            [fieldName]: value,
        });
    };

    const updateAddress = async () => {
        try{
            await AddressService.updateAddress(addressFormData);
            onClose();
            window.location.reload();
        } catch (error) {
            console.log('Error updating address: ', error);
        }
    }

    const deleteAddress = async () => {
        try{
            await AddressService.deleteAddress(address.id);
            onClose();
            window.location.reload();
        } catch (error){
            console.error('Error deleting address: ',  error);
        }
    }

    return(
        <FormDialog
            open={isOpen ? true : false}
            onClose={onClose}
            dataForm={{
                component: AddressForm,
                formData: addressFormData,
                setFormData: setAddressFormData,
                handleInputChange: handleInputChange
            }}
            updateItem={updateAddress}
            deleteItem={deleteAddress}
        />
    )
}

export default AddressDialog;