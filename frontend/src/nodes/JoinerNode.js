// JoinerNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const JoinerNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input1`, style: { top: '30%' } },
    { type: 'target', position: Position.Left, id: `${id}-input2`, style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode title="Joiner" handles={handles}>
      <span>Joins two inputs into a single output.</span>
    </BaseNode>
  );
};
