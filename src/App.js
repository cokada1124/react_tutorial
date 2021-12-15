import React from "react"
import "./App.scss"

import Side from "./module/Side"
import Index from "./module/Index"
import Form from "./module/Form"

import { BrowserRouter, Routes, Route } from "react-router-dom"

class App extends React.Component {
  //// 課題データは一元管理したいので、一番親のAppでstate管理しましょう。
  constructor(props) {
    super(props)
    //// 列名とstateのプロパティ名をマッピングしておくと
    //// 一元管理できて良いです。
    this.column_names = {
      task        : "種別",
      key         : "キー",
      title       : "件名",
      author      : "担当者",
      status      : "状態",
      priority    : "優先度",
      registed_at : "登録日",
      start_date  : "開始日",
      end_date    : "期限日"
    }
    //// データの持ち方は二次元配列かオブジェクトの配列が適しているでしょう。
    //// どちらかというとオブジェクトの配列が望ましいです。
    //// なぜなら配列は意味を伴わないが順番が重要なデータ群を持つのに適していて、
    //// オブジェクトは各要素に意味を伴うデータ群が適しているからです。
    //// 今回の例では各要素に「タイトル」とか「状態」とかの意味があるので、
    //// 直接state.titleとかstate.statusでアクセスできた方が便利です。
    this.state = {
      tasks: [{
        task        : "タスク",
        key         : "TASK-1",
        title       : "タイトル１",
        author      : "minamoto",
        status      : "yet",
        priority    : "高",
        registed_at : "2021-12-1",
        start_date  : "2021-12-12",
        end_date    : "2021-12-31"
      },{
        task        : "検証",
        key         : "TASK-2",
        title       : "タイトル２",
        author      : "taira",
        status      : "yet",
        priority    : "高",
        registed_at : "2021-12-1",
        start_date  : "2021-12-12",
        end_date    : "2021-12-31"
      }]
    }
    this.addTask = this.addTask.bind(this)
  }

  addTask(task) {
    const present_tasks = this.state.tasks
    this.setState({
      tasks: [...present_tasks, task]
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <BrowserRouter>
          <Side />
          <article>
          <Routes>
            <Route path="/" element={  <Index title="テスト" tasks={this.state.tasks} column_names={this.column_names} /> } />
            <Route path="/new" element={<Form addTask={this.addTask} /> } />
          </Routes>
          </article>
        </BrowserRouter>
      </div>
    )
  }
}

export default App