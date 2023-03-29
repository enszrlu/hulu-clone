/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org']
    },
    env: {
        API_KEY_YOUTUBE: process.env.API_KEY_YOUTUBE
    },
    reactStrictMode: true
};

module.exports = nextConfig;
