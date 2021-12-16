import React from "react"
import {useState} from 'react';

import "./App.scss"

import Side from "./module/Side"
import {Index} from "./module/Index"
import Form from "./module/Form"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const [tasks,setTasks] = useState([{id: "",kind: "タスク", key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"},{id: "",kind: "タスク", key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}])
  const [keys,setKeys] = useState(
  {
    id          : "#",
    task        : "種別",
    key         : "キー",
    title       : "件名",
    author      : "担当者",
    status      : "状態",
    priority    : "優先度",
    registed_at : "登録日",
    start_date  : "開始日",
    end_date    : "期限日"
  })
  const addTasks = () => {
    // const new_tasks = [
    //   ...tasks, 
    //   ...[{kind: 'タスク', key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}]
    // ]
    const task2 = tasks.concat()
    // [...tasks]
    task2.push({id: "",kind: "タスク", key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"})
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
      {/* {JSON.stringify(tasks)} */}
      {/* <button onClick={addTasks}>ボタン</button> */}
      <BrowserRouter>
        <Side />
        <Routes>
          <Route path="/" element={  <Index title="テスト" tasks={tasks} keys={keys} /> } />
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

// import React from "react"
// import "./App.scss"

// import Side from "./module/Side"
// import Index from "./module/Index"
// import Form from "./module/Form"

// import { BrowserRouter, Routes, Route } from "react-router-dom"

// class App extends React.Component {
//   //// 課題データは一元管理したいので、一番親のAppでstate管理しましょう。
//   constructor(props) {
//     super(props)
//     //// 列名とstateのプロパティ名をマッピングしておくと
//     //// 一元管理できて良いです。
//     this.column_names = {
//       id          : "#",
//       task        : "種別",
//       key         : "キー",
//       title       : "件名",
//       author      : "担当者",
//       status      : "状態",
//       priority    : "優先度",
//       registed_at : "登録日",
//       start_date  : "開始日",
//       end_date    : "期限日"
//     }
//     //// データの持ち方は二次元配列かオブジェクトの配列が適しているでしょう。
//     //// どちらかというとオブジェクトの配列が望ましいです。
//     //// なぜなら配列は意味を伴わないが順番が重要なデータ群を持つのに適していて、
//     //// オブジェクトは各要素に意味を伴うデータ群が適しているからです。
//     //// 今回の例では各要素に「タイトル」とか「状態」とかの意味があるので、
//     //// 直接state.titleとかstate.statusでアクセスできた方が便利です。
//     this.state = {
//       tasks: [{
//         id          : 100,
//         task        : "タスク",
//         key         : "TASK-1",
//         title       : "タイトル１",
//         author      : "minamoto",
//         status      : "yet",
//         priority    : "高",
//         registed_at : "2021-12-1",
//         start_date  : "2021-12-12",
//         end_date    : "2021-12-31"
//       },{
//         id          : 200,
//         task        : "検証",
//         key         : "TASK-2",
//         title       : "タイトル２",
//         author      : "taira",
//         status      : "yet",
//         priority    : "高",
//         registed_at : "2021-12-1",
//         start_date  : "2021-12-12",
//         end_date    : "2021-12-31"
//       }]
//     }
//     this.addTask = this.addTask.bind(this)
//   }

//   addTask(task) {
//     const present_tasks = this.state.tasks
//     this.setState({
//       tasks: [...present_tasks, task]
//     })
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//         </header>

//         <BrowserRouter>
//           <Side />
//           <article>
//           <Routes>
//             <Route path="/" element={  <Index title="テスト" tasks={this.state.tasks} column_names={this.column_names} /> } />
//             <Route path="/new" element={<Form kind={"new"} addTask={this.addTask} /> } />
//             <Route path="/:id" element={<Form tasks={this.state.tasks} kind={"edit"} /> } />
//           </Routes>
//           </article>
//         </BrowserRouter>
//       </div>
//     )
//   }
// }

// export default App