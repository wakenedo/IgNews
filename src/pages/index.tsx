import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

// Client-side
// Server-side - Pages that are heavily on dynamic data from users 
// Static Site Generation - Pages that are the same for everyone, like homepages, product pages, blog posts

// Blog Post 

// Content (SSG)
// Comments (Client-side)

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product} : HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br /> the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br />
            <span>for {product.amount} monthly</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <Image  width='200px' height='350px' src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// SSR only on pages    
// Functions that use the Next.js node server
//export const getServerSideProps: GetServerSideProps = async () => {

// SSG 
// Using this method, you can generate a static html, and set up 
// the frequency you want if refreshed with the method revalidate below
export const getStaticProps: GetStaticProps = async () => {
  console.log('This is Next Node Server Log')

  const price = await stripe.prices.retrieve('price_1KWNU1JGp1HSI7VlxZ1EaA9o', {
    // Since Stripe Api uses the product id when fetching the price, we need to
    // we can get the whole product info with the method below
    // expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',

    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}