import React from 'react';
import DataGridHeader from './DataGridHeader';
import DataGridRow from './DataGridRow';

const DataGrid = ({ headers = [], rows = [], onEdit, onDelete, onView, rowsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = rows.slice(startIndex, endIndex);

    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="overflow-x-auto">
            <div className="min-w-full bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <DataGridHeader headers={headers} />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedRows.length > 0 ? (
                            paginatedRows.map((row, index) => (
                                <DataGridRow
                                    key={row.id || index}
                                    row={row}
                                    headers={headers}
                                    onEdit={() => onEdit(row)}
                                    onDelete={() => onDelete(row)}
                                    onView={() => onView(row)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="text-center py-4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="px-6 py-4 flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataGrid;
