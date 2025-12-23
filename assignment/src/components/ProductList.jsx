import React from 'react';
import './ProductList.css';

// Badge Component (Reusable)
function Badge({ text, type }) {
  return <span className={`badge badge-${type}`}>{text}</span>;
}

// Action Buttons Component (Reusable)
function ActionButtons({ product, onEdit, onDelete }) {
  return (
    <div className="action-buttons">
      <button 
        className="btn btn-edit"
        onClick={() => onEdit(product)}
      >
        ✏️ Edit
      </button>
      <button 
        className="btn btn-delete"
        onClick={() => {
          if (window.confirm('Are you sure you want to delete?')) {
            onDelete(product.id);
          }
        }}
      >
        🗑️ Delete
      </button>
    </div>
  );
}

// Table Row Component (Reusable)
function TableRow({ product, onEdit, onDelete }) {
  return (
    <tr className="table-row">
      <td className="table-cell">{product.id}</td>
      <td className="table-cell">{product.name}</td>
      <td className="table-cell">{product.category}</td>
      <td className="table-cell">₹{product.price}</td>
      <td className="table-cell">
        <Badge 
          text={product.stock} 
          type={product.stock > 0 ? 'success' : 'danger'}
        />
      </td>
      <td className="table-cell">{product.description}</td>
      <td className="table-cell">
        <ActionButtons 
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

// Card Component (Reusable)
function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="card-header">
        <h3 className="card-title">{product.name}</h3>
      </div>
      
      <div className="card-body">
        <p className="card-description">{product.description}</p>
        
        <div className="card-badges">
          <Badge text={product.category} type="info" />
          <Badge 
            text={`Stock: ${product.stock}`}
            type={product.stock > 0 ? 'success' : 'danger'}
          />
        </div>

        <div className="card-price">
          <span>₹{product.price}</span>
        </div>
      </div>

      <div className="card-footer">
        <ActionButtons 
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

// Main ProductList Component
function ProductList({ products, viewType, onEdit, onDelete }) {
  // Show table view
  if (viewType === 'table') {
    return (
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <TableRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Show card view
  return (
    <div className="cards-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;
