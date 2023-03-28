import React from 'react';
import Movie from './Movie';

function Content({ data }) {
    return (
        <div className="grid grid-cols-1 gap-6 px-10 overflow-hidden md:grid-cols-2 lg:grid-cols-3 3xl:flex 3xl:flex-wrap">
            {data.map((movie) => (
                <Movie
                    key={movie.id}
                    img={
                        movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                            : null
                    }
                    overview={movie.overview}
                    title={movie.title || movie.original_name || movie.original_title || movie.name}
                    date={movie.release_date || movie.first_air_date}
                    vote={movie.vote_count}
                ></Movie>
            ))}
        </div>
    );
}

export default Content;
