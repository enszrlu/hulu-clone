import Head from 'next/head';
import Header from '../components/Header';
import Content from '../components/Content';

import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase';
import cookie from 'cookie';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';

export default function Bookmarks({ data, maxPages }) {
    const router = useRouter();
    function handleChange(page) {
        router.push(`/bookmarks?page=${page}`);
    }

    console.log(data);
    return (
        <div className="bg-darkBlue min-h-[100svh]">
            <Head>
                <title>Hulu Search</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/icons8-hulu-16.png" />
            </Head>
            {/* Header */}
            <Header></Header>
            {/* Nav */}
            {/* <Nav></Nav> */}
            <h1 className="text-4xl text-white mx-10 my-6">Movies & TV Series in your bookmark</h1>

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

    const userRef = await doc(db, 'bookmarks', user);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        bookmarks = userSnap.data().bookmarks || [];
    }

    const maxPages = Math.floor(bookmarks.length / 18) + 1;

    for (let i = 18 * (page - 1); i < Math.min(bookmarks.length, page * 18); i++) {
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

    return {
        props: { data: requestMovie, maxPages }
    };
}
