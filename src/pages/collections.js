import Head from 'next/head';
import Header from '../components/Header';
import ContentCollection from '../components/ContentCollection';
import requestsCollections from '../../utils/requestsCollections';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';

export default function Collections({ data, maxPage }) {
    const router = useRouter();
    function handleChange(page) {
        router.push(`/collections?page=${page}`);
    }

    function handleClick(id) {
        router.push(`/collectionMovies?id=${id}`);
    }
    return (
        <div className="bg-darkBlue min-h-[100svh]">
            <Head>
                <title>Hulu Collections</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/icons8-hulu-16.png" />
            </Head>
            {/* Header */}
            <Header></Header>

            {/* Content */}
            <ContentCollection data={data} handleClick={handleClick}></ContentCollection>

            {/* Pagination */}
            <Pagination handleChange={handleChange} maxPages={maxPage}></Pagination>
        </div>
    );
}

export async function getServerSideProps(context) {
    const page = context.query.page || 1;
    let results = [];
    let requestCollection;
    let collectionIds = [
        10, 84, 119, 131, 151, 230, 263, 264, 295, 304, 328, 399, 420, 432, 456, 495, 528, 529, 556,
        645, 656, 735, 748, 937, 945, 1006, 1241, 1565, 1570, 1575, 1582, 1617, 1657, 1709, 1733,
        1952, 1960, 1972, 1974, 2150, 2248, 2326, 2344, 2366, 2396, 2467, 2488, 2602, 2643, 2794,
        2806, 2883, 2955, 2980, 3106, 3167, 3169, 3292, 3601, 3963, 4246, 4438, 4545, 5039, 5202,
        5547, 8050, 8091, 8354, 8412, 8537, 8580, 8581, 8647, 8650, 8783, 8819, 8858, 8864, 8917,
        8918, 8936, 8945, 8979, 9046, 9068, 9088, 9309, 9328, 9329, 9332, 9338, 9380, 9435, 9436,
        9485, 9500, 9518, 9521, 9649
    ];
    const maxPage = Math.ceil(collectionIds.length / 18);

    for (let i = (page - 1) * 18; i < Math.min(collectionIds.length, page * 18); i++) {
        requestCollection = await fetch(
            `https://api.themoviedb.org/3/collection/${collectionIds[i]}${requestsCollections['collection']?.url}`
        ).then((res) => res.json());

        if (requestCollection.name) {
            results = [
                ...results,
                {
                    name: requestCollection.name,
                    overview: requestCollection.overview,
                    poster_path: requestCollection.poster_path,
                    backdrop_path: requestCollection.backdrop_path,
                    id: requestCollection.id,
                    parts: requestCollection.parts
                }
            ];
        }
    }

    return {
        props: { data: results, maxPage: maxPage }
    };
}
