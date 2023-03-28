import React from 'react';
import requests from '../../utils/requests';
import { useRouter } from 'next/router';

function Nav() {
    const router = useRouter();
    return (
        <nav className="text-white relative ">
            <div className="flex py-6 mr-10 px-10 whitespace-nowrap text-2xl gap-10 overflow-x-scroll scrollbar-hide">
                {Object.entries(requests).map(([key, { title, url }]) => (
                    <h2
                        key={key}
                        onClick={() => router.push(`/?genre=${key}`)}
                        className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 active:text-red-500"
                    >
                        {title}
                    </h2>
                ))}
            </div>
            <div className="absolute top-0 right-10 z-20 bg-gradient-to-l from-[#06202A] w-1/12 h-full"></div>
        </nav>
    );
}

export default Nav;
