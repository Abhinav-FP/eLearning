import React from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function PaypalCheckout() {
  // Make this async to handle the axios call properly
  const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL
 const handlePaymentSave = async (details) => {
  try {
    const response = await axios.post(`${BACKEND_URL}payment/save`, {
      orderID: details.id,
      amount: details.purchase_units?.[0]?.amount?.value,
      payer: details.payer,
      status: details.status,
    });
  } catch (error) {
    console.error("Error saving payment:", error);
  }
};

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <div style={{ maxWidth: '400px', margin: 'auto', marginTop: 40 }}>
        <h2>Pay $20 with PayPal</h2>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: "20.00" },
              }],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            alert('Transaction completed by ' + details.payer.name.given_name);
            await handlePaymentSave(details);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
