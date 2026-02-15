import React from 'react';
import { Loader2 } from 'lucide-react';
import '../../styles/buttons.css';

const Button = ({ children, variant = 'primary', onClick, icon: Icon, className = '', disabled, loading, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} ${className}`} 
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={12} /> : Icon && <Icon size={12} />}
      {children}
    </button>
  );
};

export default Button;
