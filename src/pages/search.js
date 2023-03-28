import Head from 'next/head';
import Header from '../components/Header';
import Content from '../components/Content';
import requestsSearch from '../../utils/requestsSearch';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';

export default function Search({ data, keyword, maxPages }) {
    const router = useRouter();
    function handleChange(page) {
        router.push(`/search?query=${keyword}&page=${page}`);
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
            {/* Nav */}
            {/* <Nav></Nav> */}
            <h1 className="text-4xl text-white mx-10 my-6">Search Results for "{keyword}"</h1>

            {/* Content */}
            <Content data={data}></Content>

            {/* Pagination */}
            <Pagination handleChange={handleChange} maxPages={maxPages}></Pagination>
        </div>
    );
}

export async function getServerSideProps(context) {
    const query = context.query.query;
    const page = context.query.page || 1;

    let requestMovie = await fetch(
        `https://api.themoviedb.org/3${requestsSearch['searchMovie']?.url}&query=${query}&page=${page}`
    ).then((res) => res.json());
    let requestTV = await fetch(
        `https://api.themoviedb.org/3${requestsSearch['searchTV']?.url}&query=${query}&page=${page}`
    ).then((res) => res.json());

    const maxPages = Math.floor((requestMovie.total_pages + requestTV.total_pages) / 2);

    let results = [...requestMovie.results, ...requestTV.results];

    if (requestMovie.total_pages < page) {
        requestTV = await fetch(
            `https://api.themoviedb.org/3${requestsSearch['searchTV']?.url}&query=${query}&page=${
                2 * page - requestMovie.total_pages - 1
            }`
        ).then((res) => res.json());
        let requestTV2 = await fetch(
            `https://api.themoviedb.org/3${requestsSearch['searchTV']?.url}&query=${query}&page=${
                2 * page - requestMovie.total_pages
            }`
        ).then((res) => res.json());
        results = [...requestTV.results, ...requestTV2.results];
    }
    if (requestTV.total_pages < page) {
        requestMovie = await fetch(
            `https://api.themoviedb.org/3${
                requestsSearch['searchMovie']?.url
            }&query=${query}&page=${2 * page - requestTV.total_pages - 1}`
        ).then((res) => res.json());
        let requestMovie2 = await fetch(
            `https://api.themoviedb.org/3${
                requestsSearch['searchMovie']?.url
            }&query=${query}&page=${2 * page - requestTV.total_pages}`
        ).then((res) => res.json());
        results = [...requestMovie.results, ...requestMovie2.results];
    }

    results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));

    return {
        props: { data: results, keyword: query, maxPages: maxPages }
    };
}
