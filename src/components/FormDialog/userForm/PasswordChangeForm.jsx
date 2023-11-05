import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';

const PasswordChangeForm = ({ formData, handleInputChange}) => {
    return (
        <div>
            <TextField
                label="New Password"
                type="password"
                value={formData.password || ''}
                onChange={handleInputChange('password')}
                fullWidth
                margin="normal"
            />
        </div>
    );
}

export default PasswordChangeForm; 