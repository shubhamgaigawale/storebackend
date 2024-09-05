import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate(); // Use navigate instead of history
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryName: '',
        imageUrls: []
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8072/ecart/productservice/api/fetch/${id}`);
                console.log('Product data:', response.data); // Debug: Check API response
                setProduct(response.data);
                setUpdatedProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8072/ecart/productservice/api/update/${id}`, updatedProduct);
            setProduct(updatedProduct);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (!product) return <div>Loading...</div>; // Add loading state

    return (
        <div className="p-6">
            <button
                onClick={() => navigate('/admin/products')}
                className="mb-4 text-blue-500 hover:underline"
            >
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
            </button>
            <h1 className="text-3xl font-bold mb-6">Product Details</h1>
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                    {product.imageUrls.length > 0 ? (
                        <img
                            src={product.imageUrls[0]} // Display first image
                            alt={product.name}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                    )}
                </div>
                <div className="lg:ml-6 flex-1">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-800 font-semibold">{product.name}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                            Description
                        </label>
                        {isEditing ? (
                            <textarea
                                id="description"
                                name="description"
                                value={updatedProduct.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-600">{product.description}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
                            Price
                        </label>
                        {isEditing ? (
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={updatedProduct.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-800 font-semibold"> ${product.price.toFixed(2)}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="stockQuantity">
                            Stock Quantity
                        </label>
                        {isEditing ? (
                            <input
                                type="number"
                                id="stockQuantity"
                                name="stockQuantity"
                                value={updatedProduct.stockQuantity}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-800 font-semibold">{product.stockQuantity}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="categoryName">
                            Category
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                value={updatedProduct.categoryName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-800 font-semibold">{product.categoryName}</p>
                        )}
                    </div>
                    {isEditing && (
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Update
                        </button>
                    )}
                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className={`ml-4 px-4 py-2 rounded-lg ${isEditing ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'} hover:${isEditing ? 'bg-gray-600' : 'bg-green-600'}`}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
