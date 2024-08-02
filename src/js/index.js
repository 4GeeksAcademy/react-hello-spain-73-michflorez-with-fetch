// src/index.js
import React from 'react';
import {createRoot} from 'react-dom/client'
import '/workspaces/react-hello-spain-73-michflorez-with-fetch/src/styles/index.css'
import App from './component/App';



const root = createRoot(document.querySelector("#app"))

//render your react application
root.render(<App/>)
