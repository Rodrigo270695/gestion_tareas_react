import React from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from './components/pure/greeting';
import GreetingF from './components/pure/greetingF';
import TaskList from './components/container/task_list';
import Example1 from './hooks/Example1';
import Example2 from './hooks/Example2';
import Example3 from './hooks/Example3';
import Example4 from './hooks/Example4';
import Father from './components/container/father';
import Cronometro from './components/container/cronometro';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <div className="App">
        {/* <header className="App-header"> */}
          {/* <Greeting name='Rodrigo' /> */}
          {/* <GreetingF name='Rodrigo' /> */}
          <TaskList />
          {/* <Example1 /> */}
          {/* <Example2 /> */}
          {/* <Example3 /> */}
          {/* <Example4 name='Rodrigo'> 
            <h3>Este es el children de Example4</h3>  
          </Example4> */}
        {/* </header> */}
          {/* <Father /> */}
          {/* <Cronometro /> */}
      </div>
    </NotificationProvider>
  );
}

export default App;
