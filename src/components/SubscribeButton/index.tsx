import { loadStripe } from '@stripe/stripe-js'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SubscribeButton() {
    const { data: session } = useSession()
    const router = useRouter()

    async function handleSubscribe() {

        if (!session) {
            signIn('github')
            return
        }

        if (session.activeSubscription) {
            router.push('/posts');
            return;
        }

        //creating check out session next/stripe
        try {

            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

            stripe.redirectToCheckout({ sessionId: sessionId })

            console.log('sessionId log:', stripe)
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