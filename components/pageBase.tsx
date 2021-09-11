// @ts-nocheck
import styles from 'styles/PageBase.module.scss';

// Components
import Navigation from './navigation';
import Footer from './footer';
import { createContext } from 'react';
import { useContext } from 'react';

const UserInfoContext = createContext();

export default function PageBase({ children, user_info }) {
    return (
        <UserInfoContext.Provider value={user_info}>
            <Navigation user_info={user_info} />
            <main className={styles.container}>
                {children}
            </main>
            <Footer />
        </UserInfoContext.Provider>
    );
}

export function useUserInfoContext() {
    return useContext(UserInfoContext);
}