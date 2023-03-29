import Head from 'next/head';
import Header from '../components/Header';
import Content from '../components/Content';
import requestsCollections from '../../utils/requestsCollections';

export default function CollectionMovies({ data, colName }) {
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
            <h1 className="text-4xl text-white mx-10 my-6">Movies in Collection "{colName}"</h1>

            {/* Content */}
            <Content data={data}></Content>
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = context.query.id;

    const requestCollection = await fetch(
        `https://api.themoviedb.org/3/collection/${id}${requestsCollections['collection']?.url}`
    ).then((res) => res.json());

    const results = requestCollection.parts;

    results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));

    return {
        props: { data: results, colName: requestCollection.name }
    };
}
