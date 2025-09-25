## Tech Stack

- Backend: Python, FastAPI, Uvicorn
- Frontend: React.js, React Flow
- UI: Custom SaaS styling (Inter/Poppins, gradients, rounded corners, micro-interactions)
- State: React state/hooks (and lightweight utility state)
- Tooling: Node.js/npm, Python/pip

## Key Features

- Node-based visual pipeline editor
- Multiple node types: Input, Output, LLM, Text, Filter, Joiner, Code, API Call, Delay
- JS-based DAG validation and polished Analysis Modal (frontend-only analysis)
- Consistent SaaS UI kit: buttons, cards, modals, inputs, toolbar, nodes
- Extensible BaseNode abstraction for rapid creation of new nodes

## Repository Structure

```
.
├─ backend/
│  ├─ main.py                # FastAPI app (ping, placeholder parse endpoint)
│  ├─ requirements.txt       # FastAPI + Uvicorn deps
│  └─ ...                    # Add modules as backend grows
└─ frontend/
   ├─ public/
   │  └─ index.html          # Page template (title: VectorShift)
   └─ src/
      ├─ components/
      │  ├─ SaaSButton.jsx
      │  └─ pipeline/
      │     └─ AnalysisModal.jsx
      ├─ nodes/
      │  ├─ BaseNode.js
      │  ├─ inputNode.js
      │  ├─ outputNode.js
      │  ├─ textNode.js
      │  ├─ llmNode.js
      │  ├─ FilterNode.js
      │  ├─ JoinerNode.js
      │  ├─ DelayNode.js
      │  └─ ... (CodeNode, ApiCallNode, etc.)
      ├─ pages/
      │  └─ PipelineBuilder.js   # Main app page (branded: VectorShift)
      ├─ draggableNode.js
      ├─ toolbar.js
      ├─ App.js
      ├─ index.css
      └─ index.js 
```

Note: Exact filenames may vary slightly; paths above reflect the current codebase snapshot.

## Prerequisites

- Node.js ≥ 16 and npm ≥ 8
- Python ≥ 3.9
- pip (or pipx)
- Ports available:
  - Frontend: http://localhost:3001
  - Backend: http://localhost:8000

## Getting Started

### 1) Clone the repository
Ensure you have the repo locally.

### 2) Backend setup
- Navigate to `backend/` and install dependencies:
```bash
pip install -r requirements.txt
```
- Run the dev server:
```bash
uvicorn backend.main:app --reload --port 8000
```
- Test it:
  - GET http://localhost:8000/ should return a simple ping payload.
  - GET http://localhost:8000/pipelines/parse is a placeholder (stub for future DAG validation backend).

### 3) Frontend setup
- Navigate to `frontend/` and install dependencies:
```bash
npm install
```
- Run the dev server:
```bash
npm start
```
- Open http://localhost:3001 in your browser.

You should see the VectorShift header, the toolbox (Available Nodes), the canvas (React Flow), the Analyze Pipeline button, and the footer "Built with ❤️ | 2025 VectorShift".

## Backend Overview

- File: `backend/main.py`
- Purpose: Lightweight FastAPI server to evolve into DAG parsing, persistence, and execution orchestration.

Example FastAPI scaffold:

```python
# backend/main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok", "service": "VectorShift API"}

@app.get("/pipelines/parse")
def parse_pipeline():
    # Placeholder for server-side DAG validation or pipeline parsing.
    return {"message": "parse endpoint placeholder", "valid": True}
```

Dependencies (`backend/requirements.txt`):

```
fastapi==0.110.0
uvicorn[standard]==0.27.1
```

Run:
```bash
uvicorn backend.main:app --reload --port 8000
```

## Frontend Overview

- Entry: `frontend/src/App.js` -> renders `pages/PipelineBuilder.js`
- Canvas: React Flow setup within `PipelineBuilder`, supports drag/drop from `toolbar.js` and `draggableNode.js`
- Nodes: Reusable `BaseNode.js` + specific node types
- UI Kit: `SaaSButton.jsx`, `AnalysisModal.jsx`, global `index.css`
- Branding: "VectorShift" in header; footer shows "Built with ❤️ | 2025 VectorShift"

### Pages

- `pages/PipelineBuilder.js`
  - Header with gradient, title: VectorShift
  - Toolbar with draggable nodes
  - React Flow canvas
  - Analyze Pipeline button triggers a frontend-only DAG check and opens `AnalysisModal`
  - Footer with branding

### Components

- `components/SaaSButton.jsx` - Primary/secondary/ghost variants with gradients and micro-interactions
- `components/pipeline/AnalysisModal.jsx` - Styled modal with backdrop blur and status indicator

### Nodes

- `nodes/BaseNode.js` - Core node container with consistent SaaS styling
- All specific nodes (Input, Output, Text, LLM, Filter, Joiner, Delay, etc.) extend BaseNode and add their own fields/handles.

Representative BaseNode:

```jsx
// frontend/src/nodes/BaseNode.js
import React from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ title, children, handles }) => {
  return (
    <div style={{
      width: 220,
      minHeight: 100,
      border: '1px solid #e9ecef',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      fontFamily: 'Inter, Poppins, sans-serif',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '12px',
        borderBottom: '1px solid #e9ecef',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <span>{title}</span>
      </div>

      <div style={{ padding: '12px' }}>
        {children}
      </div>

      {Array.isArray(handles) && handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            ...h.style,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#4f46e5', // blue-indigo accent
            border: '2px solid white'
          }}
        />
      ))}
    </div>
  );
};
```

Text Node with auto-resize and dynamic variable handles:

```jsx
// frontend/src/nodes/textNode.js
import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    const names = [...new Set(matches.map(m => m[1]))];
    setVariables(names);
  }, [currText]);

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((v, i) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${v}`,
      style: { top: `${(i + 1) * 25}px` },
    }))
  ];

  return (
    <BaseNode title="Text" handles={handles}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontWeight: 600, color: '#333' }}>
        Text:
        <TextareaAutosize
          minRows={2}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 12,
            border: '1px solid #e9ecef',
            backgroundColor: '#f8f9fa',
            fontSize: 14,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            resize: 'none',
            fontFamily: 'Inter, Poppins, sans-serif'
          }}
        />
      </label>
    </BaseNode>
  );
};
```

SaaS Button:

```jsx
// frontend/src/components/SaaSButton.jsx
import React from 'react';

const buttonBaseStyle = {
  padding: '12px 24px',
  borderRadius: '16px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: 'none',
  outline: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontFamily: '"Inter", "Poppins", sans-serif',
};

export const SaaSButton = ({ children, variant = 'primary', onClick, ...props }) => {
  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          ...buttonBaseStyle,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        };
      case 'secondary':
        return {
          ...buttonBaseStyle,
          background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(255, 117, 140, 0.35)',
        };
      case 'ghost':
      default:
        return {
          ...buttonBaseStyle,
          background: 'transparent',
          color: '#4f46e5',
          border: '1px solid rgba(79,70,229,0.3)',
        };
    }
  };

  return (
    <button style={getStyle()} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
```

## Running the Project

- Backend: http://localhost:8000
  - Start with Uvicorn as shown above.
- Frontend: http://localhost:3001
  - Start with npm start in frontend/.

Common scripts (frontend):

```bash
npm start        # start dev server
npm run build    # build production assets
npm run test     # run tests (if configured)
```

## How to Navigate the Code

- Start at `frontend/src/pages/PipelineBuilder.js` to understand the main layout and UX flow.
- Explore `frontend/src/nodes/` to see the BaseNode abstraction and specific node implementations.
- Check `frontend/src/components/` for reusable UI components (e.g., `SaaSButton.jsx`, `pipeline/AnalysisModal.jsx`).
- The toolbar and drag-and-drop behavior live in `frontend/src/toolbar.js` and `frontend/src/draggableNode.js`.
- Backend entry is `backend/main.py`. Extend routes and services here as the server-side capabilities grow.

## Extending the System

- Add a new node:
  - Create `frontend/src/nodes/MyNewNode.js`
  - Compose it using `BaseNode` and define React Flow handles
  - Register it in the nodeTypes map (where your React Flow instance is created)
  - Add a `DraggableNode` in `toolbar.js` to expose it in the UI

- Add backend functionality:
  - Create new route handlers in `backend/main.py` or split into modules as it grows
  - Consider CORS settings if you start making actual API calls from the frontend

## Troubleshooting

- Port collisions: Ensure 3001 and 8000 are free.
- CORS: If you add API calls, configure CORS in FastAPI.
- Analyze button not responding: Check `pages/PipelineBuilder.js` handlers and ensure the click handler is passed into `SaaSButton`. Verify no overlay intercepts clicks in the canvas region.

