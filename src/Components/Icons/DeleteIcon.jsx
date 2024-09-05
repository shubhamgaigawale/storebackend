import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteIcon = () => (
    <FontAwesomeIcon icon={faTrash} className="h-5 w-5 text-red-500 hover:text-red-700" />
);

export default DeleteIcon;
