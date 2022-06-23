import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import { AppProvider } from './providers/App';
import { AppRoutes } from './routes';

function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    );
}

export default App;
