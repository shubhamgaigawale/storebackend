// src/components/SidebarMenu.js
import React, { useState } from 'react';
import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li>
            <button
                onClick={toggleMenu}
                className="w-full text-left block p-4 hover:bg-gray-700 flex items-center"
            >
                {title}
                <svg
                    className={`w-5 h-5 ml-auto transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <ul className="pl-4">
                    {items.map((item, index) => (
                        <SidebarMenuItem
                            key={index}
                            title={item.title}
                            to={item.path}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarMenu;
