import React from "react";
import AddressList from "../AddressList/AddressList";

function ChooseAddress( {user_id, handleNext, onSelectAddress} ) {  
    const handleAddressClick = () => {
        onSelectAddress();
    };

    return(
        <AddressList user_id={user_id} onSelectAddress={handleAddressClick}/>
    );
}

export default ChooseAddress;