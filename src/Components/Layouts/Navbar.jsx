// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
    return (
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <div>
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
