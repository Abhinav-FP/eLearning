import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://api.japaneseforme.com/api/payment/webhook', { method: 'POST' })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements || !clientSecret) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement }
        });

        if (error) {
            console.error('Payment error:', error);
        } else {
            console.log('Payment successful:', paymentIntent);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
}

export default CheckoutForm;
