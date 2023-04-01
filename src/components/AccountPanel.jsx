import React from 'react';
import Plans from './Plans';

function AccountPanel({ user, signOutUser }) {
    return (
        <div className="mx-auto w-fit my-24 text-white flex flex-col gap-3">
            <h1 className="text-4xl border-b-2 border-gray-500 ">Edit Profile</h1>
            <h1 className="text-white">{`Logged In with '${user.email}'`}</h1>

            <Plans></Plans>
            <button
                className="w-full my-10 h-10 rounded-md border-2 border-none bg-huluGreen focus:outline-green-500"
                onClick={signOutUser}
            >
                Logout
            </button>
        </div>
    );
}

export default AccountPanel;
