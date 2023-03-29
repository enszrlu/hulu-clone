import React from 'react';
import Collection from './Collection';

function ContentCollection({ data, handleClick }) {
    return (
        <div className="mt-10 grid grid-cols-1 gap-6 px-10 overflow-hidden md:grid-cols-2 lg:grid-cols-3 3xl:flex 3xl:flex-wrap">
            {data.map((collection) => (
                <Collection
                    key={collection.id}
                    img={
                        collection.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${collection.backdrop_path}`
                            : null
                    }
                    overview={collection.overview}
                    title={
                        collection.name ||
                        collection.original_name ||
                        collection.original_title ||
                        collection.title
                    }
                    onClick={() => handleClick(collection.id)}
                ></Collection>
            ))}
        </div>
    );
}

export default ContentCollection;
