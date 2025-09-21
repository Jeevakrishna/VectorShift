// FilterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode title="Filter" handles={handles}>
      <div style={{
        fontWeight: '600',
        color: '#333',
        fontSize: '14px',
        textAlign: 'center',
        fontFamily: 'Inter, Poppins, sans-serif'
      }}>
        Filters the input based on a condition.
      </div>
    </BaseNode>
  );
};
