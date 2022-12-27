import React, { useState, useEffect } from "react"
import { useParams, useMatch } from "react-router-dom"
// import { useForm } from 'react-hook-form'

const Form = (props) => {
  const { id } = useParams()
  
  const [ state, setState ] = useState({
    id          : 1,
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

  const [ errors, setErrors ] = useState({
    projectId   : true,
    summary     : true,
    // content     : true,
    issueTypeId : true,
    issueType    : true,
    priorityId  : true,
    priority    : true,
    startDate   : true,
    dueDate     : true
  })

  // ????????????????
  // 質問
  //issueTypeIdにどのような番号を入れて良いか、調べてみましたがわかりませんでした。
  //issueType: {id:}と同じ意味でしょうか？それともあらかじめ一意の連番を作成し
  //入れるものでしょうか？
  //またpriorityIdは番号を入れるとして、「高」の場合は2を入れたい場合、
  //useState内で条件分岐するとうまくいかないのですが、どのように書くとよいでしょうか？
  // 質問
  // ????????????????
  const [body, setBody ] = useState({
    projectId: 1073938367,
    summary: "",
    createUser: "",
    // content: "",
    issueTypeId: "1",
    issueType: "",
    priorityId: "2",
    priority: "",
    startDate: "",
    dueDate: ""
  })

  console.log(errors.projectId + "-----------------")
  console.log(errors.summary + "-----------------")


  const selects = {
    issueType     : ["タスク", "検証", "議事録"],
    createUser   : ["minamoto", "taira", "soga", "fujiwara"],
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


  console.log("--projectId--" + body.projectId)
  console.log("--summary--" + body.summary)
  console.log("--createUser--" + body.createUser)
  console.log("--content--" + body.content)
  console.log("--issueTypeId--" + body.issueTypeId)
  console.log("--issueType--" + body.issueType)
  console.log("--priorityId--" + body.priorityId)
  console.log("--priority--" + body.priority)
  console.log("--startDate--" + body.startDate)
  console.log("--dueDate--" + body.dueDate)

  fetch(`https://2012.backlog.jp/api/v2/priorities?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT`, {
      method       : "GET",
      headers      : {
        "Content-Type" : "application/json;charset=utf-8"
      }
    })
  .then(res => res.json())
  .then(json => console.log("fetchプライマリID" + json[0].id))
  


  const generateOpt = (key) => {
    // console.log("gen opt: ", selects[key])
    return selects[key].map((opt, i) => (
      <option key={`${key}_${i}`} value={opt}>{opt}</option>
    ))
  }

  const noError = () =>{
    const new_error = errors
    const keys = Object.keys(body)
    keys.forEach(key => {
      if (body[key] === 0 || body[key] === ""){
        new_error[key] = false;
      } else { new_error[key] = true; }
      console.log(key)
    })
    setErrors({...new_error})

    console.log(errors)

    const check_result = Object.values(errors)
    console.log("checkresult------" + check_result)
    const result = check_result.every(b => b === true)
    // const testtest = [1,1,1,1,1]
    // const test = testtest.every(a => a === 1);

    console.log(result)

    return result;
    
  }
  // ????????????????
  // 質問
  //bodyの内容がstringifyをしないとコンソールに表示できない理由は何でしょうか？
  //またその先のaddTaskが実行できない理由と関係があるのでしょうか？
  // 質問
  // ????????????????
  const createOrUpdateTask = (tasks) => {
    if(!noError()){return}
    console.log("addTask実行(form)")
    console.log("body---------" + JSON.stringify(body))
    const onclick = props.onClickAddTask || props.onClickUpdateTask
    onclick(tasks)
  }
  console.log(props)
  return (
    <div className="main_container fl-right m-top-5">
      {/* num: {props.num} */}
      <h2>{title}</h2>
      {/* <form onSubmit={}> */}
      <div>
        {/* <label>タスク</label> */}
        <select onChange={(e)=>setBody({...body, ...{issueType: e.target.value}})} value={body.issueType} className="form form--task">
          {generateOpt("issueType")}
          </select>
          {errors.issueType === false && <span className="red txt-indent">タスクを選択して下さい</span>}
          {console.log(errors.issueType)}
          {console.log(state.issueType)}
      </div>
      <div>
        <input type="text" className="form form--title" value={body.summary} onChange={(e) => setBody({...body, ...{summary: e.target.value}})} placeholder="タイトル" />
            {errors.summary === false && <span className="red txt-indent">タイトルを入力して下さい</span>}
            {console.log(errors.summary)}
            {console.log(body.summary)}
      </div>
      <div className="taskDetail"> 
        <div className="detailTop">
          <textarea type="text" value={body.content} onChange={(e) => setBody({...body, ...{content: e.target.value}})}  placeholder="本文" className="form form--content"/>
          {errors.content === false && <span className="red txt-indent">本文を入力して下さい</span>}
        </div>
        <div>
          <div className="splitLeft">
            <div className="splitLeft--farst">
            <label>担当者</label>
              <select onChange={(e)=>setBody({...body, ...{createUser: e.target.value}})} value={body.createUser} className="form">
            {generateOpt("createUser")}
              </select>
              {errors.createUser === false && <span className="red txt-indent">担当者を選択して下さい</span>}
            </div>
            <div className="splitLeft--second">
            <label>開始日</label>
              <input type="date" value={body.startDate} onChange={(e) => setBody({...body, ...{startDate: e.target.value}})} className="form" />
              {errors.startDate === false && <span className="red txt-indent">開始を選択して下さい</span>}
            </div>
          </div>
          <div className="splitRight">
            <div className="splitRight--farst">
            <label>優先度</label>
              <select onChange={(e)=>setBody({...body, ...{priority: e.target.value}})} value={body.priority} className="form">
            {generateOpt("priority")}
              </select>
              {errors.priority === false && <span className="red txt-indent">優先度を選択して下さい</span>}
            </div>
            <div className="splitRight--second">
            <label>期限日</label>
              <input type="date" value={body.dueDate} onChange={(e) => setBody({...body, ...{dueDate: e.target.value}})} className="form" />
              {errors.dueDate === false && <span className="red txt-indent">期限日を選択して下さい</span>}
            </div>
          </div>
        </div>
      </div>
      {/* <ul className="FormList">
        <li><label>id</label>{id}</li>

        <li>
          <label>タスク</label>
          <select onChange={(e)=>setState({...state, ...{task: e.target.value}})} value={state.task}>
          {generateOpt("task")}
          </select>
          {error.task === false && <span className="red txt-indent">タスクを選択して下さい</span>}
          {console.log(error.task)}
          {console.log(state.task)}
        </li>
        
        <li>
          <label>キー</label>
          <input type="text" value={state.key} onChange={(e) => setState({...state, ...{key: e.target.value}})} />
          {error.key === false && <span className="red txt-indent">キーを入力して下さい</span>}
        </li>
        
        <li>
          <label>タイトル</label>
          <input type="text" className="form_title" value={state.title} onChange={(e) => setState({...state, ...{title: e.target.value}})} />
          {error.title === false && <span className="red txt-indent">タイトルを入力して下さい</span>}
        </li>
        
        <li>
          <label>担当者</label>
          <select onChange={(e)=>setState({...state, ...{author: e.target.value}})} value={state.author}>
          {generateOpt("author")}
          </select>
          {error.author === false && <span className="red txt-indent">担当者を選択して下さい</span>}
        </li>
        
        <li>
          <label>状態</label>
          <select onChange={(e)=>setState({...state, ...{status: e.target.value}})} value={state.status}>
          {generateOpt("status")}
          </select>
          {error.status === false && <span className="red txt-indent">状態を選択して下さい</span>}
        </li>
        
        <li>
          <label>優先度</label>
          <select onChange={(e)=>setState({...state, ...{priority: e.target.value}})} value={state.priority}>
          {generateOpt("priority")}
          </select>
          {error.priority === false && <span className="red txt-indent">優先度を選択して下さい</span>}
        </li>
        
        <li>
          <label>登録日</label>
          <input type="date" value={state.registed_at} onChange={(e) => setState({...state, ...{registed_at: e.target.value}})} />
          {error.registed_at === false && <span className="red txt-indent">登録日を選択して下さい</span>}
        </li>
        
        <li>
          <label>開始日</label>
          <input type="date" value={state.start_date} onChange={(e) => setState({...state, ...{start_date: e.target.value}})} />
          {error.start_date === false && <span className="red txt-indent">開始を選択して下さい</span>}
        </li>
        
        <li>
          <label>期限日</label>
          <input type="date" value={state.end_date} onChange={(e) => setState({...state, ...{end_date: e.target.value}})} />
          {error.end_date === false && <span className="red txt-indent">期限日を選択して下さい</span>}
        </li>
      </ul> */}
      
        <div className="submit">
        {/*
          stateにidが含まれるので、引数はstateだけで良いような気がします。
          /newの場合はidがundefinedになりますし、送らなくて良いものは控えた方が
          意図が明確になるかなと。
        */}
          <button onClick={()=>{
            //resultがtrueの場合だけcreateOrUpdateTask(state)を実行させようとしましたが、うまく処理が書けず、どのように書いたら良いでしょうか？
            // 現在はcreateOrUpdateTask()がエラーとなっています。
            createOrUpdateTask(body)}} className="submitbtn">{submit_label}</button>
        </div>
    </div>
  )
}

export default Form