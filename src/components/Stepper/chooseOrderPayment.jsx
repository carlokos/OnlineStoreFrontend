import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';
import DeliveryService from '../../services/DeliveryService';
import PaymentService from '../../services/PaymentService';

const ChooseOrderPayment = ( { onSelect, order } ) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleDeliveryChange = (event) => {
    setDeliveryMethod(event.target.value);
  };

  useEffect(() => {
    onSelect({ paymentMethod, deliveryMethod });
  }, [onSelect, paymentMethod, deliveryMethod]);

  useEffect(() => {
    const fetchDeliveryMethods = async () => {
      try {
        const response = await DeliveryService.getDeliveryMethods();
        const methods = response.data;

        if (methods.length > 0) {
          setDeliveryMethods(methods);
          setDeliveryMethod(methods[0].id);
        }
      } catch (error) {
        console.error('Error fetching delivery methods:', error);
      }
    };

    fetchDeliveryMethods();
  }, []);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await PaymentService.getPaymentMethods();
        const methods = response.data;
        if (methods.length > 0) {
          setPaymentMethods(methods);
          setPaymentMethod(methods[0].id);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="payment-label">Payment Method</InputLabel>
          <Select
            labelId="payment-label"
            id="payment"
            value={paymentMethod}
            label="Payment Method"
            onChange={handlePaymentChange}
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method.id} value={method.id}>
                {method.paymentMethod}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="delivery-label">Delivery Method</InputLabel>
          <Select
            labelId="delivery-label"
            id="delivery"
            value={deliveryMethod}
            label="Delivery Method"
            onChange={handleDeliveryChange}
          >
            {deliveryMethods.map((method) => (
              <MenuItem key={method.id} value={method.id}>
                {method.deliveryMethod}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ChooseOrderPayment;