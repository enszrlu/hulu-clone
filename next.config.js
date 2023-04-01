/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org']
    },
    env: {
        API_KEY_YOUTUBE: process.env.API_KEY_YOUTUBE,
        API_KEY_FIREBASE: process.env.API_KEY_FIREBASE,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        REACT_APP_STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY
    },
    reactStrictMode: true
};

module.exports = nextConfig;
