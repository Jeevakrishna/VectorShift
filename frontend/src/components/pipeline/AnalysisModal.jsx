// frontend/src/components/pipeline/AnalysisModal.jsx

import React from 'react';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(5px)',
};

const modalContentStyle = {
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  padding: '40px',
  borderRadius: '20px',
  width: '450px',
  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
  textAlign: 'center',
  fontFamily: 'Inter, Poppins, sans-serif',
  border: '1px solid #e9ecef',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  background: 'none',
  border: 'none',
  fontSize: '28px',
  cursor: 'pointer',
  color: '#888',
  fontWeight: 'bold',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s, color 0.2s',
};

const headerStyle = {
  marginBottom: '30px',
  color: '#333',
  fontSize: '28px',
  fontWeight: '700',
};

const resultStyle = {
  marginBottom: '20px',
  fontSize: '18px',
  color: '#555',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const statusStyle = {
  padding: '20px',
  borderRadius: '12px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '22px',
  marginTop: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
};

export const AnalysisModal = ({ isOpen, onClose, analysisResult }) => {
  if (!isOpen || !analysisResult) return null;

  const { num_nodes, num_edges, is_dag } = analysisResult;

  const statusIcon = is_dag ? '✅' : '❌';
  const statusText = is_dag ? 'Valid DAG' : 'Invalid DAG (Cycle Detected)';
  const statusBgColor = is_dag ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={{...modalContentStyle, position: 'relative'}} onClick={e => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>&times;</button>
        <h2 style={headerStyle}>Pipeline Analysis</h2>
        <div style={resultStyle}><strong>Nodes:</strong> {num_nodes}</div>
        <div style={resultStyle}><strong>Edges:</strong> {num_edges}</div>
        <div style={{...statusStyle, background: statusBgColor}}>
          <span>{statusIcon}</span>
          {statusText}
        </div>
      </div>
    </div>
  );
};
