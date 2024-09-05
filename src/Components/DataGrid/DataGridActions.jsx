import React from 'react';
import ViewIcon from '../Icons/ViewIcon';
import EditIcon from '../Icons/EditIcon';
import DeleteIcon from '../Icons/DeleteIcon';


const DataGridActions = ({ onEdit, onDelete, onView }) => {
    return (
        <div className="flex space-x-2">
            <button onClick={onView} className="hover:text-blue-700">
                <ViewIcon />
            </button>
            <button onClick={onEdit} className="hover:text-yellow-700">
                <EditIcon />
            </button>
            <button onClick={onDelete} className="hover:text-red-700">
                <DeleteIcon />
            </button>
        </div>
    );
};

export default DataGridActions;
