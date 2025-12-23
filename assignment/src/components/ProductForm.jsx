import React, { useState } from 'react';
import './ProductForm.css';

// Form Input Component (Reusable)
function FormInput({ label, name, value, onChange, error, type = 'text', required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// Form Select Component (Reusable)
function FormSelect({ label, name, value, onChange, options, error, required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-select ${error ? 'error' : ''}`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// Form Textarea Component (Reusable)
function FormTextarea({ label, name, value, onChange, rows = 4 }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="form-textarea"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

// Main Product Form Component
function ProductForm({ product, onSave, onCancel }) {
  // Initialize form with product data or empty values
  const [formData, setFormData] = useState(
    product || {
      name: '',
      price: '',
      category: '',
      stock: '',
      description: ''
    }
  );

  const [errors, setErrors] = useState({});

  // Validate form before saving
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (formData.stock && Number(formData.stock) < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave({
        ...formData,
        price: Number(formData.price),
        stock: formData.stock ? Number(formData.stock) : 0
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="form-card">
          <div className="form-header">
            <div className="form-header-content">
              <h2>{product ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={onCancel}
                title="Close modal"
              >
                ✕
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form">
        {/* Two columns layout */}
        <div className="form-row">
          <div className="form-col">
            <FormInput
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
          </div>
          <div className="form-col">
            <FormInput
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={['Electronics', 'Furniture', 'Kitchen', 'Sports', 'Books', 'Clothing']}
              error={errors.category}
              required
            />
          </div>
          <div className="form-col">
            <FormInput
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              error={errors.stock}
            />
          </div>
        </div>

        {/* Full width textarea */}
        <FormTextarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Form buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn btn-success">
            {product ? '✅ Update Product' : '✅ Add Product'}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            ❌ Cancel
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
