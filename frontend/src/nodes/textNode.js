// textNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    const newVariables = matches.map(match => match[1]);
    const uniqueVariables = [...new Set(newVariables)];
    setVariables(uniqueVariables);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const sourceHandles = [
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  const targetHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    style: { top: `${(index + 1) * 25}px` },
  }));

  const allHandles = [...sourceHandles, ...targetHandles];

  return (
    <BaseNode title="Text" handles={allHandles}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: '600', color: '#333' }}>
        Text:
        <TextareaAutosize
          minRows={2}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            backgroundColor: '#f8f9fa',
            fontSize: '14px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            resize: 'none',
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
    </BaseNode>
  );
};;
