import React from "react"
import {useState} from 'react';

import "./App.scss"

import Side from "./module/Side"
import {Index} from "./module/Index"
import Form from "./module/Form"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const [tasks,setTasks] = useState([])
  const addTasks = () => {
    // const new_tasks = [
    //   ...tasks, 
    //   ...[{kind: 'タスク', key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}]
    // ]
    const task2 = tasks.concat()
    // [...tasks]
    task2.push({kind: "タスク", key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"})
    // console.log(task2)
    setTasks(task2)
  }
  /**
   * 
  const addTasks = () => {
    setTasks(tasks.push({kind: 'タスク', key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}));
  }
  */


  return (
    <div className="App">
      <header className="App-header">
      </header>
      {JSON.stringify(tasks)}
      <button onClick={addTasks}>ボタン</button>
      <BrowserRouter>
        <Side />
        <Routes>
          <Route path="/" element={  <Index title="テスト" tasks={tasks} /> } />
          <Route path="/new" element={<Form onClickAddTasks={addTasks}/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById("root")
// );

// import React, { Component } from "react";
// import Menu from "./module/Menu"
// import "./App.scss";

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