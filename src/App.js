import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import Products from './Pages/Products';
// import AddProduct from './Pages/AddProduct';
// import Users from './Pages/Users';
// import AddUser from './Pages/AddUser';
import Navbar from './Components/Layouts/Navbar';
import Sidebar from './Components/Layouts/Sidebar/Sidebar.jsx';
import Products from './Components/Product/Products.js';
import ProductDetails from './Components/Product/ProductDetails.jsx';
import AddProduct from './Components/Product/AddProduct.jsx';
// import Dashboard from './Components/Layout/Dashboard';

const sidebarItems = [
  { title: 'Dashboard', path: '/admin/dashboard' },
  {
    title: 'Products',
    subMenu: [
      { title: 'Manage Products', path: '/admin/products' },
      { title: 'Add Product', path: '/admin/add-product' }
    ]
  },
  {
    title: 'Users',
    subMenu: [
      { title: 'Manage Users', path: '/admin/users' },
      { title: 'Add User', path: '/admin/users/add' }
    ]
  }
];

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        < Navbar />
        <div className="flex flex-1">
          <Sidebar items={sidebarItems} />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/products-detail/:id" element={<ProductDetails />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
