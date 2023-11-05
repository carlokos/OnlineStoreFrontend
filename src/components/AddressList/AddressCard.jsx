import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AddressDialog from "../FormDialog/AdressForm/AddressDialog";

const StyledCard = styled(Card)({
    maxWidth: 345,
    transition: 'transform 0.3s',
    boxShadow: '2px 2px 5px #3333',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    cursor:"pointer",
});

function AddressCard({ address }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleCardClick = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <AddressDialog
                address={address}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <StyledCard onClick={handleCardClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {address.postalcode} {address.street} {address.home} {address.apartament}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {address.country} {address.city}
                    </Typography>
                </CardContent>
            </StyledCard>
        </div>
    );
}

export default AddressCard;