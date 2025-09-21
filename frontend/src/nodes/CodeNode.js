// CodeNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CodeNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode title="Code" handles={handles}>
      <span>Executes a block of code.</span>
    </BaseNode>
  );
};
