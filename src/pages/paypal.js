import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';


// Load your publishable key from env
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setMessage(null);

        if (!stripe || !elements) {
            setMessage('Stripe.js has not loaded yet.');
            setIsLoading(false);
            return;
        }

        try {
            // Use axios to call backend API
            const { data } = await axios.post('https://edd0-122-180-247-198.ngrok-free.app/create-payment-intent', {
                amount: 2000, // amount in cents
            });

            const clientSecret = data.clientSecret;

            const cardElement = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });
console.log("paymentResult" ,paymentResult)
            if (paymentResult.error) {
                setMessage(paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                setMessage('Payment successful! Thank you.');
            }
        } catch (error) {
            setMessage(error.response?.data?.error || error.message);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
            <h2>Pay $20</h2>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#32325d',
                            '::placeholder': { color: '#a0aec0' },
                        },
                        invalid: { color: '#fa755a' },
                    },
                }}
            />
            <button
                type="submit"
                disabled={!stripe || isLoading}
                style={{
                    marginTop: 20,
                    padding: '10px 20px',
                    backgroundColor: '#6772e5',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
            >
                {isLoading ? 'Processing...' : 'Pay $20'}
            </button>
            {message && <div style={{ marginTop: 20, color: 'red' }}>{message}</div>}
        </form>
    );
};

export default function paypal() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}
