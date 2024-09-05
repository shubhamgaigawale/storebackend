import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DataGridHeader = ({ headers = [], onSearch, searchTerm }) => {
    return (
        <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
                {headers.map((header, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                            <span>{header}</span>
                        </div>
                    </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => onSearch(e.target.value)}
                            className="border border-gray-300 rounded-md p-1 text-sm"
                        />
                        <FontAwesomeIcon icon={faSearch} className="ml-2 text-gray-500" />
                    </div>
                </th>
            </tr>
        </thead>
    );
};

export default DataGridHeader;
