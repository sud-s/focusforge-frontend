import React from 'react';
import '../../styles/forms.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, required, name, ...props }) => {
  return (
    <div className="form-group">
      {label && <label className="form-label" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        className="form-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
