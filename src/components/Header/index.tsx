import Image from 'next/image';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from './SignInButton';

import styles from './styles.module.scss';



export function Header() {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.headerImage}>
                    <h1>teests</h1>
                    <Image width='100px' height='100px' src="/images/logo.svg" alt="ig.news" />
                </div>
                <nav>
                    <ActiveLink activeClassName={styles.active} href='/'>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href='/posts'>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
}