// src/components/SidebarItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ title, to }) => {
    return (
        <li>
            <Link to={to} className="block p-4 hover:bg-gray-700">
                {title}
            </Link>
        </li>
    );
};

export default SidebarItem;
