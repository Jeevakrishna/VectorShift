// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` }
  ];

  return (
    <BaseNode title="Input" handles={handles}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <label style={{display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: '600', color: '#333'}}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
            style={{
              padding: '10px',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              backgroundColor: '#f8f9fa',
              fontSize: '14px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              fontFamily: 'Inter, Poppins, sans-serif'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e9ecef';
              e.target.style.boxShadow = 'none';
            }}
          />
        </label>
        <label style={{display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: '600', color: '#333'}}>
          Type:
          <select value={inputType} onChange={handleTypeChange} style={{
            padding: '10px',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            backgroundColor: '#f8f9fa',
            fontSize: '14px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            fontFamily: 'Inter, Poppins, sans-serif'
          }}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
