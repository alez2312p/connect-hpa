import React from 'react';
import { createRoot } from 'react-dom/client';
import ButtonConnect from './components/ButtonConnect';

const App = () => {
    return (
        <div>
            <ButtonConnect />
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;