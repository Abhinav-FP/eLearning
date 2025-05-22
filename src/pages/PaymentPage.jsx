// pages/payment.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage({ clientSecret, error }) {
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!clientSecret) return <p>Loading…</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `https://8fb7-122-180-247-198.ngrok-free.app/webhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2000 })
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Backend error: ${text}`);
    }

    const { clientSecret } = await res.json();
    return { props: { clientSecret } };
  } catch (err) {
    console.error('getServerSideProps error:', err);
    return {
      props: {
        clientSecret: null,
        error: err.message
      }
    };
  }
}
