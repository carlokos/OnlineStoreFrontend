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
import CartService from '../../services/cartService';

function DialogStepper({ open, onClose, user_id }) {
  const [activeStep, setActiveStep] = useState(0);
  const [order, setOrder] = useState({
    paymentStatus: 'paid',
    orderStatus: 'delivered',
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

  const handleNext = () => {
    if(activeStep === steps.length - 1) {
      OrderService.addOrder(order);
      window.location.reload();
      CartService.clearUserCart(user_id);
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
              })}

              <div style={{ marginTop: '20px' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Atrás
                </Button>
                <Button
                  disabled={activeStep === 0}
                  variant="contained"
                  color="primary"
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