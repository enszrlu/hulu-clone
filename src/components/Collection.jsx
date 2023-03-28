import React from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { forwardRef } from 'react';

const Collection = forwardRef(({ img, overview, title }, ref) => {
    return (
        <div
            ref={ref}
            className="w-full h-96 text-white flex flex-col gap-1 hover:scale-105  transform transition duration-300 ease-out group 3xl:w-96"
        >
            <div className="relative h-[70%]">
                <Image
                    src={img || '/img/movie_placeholder.png'}
                    fill
                    className="object-cover object-center"
                    alt={title}
                ></Image>
            </div>
            <p className="truncate text-sm text-gray-400 font-light">{overview}</p>
            <h2 className="text-xl font-semibold">{title}</h2>
        </div>
    );
});

export default Collection;
