import Head from 'next/head';
import Header from '../components/Header';
import SignIn from '@/components/SignIn';

import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../store/userSlice';
import AccountPanel from '@/components/AccountPanel';

export default function Account() {
    const user = useSelector(selectUser);

    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        uid: userAuth.uid,
                        email: userAuth.email
                    })
                );
            } else {
                dispatch(logout());
            }
        });
        return unsubscribe;
    }, []);

    const signOutUser = () => {
        signOut(auth).catch((error) => {
            alert(error.message);
        });
    };

    // console.log(user);

    return (
        <div className="bg-darkBlue min-h-[100svh]">
            <Head>
                <title>Hulu Account</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/icons8-hulu-16.png" />
            </Head>
            {/* Header */}
            <Header></Header>

            {!user ? (
                <SignIn></SignIn>
            ) : (
                <>
                    <AccountPanel user={user} signOutUser={signOutUser}></AccountPanel>
                </>
            )}
        </div>
    );
}
