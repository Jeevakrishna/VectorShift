// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { analyzeGraph } from './utils/graph';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = ({ setAnalysisResult, setIsModalOpen }) => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleAnalyze = () => {
    const result = analyzeGraph(nodes, edges);
    setAnalysisResult(result);
    setIsModalOpen(true);
  };

  return (
    <div style={{
        padding: '20px',
        borderTop: '1px solid #ddd',
        backgroundColor: '#ffffff',
        textAlign: 'right',
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end'
    }}>
        <button onClick={handleAnalyze} style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
        }}>Analyze Pipeline</button>
    </div>
  );
}
