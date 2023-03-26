import Head from 'next/head';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Content from '../components/Content';
import requests from '../../utils/requests';

export default function Home({ data }) {
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
        </div>
    );
}

export async function getServerSideProps(context) {
    const genre = context.query.genre;
    const request = await fetch(
        `https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url}`
    ).then((res) => res.json());

    return {
        props: { data: request.results }
    };
}
