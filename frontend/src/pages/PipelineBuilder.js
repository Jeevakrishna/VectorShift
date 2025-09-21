// frontend/src/pages/PipelineBuilder.js

import React, { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { PipelineToolbar } from '../toolbar';
import { PipelineUI } from '../ui';
import { AnalysisModal } from '../components/pipeline/AnalysisModal';
import { SaaSButton } from '../components/SaaSButton';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const analyzeGraph = (nodes, edges) => {
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

export const PipelineBuilder = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = () => {
    const result = analyzeGraph(nodes, edges);
    setAnalysisResult(result);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: '20px 40px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        borderRadius: '0 0 20px 20px'
      }}>
        <h1 style={{margin: 0, fontSize: '32px', fontWeight: '700'}}>VectorShift</h1>
        <p style={{margin: '10px 0 0 0', fontSize: '16px', opacity: 0.9}}>Build and analyze your data pipelines visually</p>
      </div>
      <div className="content-container">
        <PipelineToolbar />
        <div className="main-content">
          <PipelineUI />
          <div style={{
              padding: '30px',
              borderTop: '1px solid #e9ecef',
              backgroundColor: '#ffffff',
              textAlign: 'right',
              display: 'flex',
              gap: '15px',
              justifyContent: 'flex-end'
          }}>
              <SaaSButton onClick={handleAnalyze} className="saaS-button-primary">
                📊 Analyze Pipeline
              </SaaSButton>
          </div>
        </div>
      </div>
      <div style={{
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #ddd',
        padding: '20px 40px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666',
        borderRadius: '20px 20px 0 0'
      }}>
        <p>Built with ❤️ | 2025 VectorShift</p>
      </div>
      <AnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} analysisResult={analysisResult} />
    </div>
  );
};
