// src/components/Sidebar.js
import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarMenu from './SidebarMenu';

const Sidebar = ({ items }) => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="mt-6">
                <ul>
                    {items.map((item, index) => {
                        if (item.subMenu) {
                            return (
                                <SidebarMenu
                                    key={index}
                                    title={item.title}
                                    items={item.subMenu}
                                />
                            );
                        }
                        return (
                            <SidebarItem
                                key={index}
                                title={item.title}
                                to={item.path}
                            />
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
