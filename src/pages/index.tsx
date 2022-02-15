import styles from '../styles/home.module.scss'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>
      <h1 className={styles.title}>Hello World</h1>
    </>
  )
}
