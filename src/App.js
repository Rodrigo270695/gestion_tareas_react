import React from 'react';
import './App.css';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import OptionalRender from './components/pure/optionalRender';

function App() {
  return (
    <NotificationProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </NotificationProvider>
/*     <div>
      <OptionalRender />
    </div> */
  );
}

export default App;
