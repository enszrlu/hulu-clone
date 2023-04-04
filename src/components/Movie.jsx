import React from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { forwardRef, useState, useEffect } from 'react';
import { Alert } from '@mui/material';

import { doc, updateDoc, onSnapshot, collection, addDoc, getDoc, setDoc } from 'firebase/firestore';
import db from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';

const Movie = forwardRef(
    (
        { img, overview, title, date, vote, onClick, id, bookmarkUpdate, savedBookmarks, type },
        ref
    ) => {
        const [showAlert, setShowAlert] = useState(false);
        const [alertType, setAlertType] = useState(0);
        const user = useSelector(selectUser);

        useEffect(() => {
            let timeoutId;
            if (showAlert) {
                timeoutId = setTimeout(() => {
                    setShowAlert(false);
                    setAlertType(0);
                }, 2000);
            }
            return () => clearTimeout(timeoutId);
        }, [showAlert]);

        const handleClick = async () => {
            try {
                const userRef = doc(db, 'bookmarks', user.uid);
                const userSnap = await getDoc(userRef);
                if (!userSnap.exists()) {
                    await setDoc(userRef, { bookmarks: [`${type}-${id}`] });
                } else {
                    const userBookmarks = userSnap.data().bookmarks || [];
                    if (!userBookmarks.includes(`${type}-${id}`)) {
                        userBookmarks.push(`${type}-${id}`);
                        await updateDoc(userRef, { bookmarks: userBookmarks });
                        setAlertType(1);
                    } else {
                        const updatedBookmarks = userSnap
                            .data()
                            .bookmarks.filter((bookmark) => bookmark !== `${type}-${id}`);
                        await updateDoc(userRef, { bookmarks: updatedBookmarks });
                        setShowAlert(true);
                        setAlertType(-1);
                    }
                }
                setShowAlert(true);
                bookmarkUpdate();
            } catch (error) {
                console.error('Error adding movie to bookmarks', error);
            }
        };

        return (
            <div className="relative">
                <div
                    ref={ref}
                    className="w-full h-96 text-white flex flex-col gap-1 hover:scale-105  transform transition duration-300 ease-out group 3xl:w-96"
                >
                    <div className="relative h-[70%] cursor-pointer " onClick={onClick}>
                        <Image
                            src={img || '/img/movie_placeholder.png'}
                            fill
                            className="object-cover object-center"
                            alt={title}
                        ></Image>
                    </div>
                    <p className="truncate text-sm text-gray-400 font-light">{overview}</p>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <div className="opacity-0 flex items-center text-gray-400 font-light text-sm group-hover:opacity-100">
                        <p className="mr-3">{date}</p>
                        <HandThumbUpIcon className="w-4 h-4"></HandThumbUpIcon>
                        <p>{vote}</p>
                    </div>
                </div>
                <BookmarkIcon
                    className={`${
                        savedBookmarks.includes(`${type}-${id}`) ? 'text-huluGreen' : 'text-white'
                    } absolute top-1 right-1 h-6 w-6 hover:text-huluGreen cursor-pointer active:scale-90 transition duration-150`}
                    onClick={handleClick}
                ></BookmarkIcon>
                {showAlert ? (
                    alertType == 1 ? (
                        <Alert severity="success" className="absolute right-0 top-8">
                            Added to Bookmarks
                        </Alert>
                    ) : alertType == -1 ? (
                        <Alert severity="warning" className="absolute right-0 top-8">
                            Deleted from Bookmarks!
                        </Alert>
                    ) : (
                        false
                    )
                ) : (
                    false
                )}
            </div>
        );
    }
);

export default Movie;
