import React from 'react';
import Movie from './Movie';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import youtubeRequest from '../../utils/youtubeRequest';

function Content({ data }) {
    const [viewportWidth, setViewportWidth] = useState('500');
    const [viewportHeight, setViewportHeight] = useState('500');
    const [trailer, setTrailer] = useState(false);
    const [trailerId, setTrailerId] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setViewportWidth(window.innerWidth || '500');
            setViewportHeight(window.innerHeight || '500');
        }

        const handleResize = () => {
            setViewportWidth(window.innerWidth || '500');
            setViewportHeight(window.innerHeight || '500');
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const opts = {
        height: viewportHeight * 0.8,
        width: viewportWidth * 0.8,
        playerVars: {
            autoplay: 1
        }
    };

    const handleClick = async (title, date) => {
        const query = `${title} ${date.substring(0, 4)} Official Trailer`;
        const youtubeData = await fetch(`${youtubeRequest['trailer']?.url}&q=${query}`).then(
            (res) => res.json()
        );
        console.log(youtubeData);
        setTrailer(true);
        setTrailerId(youtubeData.items[0].id.videoId);
    };

    return (
        <div className="grid grid-cols-1 gap-6 px-10 overflow-hidden md:grid-cols-2 lg:grid-cols-3 3xl:flex 3xl:flex-wrap">
            {trailer && (
                <div className="fixed z-50 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
                    <div className="flex justify-end">
                        <XMarkIcon
                            className="h-10 w-10 text-white cursor-pointer"
                            onClick={() => setTrailer(false)}
                        ></XMarkIcon>
                    </div>
                    <YouTube videoId={trailerId} opts={opts} />
                </div>
            )}

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
                    onClick={() =>
                        handleClick(
                            movie.title ||
                                movie.original_name ||
                                movie.original_title ||
                                movie.name,
                            movie.release_date || movie.first_air_date
                        )
                    }
                ></Movie>
            ))}
        </div>
    );
}

export default Content;
