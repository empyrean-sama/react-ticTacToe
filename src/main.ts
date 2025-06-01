import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const appRoot = document.getElementById('app') as HTMLDivElement;
const root = createRoot(appRoot);
root.render(createElement(App));