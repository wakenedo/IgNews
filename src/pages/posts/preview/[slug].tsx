import { GetStaticProps } from "next"
import { getSession } from "next-auth/react"
import { getPrismicClient } from "../../../services/prismic"
import { RichText } from 'prismic-dom'
import Head from "next/head"

import styles from '../post.module.scss'

interface PostPreviewProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updatedAt: string
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    return (
        <>
            <Head>{post.title}</Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }} />

                </article>
            </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug

    const prismic = getPrismicClient()

    const response = await prismic.getByUID<any>('post', String(slug), {})

    const post = {
        slug: response.uid,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString(
            'pt-br',
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
    }

    return {
        props: {
            post,
        }
    }
}