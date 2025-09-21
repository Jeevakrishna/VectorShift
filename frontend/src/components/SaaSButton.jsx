// frontend/src/components/SaaSButton.jsx

import React from 'react';

const buttonBaseStyle = {
  padding: '12px 24px',
  borderRadius: '16px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: 'none',
  outline: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontFamily: '"Inter", "Poppins", sans-serif',
};

export const SaaSButton = ({ children, variant = 'primary', onClick, ...props }) => {
  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          ...buttonBaseStyle,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        };
      case 'secondary':
        return {
          ...buttonBaseStyle,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
        };
      case 'ghost':
        return {
          ...buttonBaseStyle,
          background: 'transparent',
          color: '#667eea',
          border: '2px solid #667eea',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)',
        };
      default:
        return buttonBaseStyle;
    }
  };

  const style = getStyle();

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = style.boxShadow;
      }}
      {...props}
    >
      {children}
    </button>
  );
};
