import Head from 'next/head';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Content from '../components/Content';
import requestsSearch from '../../utils/requestsSearch';

export default function Home({ data, keyword }) {
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
        </div>
    );
}

export async function getServerSideProps(context) {
    const query = context.query.query;

    const requestMovie = await fetch(
        `https://api.themoviedb.org/3${requestsSearch['searchMovie']?.url}&query=${query}`
    ).then((res) => res.json());
    const requestTV = await fetch(
        `https://api.themoviedb.org/3${requestsSearch['searchTV']?.url}&query=${query}`
    ).then((res) => res.json());

    const results = [...requestMovie.results, ...requestTV.results];

    results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));

    return {
        props: { data: results, keyword: query }
    };
}
