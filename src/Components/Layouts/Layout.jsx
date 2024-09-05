// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
