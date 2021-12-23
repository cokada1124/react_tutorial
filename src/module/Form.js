import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useForm } from 'react-hook-form'

const Form = (props) => {
  const { id } = useParams()
  
  const [ state, setState ] = useState({
    id          : 0,
    task        : 0,
    key         : "",
    title       : "",
    author      : "",
    status      : "",
    priority    : "",
    registed_at : "",
    start_date  : "",
    end_date    : ""
  })
 

  const [ error, setError ] = useState({
    id          : true,
    task        : true,
    key         : true,
    title       : true,
    author      : true,
    status      : true,
    priority    : true,
    registed_at : true,
    start_date  : true,
    end_date    : true
  })

  const selects = {
    task     : ["タスク", "検証", "議事録"],
    author   : ["minamoto", "taira", "soga", "fujiwara"],
    status   : ["未対応", "対応済"],
    priority : ["高", "中", "低"]
  }

  const title = id === undefined ? "課題追加" : "課題編集"
  const submit_label = id === undefined ? "追加" : "更新"

  //即時間数なので再レンダーされるごとに読み込まれる認識で、フォームのtask項目でセレクト内容を変えてみましたが、この処理が実行されない理由がわかりませんでした。（最初の読み込み時は実行されることを確認しました）
  // const errorCheck = (() => {
  //   //ここの処理を短くしたいのですが、、良い書き方はありますでしょうか。
  //   if(state.task === 0){
  //     //setErrorではerror.taskを更新できませんでしたが、setStateだと更新できた理由がわかりませんでした。
  //     setState(error.task= false);
  //   }
  //   if(state.key === ""){
  //     setState(error.key= false);
  //   }
  //   if(state.title === ""){
  //     setState(error.title= false);
  //   }
  // })()
  
  
  // console.log(result)

  useEffect(() => {
    const this_task = id === undefined ? null : props.tasks.find(task => +task.id === +id)
    if(this_task !== null) {
      setState({...this_task})
    }
  }, [])

  console.log(state)

  const generateOpt = (key) => {
    // console.log("gen opt: ", selects[key])
    return selects[key].map((opt, i) => (
      <option key={`${key}_${i}`} value={opt}>{opt}</option>
    ))
  }

  const errorCheck = () =>{
    const new_error = error
    const keys = Object.keys(state)
    keys.forEach(key =>{
      if(state[key] === 0 || state[key] === ""){
        new_error[key] = false;
      }
      setError(new_error)
    })

    console.log(error)

    const check_result =(Object.values(error))
    const result =check_result.every((b) => {
    return b === true
    })
    return result;
    
  }

  const createOrUpdateTask = (tasks) => {
    
    const onclick = props.onClickAddTask(tasks) || props.onClickUpdateTask(tasks)
    onclick(tasks);
    }

  
  

  console.log(props)
  return (
    <div className="main_container fl-right m-top-5">
      {/* num: {props.num} */}
      <h2>{title}</h2>
      {/* <form onSubmit={}> */}
      <ul className="FormList">
        <li><label>id</label>{id}</li>

        <li>
          <label>task</label>
          <select onChange={(e)=>setState({...state, ...{task: e.target.value}})} value={state.task}>
          {generateOpt("task")}
          </select>
          {error.task === false && <span className="red txt-indent">タスクを選択して下さい</span>}
          {console.log(error.task)}
          {console.log(state.task)}
        </li>
        
        <li>
          <label>key</label>
          <input type="text" value={state.key} onChange={(e) => setState({...state, ...{key: e.target.value}})} />
          {error.key === false && <span className="red txt-indent">キーを入力して下さい</span>}
        </li>
        
        <li>
          <label>title</label>
          <input type="text" value={state.title} onChange={(e) => setState({...state, ...{title: e.target.value}})} />
        </li>
        
        <li>
          <label>author</label>
          <select onChange={(e)=>setState({...state, ...{author: e.target.value}})} value={state.author}>
          {generateOpt("author")}
          </select>
        </li>
        
        <li>
          <label>status</label>
          <select onChange={(e)=>setState({...state, ...{status: e.target.value}})} value={state.status}>
          {generateOpt("status")}
          </select>
        </li>
        
        <li>
          <label>priority</label>
          <select onChange={(e)=>setState({...state, ...{priority: e.target.value}})} value={state.priority}>
          {generateOpt("priority")}
          </select>
        </li>
        
        <li>
          <label>registed_at</label>
          <input type="date" value={state.registed_at} onChange={(e) => setState({...state, ...{registed_at: e.target.value}})} />
        </li>
        
        <li>
          <label>start_date</label>
          <input type="date" value={state.start_date} onChange={(e) => setState({...state, ...{start_date: e.target.value}})} />
        </li>
        
        <li>
          <label>end_date</label>
          <input type="date" value={state.end_date} onChange={(e) => setState({...state, ...{end_date: e.target.value}})} />
        </li>
      </ul>
      
      <div>
        {/*
          stateにidが含まれるので、引数はstateだけで良いような気がします。
          /newの場合はidがundefinedになりますし、送らなくて良いものは控えた方が
          意図が明確になるかなと。
        */}
        <button onClick={()=>{
          //resultがtrueの場合だけcreateOrUpdateTask(state)を実行させようとしましたが、うまく処理が書けず、どのように書いたら良いでしょうか？
          // 現在はcreateOrUpdateTask()がエラーとなっています。
          errorCheck() && createOrUpdateTask(state)}}>{submit_label}</button>
        
      </div>
    </div>
  )
}

export default Form