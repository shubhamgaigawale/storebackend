import React from 'react';
import DataGridActions from './DataGridActions';

const DataGridRow = ({ row, headers, onEdit, onDelete, onView }) => {
    return (
        <tr>
            {headers.map((header, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row[header.toLowerCase().replace(/\s+/g, '')] || '-'}
                </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <DataGridActions
                    onEdit={() => onEdit(row.id)}
                    onDelete={() => onDelete(row.id)}
                    onView={() => onView(row.id)}
                />
            </td>
        </tr>
    );
};

export default DataGridRow;
