import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {

    function handleSubscribe() {
        const { data: session } = useSession()
        
        if (!session) {
            signIn('github')
            return
        }

        //creating check out session next/stripe
        
    }

    return (
        <button
            type='button'
            className={styles.subscribeButton}
        >
            Subscribe Now
        </button>
    )
}