// frontend/src/utils/graph.js

export const analyzeGraph = (nodes, edges) => {
  const num_nodes = nodes.length;
  const num_edges = edges.length;

  if (num_nodes === 0) {
    return { num_nodes, num_edges, is_dag: true };
  }

  const adj = new Map();
  nodes.forEach(node => adj.set(node.id, []));
  edges.forEach(edge => {
    if (adj.has(edge.source)) {
      adj.get(edge.source).push(edge.target);
    }
  });

  const visiting = new Set();
  const visited = new Set();

  const hasCycle = (node) => {
    visiting.add(node);

    const neighbors = adj.get(node) || [];
    for (const neighbor of neighbors) {
      if (visiting.has(neighbor)) {
        return true; // Cycle detected
      }
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      }
    }

    visiting.delete(node);
    visited.add(node);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycle(node.id)) {
        return { num_nodes, num_edges, is_dag: false };
      }
    }
  }

  return { num_nodes, num_edges, is_dag: true };
};
