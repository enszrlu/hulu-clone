import React from 'react';
import {
    HomeIcon,
    BoltIcon,
    CheckBadgeIcon,
    RectangleStackIcon,
    MagnifyingGlassIcon,
    UserIcon,
    BookmarkSquareIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import HeaderItem from './HeaderItem';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../store/userSlice';
import { Transition } from '@headlessui/react';

function Header() {
    const [searchToggle, setSearchToggle] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();

    function search() {
        if (!searchInput) {
            alert('Please Enter a Search Term');
            return;
        }
        setSearchInput('');
        router.push({
            pathname: '/search',
            query: {
                query: searchInput
            }
        });
    }
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            search();
        }
    }

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        uid: userAuth.uid,
                        email: userAuth.email
                    })
                );
            } else {
                dispatch(logout());
            }
        });
        return unsubscribe;
    }, []);

    return (
        <div
            className="sticky top-0 z-20 flex px-10 pt-6 pb-3 text-white flex-col items-center gap-4 shadow-lg md:flex-row md:justify-items-stretch select-none"
            onClick={(e) => setSearchToggle(false)}
        >
            <div id="icons" className="flex w-64 justify-between items-center md:w-96">
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

                <HeaderItem
                    Icon={RectangleStackIcon}
                    title="COLLECTIONS"
                    onClick={() => router.push(`/collections`)}
                ></HeaderItem>
                <HeaderItem
                    onClick={(e) => {
                        e.stopPropagation();
                        setSearchToggle((prev) => !prev);
                    }}
                    Icon={MagnifyingGlassIcon}
                    title="SEARCH"
                    id="search"
                ></HeaderItem>
                <Transition
                    show={user?.uid ? true : false}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0 w-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="flex gap-1 md:gap-4">
                        <HeaderItem
                            onClick={() => router.push('/bookmarks')}
                            Icon={BookmarkSquareIcon}
                            title="BOOKMARKS"
                        ></HeaderItem>
                        <HeaderItem
                            onClick={() => router.push('/recommended')}
                            Icon={CheckBadgeIcon}
                            title="RECOMMENDED"
                        ></HeaderItem>
                    </div>
                </Transition>

                <HeaderItem
                    onClick={() => router.push('/account')}
                    Icon={UserIcon}
                    title="ACCOUNT"
                ></HeaderItem>
            </div>
            {/* Search Box */}
            <Transition
                show={searchToggle}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="flex items-center rounded-full p-1 pl-5 justify-between gap-2 relative -top-3 border-2"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            handleKeyPress(e);
                        }}
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none flex-grow text-sm text-gray-200 placeholder-gray-400"
                    />
                    <MagnifyingGlassIcon
                        className="h-8 bg-green-400 text-white rounded-full p-2 cursor-pointer md:inline-flex"
                        onClick={search}
                    ></MagnifyingGlassIcon>
                </div>
            </Transition>

            <div className="relative h-8 w-24 -top-3 justify-self-end md:ml-auto">
                <Image
                    onClick={() => router.push('/')}
                    src="/img/Hulu_Logo.svg"
                    fill
                    className="object-fill cursor-pointer"
                    alt="Hulu Logo"
                ></Image>
            </div>
        </div>
    );
}

export default Header;
