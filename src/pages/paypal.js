import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function PaypalCheckout() {
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
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
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
              alert('Transaction completed by ' + details.payer.name.given_name);

              fetch("https://a107-122-180-247-198.ngrok-free.app/api/paypal/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(details),
              }).then(res => res.json())
                .then(response => {
                  console.log("Saved to backend:", response);
                }).catch(err => {
                  console.error("Error saving to backend:", err);
                });
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
