// DelayNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode title="Delay" handles={handles}>
      <span>Delays the execution for a specified time.</span>
    </BaseNode>
  );
};
