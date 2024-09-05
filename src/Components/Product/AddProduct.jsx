import React, { useState } from 'react';

const AddProduct = () => {
    const [isCsvUpload, setIsCsvUpload] = useState(false); // Toggle between manual add and CSV upload
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryName: '',
        imageUrls: [],
    });
    const [imageFile, setImageFile] = useState(null); // For image upload
    const [csvFile, setCsvFile] = useState(null); // For CSV upload
    const [categories] = useState(['Electronics', 'Home Appliances', 'Fashion']); // Static categories list

    const headers = {
        'X-Authenticated-Roles': 'ROLE_ADMIN',
        'Content-Type': 'application/json',
    };

    // Handle manual form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // Handle product creation
    const handleProductCreate = async () => {
        try {
            const response = await fetch('http://localhost:8072/ecart/productservice/api/create', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(productData),
            });
            if (!response.ok) throw new Error('Failed to create product');
            const createdProduct = await response.json();
            alert('Product created successfully');

            // Upload image after product is created
            if (imageFile) {
                await handleImageUpload(createdProduct.id);
            }
        } catch (error) {
            console.error(error);
            alert('Error creating product');
        }
    };

    // Handle image upload
    const handleImageUpload = async (productId) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('productId', productId);

        try {
            const response = await fetch('http://localhost:8072/ecart/productservice/api/upload-image', {
                method: 'POST',
                headers: {
                    'X-Authenticated-Roles': 'ROLE_ADMIN',
                },
                body: formData,
            });
            if (!response.ok) throw new Error('Image upload failed');
            alert('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        }
    };

    // Handle CSV upload
    const handleCsvUpload = async () => {
        const formData = new FormData();
        formData.append('file', csvFile);

        try {
            const response = await fetch('http://localhost:8072/ecart/productservice/api/upload', {
                method: 'POST',
                headers: {
                    'X-Authenticated-Roles': 'ROLE_ADMIN',
                },
                body: formData,
            });
            if (!response.ok) throw new Error('CSV upload failed');
        } catch (error) {
            console.error(error);
        }
    };

    // Render form for adding a single product
    const renderProductForm = () => (
        <div className="space-y-4">
            <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter product name"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter product description"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1">Price</label>
                <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter product price"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1">Stock Quantity</label>
                <input
                    type="number"
                    name="stockQuantity"
                    value={productData.stockQuantity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter stock quantity"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                    name="categoryName"
                    value={productData.categoryName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block font-semibold mb-1">Upload Image</label>
                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <button
                    onClick={handleProductCreate}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Add Product
                </button>
            </div>
        </div>
    );

    // Render form for CSV upload
    const renderCsvForm = () => (
        <div className="space-y-4">
            <div>
                <label className="block font-semibold mb-1">Upload Products via CSV</label>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => setCsvFile(e.target.files[0])}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <button
                    onClick={handleCsvUpload}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    Upload CSV
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <div className="mb-6">
                <button
                    onClick={() => setIsCsvUpload(false)}
                    className={`px-4 py-2 mr-4 ${!isCsvUpload ? 'bg-blue-600' : 'bg-gray-300'} text-white rounded`}
                >
                    Add Product Manually
                </button>
                <button
                    onClick={() => setIsCsvUpload(true)}
                    className={`px-4 py-2 ${isCsvUpload ? 'bg-blue-600' : 'bg-gray-300'} text-white rounded`}
                >
                    Upload Products via CSV
                </button>
            </div>
            {isCsvUpload ? renderCsvForm() : renderProductForm()}
        </div>
    );
};

export default AddProduct;
