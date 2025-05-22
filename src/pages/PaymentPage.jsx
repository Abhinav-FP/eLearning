import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NrWrwLC7I4RGdNgPDqyNBZkwtOQi21nQF4EJ0PjVVvf1oEn0G61NGw1zraI9evynLYk0ctxymwCAPina13jUXhz00TxQmEzhO');

function PaymentPage() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

export default PaymentPage;
