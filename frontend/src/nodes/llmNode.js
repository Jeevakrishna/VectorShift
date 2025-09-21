// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];

  return (
    <BaseNode title="LLM" handles={handles}>
      <div style={{
        fontWeight: '600',
        color: '#333',
        fontSize: '14px',
        textAlign: 'center',
        fontFamily: 'Inter, Poppins, sans-serif'
      }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
}
