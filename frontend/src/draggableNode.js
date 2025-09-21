// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          padding: '12px 16px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '1px solid #e9ecef',
          borderRadius: '16px',
          color: '#667eea',
          fontWeight: '600',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          fontFamily: 'Inter, Poppins, sans-serif',
        }} 
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          e.target.style.color = '#ffffff';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
          e.target.style.color = '#667eea';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };