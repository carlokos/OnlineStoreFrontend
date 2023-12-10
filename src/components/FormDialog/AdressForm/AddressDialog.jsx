import React, { useState, useEffect } from "react";
import FormDialog from "../FormDialog";
import AddressForm from "./AddressForm";
import AddressService from "../../../services/adresssService";
import addressValidation from "./addressValidation";
import AlertMessageComponent from "../../AlertMessageComponent/AlertMessageComponent";

function AddressDialog({address, isOpen, onClose }) {
    const [addressFormData, setAddressFormData] = useState(address);
    const [isFormValid, setIsFormValid] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');

    const makeAlert = (msg, severity) => {
        setMessage(msg);
        setSeverity(severity);
        setShowAlert(true);
    }

    const handleInputChange = (fieldName) => (event) => {
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;

        setAddressFormData({
            ...addressFormData,
            [fieldName]: value,
        });
    };

    useEffect(() => {
        const check = addressValidation(addressFormData);
        setIsFormValid(check);
    }, [addressFormData]);

    const updateAddress = async () => {
        try{
            if(isFormValid){
                await AddressService.updateAddress(addressFormData);
                onClose();
                window.location.reload();
            }else{
                makeAlert("Please make sure all fields are completed", "error");
            }
        } catch (error) {
            makeAlert("Unexpected error updating address, try again later");
        }
    }

    const deleteAddress = async () => {
        try{
            await AddressService.deleteAddress(address.id);
            onClose();
            window.location.reload();
        } catch (error){
            makeAlert("Unexpected error deleting address, try again later");
        }
    }

    return(
        <div>
             <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)}/>

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
        </div>
    )
}

export default AddressDialog;