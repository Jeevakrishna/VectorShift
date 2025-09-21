// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{
            width: '280px',
            padding: '30px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRight: '1px solid #e9ecef',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontFamily: 'Inter, Poppins, sans-serif',
            borderRadius: '0 20px 20px 0',
        }}>
            <h3 style={{
                marginTop: 0, 
                color: '#667eea', 
                fontSize: '22px', 
                fontWeight: '700', 
                textAlign: 'center',
                borderBottom: '2px solid #e9ecef',
                paddingBottom: '10px'
            }}>Available Nodes</h3>
            <DraggableNode type='customInput' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
            <DraggableNode type='filter' label='Filter' />
            <DraggableNode type='joiner' label='Joiner' />
            <DraggableNode type='code' label='Code' />
            <DraggableNode type='api' label='API Call' />
            <DraggableNode type='delay' label='Delay' />
        </div>
    );
};
