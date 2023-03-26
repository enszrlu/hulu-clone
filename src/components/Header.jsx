import React from 'react';
import {
    HomeIcon,
    BoltIcon,
    CheckBadgeIcon,
    RectangleStackIcon,
    MagnifyingGlassIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import HeaderItem from './HeaderItem';
import { useRouter } from 'next/router';

function Header() {
    const router = useRouter();
    return (
        <div className="sticky top-0 z-20 flex px-10 pt-6 pb-3 text-white flex-col items-center gap-4 shadow-lg md:flex-row md:justify-between">
            <div id="icons" className="flex w-64 justify-between md:w-96">
                <HeaderItem
                    onClick={() => router.push('/')}
                    Icon={HomeIcon}
                    title="HOME"
                ></HeaderItem>
                <HeaderItem
                    onClick={() => router.push(`/?genre=fetchTrending`)}
                    Icon={BoltIcon}
                    title="TRENDING"
                ></HeaderItem>
                <HeaderItem Icon={CheckBadgeIcon} title="VERIFIED"></HeaderItem>
                <HeaderItem Icon={RectangleStackIcon} title="COLLECTIONS"></HeaderItem>
                <HeaderItem Icon={MagnifyingGlassIcon} title="SEARCH"></HeaderItem>
                <HeaderItem Icon={UserIcon} title="ACCOUNT"></HeaderItem>
            </div>
            <div className="relative h-8 w-24">
                <Image
                    src="/img/Hulu_Logo.svg"
                    fill
                    className="object-fill"
                    alt="Hulu Logo"
                ></Image>
            </div>
        </div>
    );
}

export default Header;
