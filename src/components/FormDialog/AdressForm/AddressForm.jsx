import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';

const AddressForm = ({ formData, handleInputChange }) => {
    return (
        <div>
            <TextField
                label="Country"
                value={formData.country || ''}
                onChange={handleInputChange('country')}
                fullWidth
                margin="normal"
            />

            <TextField
                label="City"
                value={formData.city || ''}
                onChange={handleInputChange('city')}
                fullWidth
                margin="normal"
            />

            <TextField
                label="PostalCode"
                type="number"
                value={formData.postalCode || ''}
                onChange={handleInputChange('postalCode')}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Street"
                value={formData.street || ''}
                onChange={handleInputChange('street')}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Home"
                value={formData.home || ''}
                onChange={handleInputChange('home')}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Apartament"
                value={formData.apartament || ''}
                onChange={handleInputChange('apartament')}
                fullWidth
                margin="normal"
            />
        </div>
    )
}

export default AddressForm;