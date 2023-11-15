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

function DialogStepper({ open, onClose, user_id }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [order, setOrder] = useState({
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    userId: user_id,
    addressId: null,
    paymentId: 1, 
    deliveryMethodId: 1, 
  });

  const handleSelectOrderPayment = ({ paymentMethod, deliveryMethod }) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      paymentId: paymentMethod,
      deliveryMethodId: deliveryMethod,
    }));
  };

  const steps = [
    { label: 'Choose an address', component: <ChooseAddress user_id={user_id} sendAddress={(address) => setSelectedAddress(address)} 
    handleNext={() => setActiveStep((prev) => prev + 1)}/>},
    { label: 'Pay now?', component: <ChooseOrderPayment /> },
    { label: 'Confirm checkout', component: <ConfirmOrder /> },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const viewOrder = () => {
    console.log(order);
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
              <Typography>Todos los pasos completados. ¡Listo!</Typography>
              <Button onClick={handleReset}>Reiniciar</Button>
              {viewOrder()}
            </div>
          ) : (
            <div>
              {React.cloneElement(steps[activeStep].component, {
                user_id,
                order,
                onSelect: handleSelectOrderPayment,
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