import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.jsx';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import Pagination from './components/Pagination.jsx';
import productsData from './data/products.json';

function App() {
  // ============ STATE MANAGEMENT ============
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState('table'); // 'table' or 'card'
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  

  const itemsPerPage = 5;

  // ============ FILTER PRODUCTS BY SEARCH ============
  // Only runs when products or searchTerm changes
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // ============ PAGINATION LOGIC ============
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ============ RESET PAGE ON SEARCH ============
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ============ ADD OR UPDATE PRODUCT ============
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p =>
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product with unique ID
      const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...productData
      };
      setProducts([...products, newProduct]);
    }
    setShowForm(false);
  };

  // ============ DELETE PRODUCT ============
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // ============ EDIT PRODUCT ============
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // ============ CANCEL FORM ============
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ============ RENDER ============
  return (
    <div className="app">
      <div className="app-container">
        {/* Header */}
        <h1 className="app-title">📦 Product Management System</h1>

        {/* Control Bar: Search + Buttons */}
        <div className="control-bar">
          <div className="search-wrapper">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
          </div>
          
          <div className="button-group">
            <button 
              className="btn btn-success"
              onClick={() => setShowForm(true)}
            >
              ➕ Add Product
            </button>
            
            <div className="view-toggle">
              <button
                className={`btn ${viewType === 'table' ? 'btn-active' : 'btn-inactive'}`}
                onClick={() => setViewType('table')}
              >
                📋 List
              </button>
              <button
                className={`btn ${viewType === 'card' ? 'btn-active' : 'btn-inactive'}`}
                onClick={() => setViewType('card')}
              >
                🎴 Cards
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
          />
        )}

        {/* Product List or Cards */}
        {filteredProducts.length > 0 ? (
          <>
            <ProductList
              products={paginatedProducts}
              viewType={viewType}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="empty-state">
            <p>❌ No products found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
