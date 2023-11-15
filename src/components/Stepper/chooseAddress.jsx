import React from "react";
import AddressList from "../AddressList/AddressList";

function ChooseAddress( {user_id, sendAddress, handleNext} ) {  
    const handleAddressClick = (address) => {
        if (sendAddress) {
          sendAddress(address.id);
        }
        handleNext();
    };

    return(
        <AddressList user_id={user_id} sendAddress={handleAddressClick}/>
    );
}

export default ChooseAddress;