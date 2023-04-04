import Head from 'next/head';
import Header from '../components/Header';
import Content from '../components/Content';

import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase';
import cookie from 'cookie';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';

export default function Recommended({ data, maxPages }) {
    console.log(data);
    const router = useRouter();
    function handleChange(page) {
        router.push(`/recommended?page=${page}`);
    }

    return (
        <div className="bg-darkBlue min-h-[100svh]">
            <Head>
                <title>Hulu Search</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/icons8-hulu-16.png" />
            </Head>
            {/* Header */}
            <Header></Header>

            <h1 className="text-4xl text-white mx-10 my-6">
                Movies & TV Series Recommended for you
            </h1>

            {/* Content */}
            <Content data={data}></Content>

            {/* Pagination */}
            <Pagination handleChange={handleChange} maxPages={maxPages}></Pagination>
        </div>
    );
}

export async function getServerSideProps(context) {
    const page = context.query.page || 1;
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const user = cookies.userId;
    let bookmarks = [];
    let requestPromises = [];
    let recommendPromises = [];

    const userRef = await doc(db, 'bookmarks', user);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        bookmarks = userSnap.data().bookmarks || [];
    }

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].includes('tv')) {
            const requestPromise = fetch(
                `https://api.themoviedb.org/3/tv/${bookmarks[i].split('-')[1]}?api_key=${
                    process.env.API_KEY
                }`
            ).then((res) => res.json());
            requestPromises.push(requestPromise);
        } else {
            const requestPromise = fetch(
                `https://api.themoviedb.org/3/movie/${bookmarks[i].split('-')[1]}?api_key=${
                    process.env.API_KEY
                }`
            ).then((res) => res.json());
            requestPromises.push(requestPromise);
        }
    }

    const requestMovie = await Promise.all(requestPromises);
    requestMovie.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));

    const ratio = Math.max(Math.floor(18 / requestMovie.length), 1);

    for (let i = 0; i < Math.min(requestMovie.length, 18); i++) {
        let typeMovie = requestMovie[i].release_date ? true : false;

        if (typeMovie) {
            const requestPromise = fetch(
                `https://api.themoviedb.org/3/movie/${requestMovie[i].id}/similar?api_key=${process.env.API_KEY}`
            ).then((res) => res.json());
            recommendPromises.push(requestPromise);
        } else {
            const requestPromise = fetch(
                `https://api.themoviedb.org/3/tv/${requestMovie[i].id}/similar?api_key=${process.env.API_KEY}`
            ).then((res) => res.json());
            recommendPromises.push(requestPromise);
        }
    }

    let recommendResults = [];
    const recommendResponse = await Promise.all(recommendPromises);
    for (let i = 0; i < recommendResponse.length; i++) {
        recommendResults = [...recommendResults, ...recommendResponse[i].results];
    }

    recommendResults.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));

    const maxPages = Math.floor(recommendResults.length / 18) + 1;

    return {
        props: { data: recommendResults.slice(18 * (page - 1), 18 * page), maxPages }
    };
}
