import { loadStripe } from '@stripe/stripe-js'
import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const { data: session } = useSession()

    async function handleSubscribe() {

        

        if (!session) {
            signIn('github')
            return
        }

        //creating check out session next/stripe
        try {
            
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
            
            stripe.redirectToCheckout({ sessionId: sessionId })

                 console.log('sessionId log:',stripe)
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <button
            type='button'
            className={styles.subscribeButton}
            onClick={() => handleSubscribe()}
        >
            Subscribe Now
        </button>
    )
}