// BaseNode.js

import React from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ title, children, handles }) => {
  return (
    <div style={{
      width: 220,
      minHeight: 100,
      border: '1px solid #e9ecef',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      fontFamily: 'Inter, Poppins, sans-serif',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '12px',
        borderBottom: '1px solid #e9ecef',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <span>{title}</span>
      </div>
      <div style={{padding: '20px'}}>
        {children}
      </div>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{ ...handle.style, background: '#667eea', borderRadius: '50%' }}
        />
      ))}
    </div>
  );
};
