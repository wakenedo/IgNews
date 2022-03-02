import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | IgNews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Um pouco mais sobre TypeScript</strong>
                        <p>TypeScript, desenvolvido pela Microsoft, é um superconjunto de JavaScript, o que significa que tudo que o JavaScript pode fazer, o TypeScript pode fazer (e Melhor)</p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Um pouco mais sobre TypeScript</strong>
                        <p>TypeScript, desenvolvido pela Microsoft, é um superconjunto de JavaScript, o que significa que tudo que o JavaScript pode fazer, o TypeScript pode fazer (e Melhor)</p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Um pouco mais sobre TypeScript</strong>
                        <p>TypeScript, desenvolvido pela Microsoft, é um superconjunto de JavaScript, o que significa que tudo que o JavaScript pode fazer, o TypeScript pode fazer (e Melhor)</p>
                    </a>
                </div>
            </main>

        </>
    );
}