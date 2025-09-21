// ApiCallNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiCallNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode title="API Call" handles={handles}>
      <span>Makes an API call to a specified endpoint.</span>
    </BaseNode>
  );
};
