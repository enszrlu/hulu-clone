import React from 'react';
import { auth } from '../../firebase';
import { useRef } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                //router.push('/account');
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                //router.push('/account');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="mx-auto w-fit flex flex-col gap-3 shadow-xl bg-[#19313e] p-8 rounded-md text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl text-white py-3">Sign In</h1>
            <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                className="w-96 h-10 px-3 rounded-md border-2 border-gray text-black focus:outline-green-500"
                placeholder="Email"
            />
            <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                className="w-96 h-10 px-3 rounded-md border-2 border-gray text-black focus:outline-green-500"
                placeholder="Password"
            />
            <button
                className="w-96 h-10 rounded-md border-2 border-none bg-huluGreen focus:outline-green-500"
                onClick={signIn}
            >
                Sign In
            </button>
            <span className="py-3">
                New to Netflix?{' '}
                <a href="#" className="text-huluGreen font-bold" onClick={signUp}>
                    Sign Up now.
                </a>
            </span>
        </div>
    );
}

export default SignIn;
