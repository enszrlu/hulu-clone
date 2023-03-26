import React from 'react';

function HeaderItem({ Icon, title, onClick }) {
    return (
        <div
            onClick={onClick}
            className="group flex flex-col items-center text-center cursor-pointer gap-2 w-10"
        >
            <Icon className="h-6 w-6 group-hover:animate-bounceCustom"></Icon>
            <p className="opacity-0 group-hover:opacity-100 text-xs md:block group-active:text-red-500">
                {title}
            </p>
        </div>
    );
}

export default HeaderItem;
