import React, { useState, useEffect } from "react";
import AddressCard from "./AddressCard";
import { List, ListItem } from "@mui/material";
import AddressService from "../../services/adresssService";

function AddressList( { user_id, onSelectAddress } ) {
    const [userAddressses, setUserAdresses] = useState([]);

    useEffect(() => {
        const fetchUserAddresses = async () => {
          try {
            const response = await AddressService.getUserAdresses(user_id);
            setUserAdresses(response.data);
          } catch (error) {
            console.error("Error fetching user addresses:", error);
          }
        };
    
        fetchUserAddresses();
      }, []);

    return(
        <List style={{ maxHeight: "500px", overflowY: "auto" }}>
            {userAddressses.map((address) => (
                <ListItem key={address.id}>
                    <AddressCard
                        address={address}
                        onSelectAddress={onSelectAddress}
                    />
                </ListItem>
            ))}
        </List>
    )
}

export default AddressList;