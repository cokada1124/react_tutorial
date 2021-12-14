import React from "react"
import './App.scss';

import Side from './module/Side'
import {Index} from './module/Index'
import Form from './module/Form'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      

        <BrowserRouter>
        <Side />
        <Routes>
        <Route path="/" element={  <Index title="テスト" /> } />
        <Route path="/new" element={<Form /> } />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );

// import React, { Component } from 'react';
// import Menu from './module/Menu'
// import './App.scss';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>React App!!!</h1>
//         <Menu />
//       </div>
//     );
//   }
// }

// export default App;