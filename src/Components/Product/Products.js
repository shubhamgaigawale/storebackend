import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter';
import DataGrid from '../DataGrid/DataGrid';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch products and filter options from API
        const fetchData = async () => {
            try {
                const productResponse = await axios.get('http://localhost:8072/ecart/productservice/api/fetch');
                setProducts(productResponse.data);

                // Example filter options
                setFilterOptions([
                    { label: 'Electronics', value: 'Electronics' },
                    { label: 'Appliances', value: 'Appliances' }
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };

    const handleEdit = (product) => {
        console.log('Edit product', product);
    };

    const handleDelete = (product) => {
        console.log('Delete product', product);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = Object.values(product).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter = selectedFilter ? product.categoryName === selectedFilter : true;
        return matchesSearch && matchesFilter;
    });

    const handleView = (product) => {
        navigate(`/admin/products-detail/${product.id}`); // Use navigate for client-side navigation
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearch={handleSearch}
                filterOptions={filterOptions}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
            />
            <DataGrid
                headers={['name', 'description', 'price', 'stockQuantity', 'categoryName']}
                rows={filteredProducts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                searchTerm={searchTerm}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default Products;
