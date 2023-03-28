import Head from 'next/head';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Content from '../components/Content';
import requests from '../../utils/requests';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

export default function Home({ data, maxPages, genre }) {
    const router = useRouter();
    function handleChange(page) {
        router.push({
            pathname: '/',
            query: genre ? { page: page, genre: genre } : { page: page }
        });
    }
    return (
        <div className="bg-darkBlue min-h-[100svh]">
            <Head>
                <title>Hulu</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/icons8-hulu-16.png" />
            </Head>
            {/* Header */}
            <Header></Header>
            {/* Nav */}
            <Nav></Nav>

            {/* Content */}
            <Content data={data}></Content>

            {/* Pagination */}
            <Pagination maxPages={maxPages} handleChange={handleChange}></Pagination>
        </div>
    );
}

export async function getServerSideProps(context) {
    const genre = context.query.genre;
    const page = context.query.page || 1;
    const request = await fetch(
        `https://api.themoviedb.org/3${
            requests[genre]?.url || requests.fetchTrending.url
        }&page=${page}`
    ).then((res) => res.json());

    const maxPages = Math.min(500, request.total_pages);

    return {
        props: { data: request.results, maxPages: maxPages, genre: genre || null }
    };
}
