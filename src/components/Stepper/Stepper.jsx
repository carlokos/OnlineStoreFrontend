import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ChooseAddress from './chooseAddress';
import ChooseOrderPayment from './chooseOrderPayment';
import ConfirmOrder from './ConfirmOrder';
import Cookies from 'js-cookie';
import OrderService from '../../services/OrderService';
import OrderDetailsService from '../../services/OrderDetailsService';
import { clearUserCart, getCart } from '../cart/CartLogic';

function DialogStepper({ open, onClose, user_id }) {
  const [activeStep, setActiveStep] = useState(0);
  const [order, setOrder] = useState({
    paymentStatus: '',
    orderStatus: '',
    totalPrice: null,
    orderDate: new Date().toISOString(),
    userId: user_id,
    addressId: null,
    paymentId: null, 
    deliveryMethodId: null, 
  });

  const handleSelectOrderPayment = ({ paymentMethod, deliveryMethod }) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      paymentId: paymentMethod,
      deliveryMethodId: deliveryMethod,
      paymentStatus: paymentMethod === 2 ? 'paid' : 'pending',
      orderStatus: paymentMethod === 2 ? 'pending shipment' : 'pending payment',
    }));
  };

  const updateOrderTotalPrice = (price) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      totalPrice: price,
    }));
  };

  const atChooseAddress = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      addressId: Cookies.get("addressId"),
    }));
    handleNext();
  }

  const steps = [
    { label: 'Choose an address', component: <ChooseAddress user_id={user_id}/>},
    { label: 'Pay now?', component: <ChooseOrderPayment /> },
    { label: 'Confirm checkout', component: <ConfirmOrder/> },
  ];

  const handleNext = async () => {
    if(activeStep === steps.length - 1) {
      const orderId = await OrderService.addOrder(order);
      await OrderDetailsService.addOrderDetail(orderId, getCart());
      clearUserCart(user_id)
      window.location.reload();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Complete your order</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label.label}>
              <StepLabel>{label.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>Order completed</Typography>
            </div>
          ) : (
            <div>
              {React.cloneElement(steps[activeStep].component, {
                user_id,
                order,
                onSelect: handleSelectOrderPayment,
                onSelectAddress: atChooseAddress,
                handleNext,
                handleBack,
                updateOrderTotalPrice,
              })}

              <div style={{ marginTop: '20px' }}>
                <Button disabled={activeStep === 0} onClick={handleBack} color='success'>
                  Back
                </Button>
                <Button
                  disabled={activeStep === 0}
                  variant="contained"
                  color="success"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Checkout' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogStepper;