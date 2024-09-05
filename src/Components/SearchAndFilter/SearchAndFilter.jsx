import React from 'react';

const SearchAndFilter = ({ searchTerm, onSearch, filterOptions, selectedFilter, onFilterChange }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-2 md:mb-0">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {filterOptions && (
                <div className="flex items-center">
                    <select
                        value={selectedFilter}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="ml-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Filter by...</option>
                        {filterOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default SearchAndFilter;
