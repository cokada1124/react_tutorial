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

  const [ bodyState, setBodyState ] = useState({
    id          : "",
    projectId   : "",
    summary     : "",
    issueTypeId : "",
    priorityId  : "",
    startDate   : "",
    dueDate     : ""
  })
 
  console.log(props.bodys)


  const [ errors, setErrors ] = useState({
    projectId   : true,
    summary     : true,
    // content     : true,
    issueTypeId : true,
    priorityId  : true,
    startDate   : true,
    dueDate     : true
  })

  const [body, setBody ] = useState({
    projectId: 1073938367,
    summary: "",
    issueTypeId: "1074691455",
    priorityId: "",
    startDate: "",
    dueDate: ""
  })


  const selects = {
    // issueType     : ["タスク", "要望", "その他"],
    issueType   : ["タスク", "検証", "議事録"],
    // assigne   : [null, null, "minamoto", "taira", "soga", "fujiwara"],
    assigne     : ["minamoto", "taira", "soga", "fujiwara"],
    // status   : [null,"未対応","処理中", "対応済","完了"],
    status      : ["未対応", "対応済"],
    // priority : [{name:"高",value:"2"},{name: "中", value:"3"},{name: "低",value:"4"}]
    // priority : ["高", "中", "低"]
    priority    : [null, null ,"高", "中", "低"]
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

  console.log(body)

  // const aaa = props.tasks.find(task => +task.id === +1120493890 )
  // 

  // ????????????????
  // 質問（）
  //110、111行目はオブジェクトの内容がコンソールんい表示されるのですが、
  //109行目のように配列の0番目を表示させようとするとエラーとなってしまいます。
  //原因がわからずに困っています。
  // 質問
  // ????????????????

  // console.log(props.bodys[0])
  console.log(props.bodys)
  console.log(props.tasks[0])
  // console.log(aaa)


  const generateOpt = (key) => {
    return selects[key].map((opt, i) => {
      if(opt === null) { return null }
      return (<option key={`${key}_${i}`} value={i}>{opt}</option>) 
    })
  }

  const noError = () =>{
    const new_error = errors
    const keys = Object.keys(body)
    keys.forEach(key => {
      if (body[key] === 0 || body[key] === ""){
        new_error[key] = false;
      } else { new_error[key] = true; }
    })
    setErrors({...new_error})
    const check_result = Object.values(errors)
    const result = check_result.every(b => b === true)

    return result;
    
  }

  const createOrUpdateTask = (tasks) => {
    if(!noError()){return}
    const onclick = props.onClickAddTask || props.onClickUpdateTask
    onclick(tasks)
  }
  console.log(props)
  return (
    <div className="main_container fl-right m-top-5">
      <h2>{title}</h2>
      <div>
        <select value={body.issueType} className="form form--task">
          {generateOpt("issueType")}
          </select>
          {errors.issueType === false && <span className="red txt-indent">タスクを選択して下さい</span>}
      </div>
      <div>
        <input type="text" className="form form--title" value={body.summary} onChange={(e) => setBody({...body, ...{summary: e.target.value}})} placeholder="タイトル" />
            {errors.summary === false && <span className="red txt-indent">タイトルを入力して下さい</span>}
      </div>
      <div className="taskDetail"> 
        <div className="detailTop">
          <textarea type="text" value={body.content}  placeholder="本文" className="form form--content"/>
          {errors.content === false && <span className="red txt-indent">本文を入力して下さい</span>}
        </div>
        <div>
          <div className="splitLeft">
            <div className="splitLeft--farst">
            <label>担当者</label>
              <select value={body.assigneeId}_ className="form">
            {generateOpt("assigne")}
              </select>
              {errors.assigneeId === false && <span className="red txt-indent">担当者を選択して下さい</span>}
            </div>
            <div className="splitLeft--second">
            <label>開始日</label>
              <input type="date" value={body.startDate} onChange={(e)=>setBody({...body, ...{startDate: e.target.value}})}  className="form" />
              {errors.startDate === false && <span className="red txt-indent">開始を選択して下さい</span>}
            </div>
          </div>
          <div className="splitRight">
            <div className="splitRight--farst">
            <label>優先度</label>
              <select onChange={(e)=>setBody({...body, ...{priorityId: e.target.value}})} value={body.priorityId} className="form">
            {generateOpt("priority")}
              </select>
              {errors.priorityId === false && <span className="red txt-indent">優先度を選択して下さい</span>}
            </div>
            <div className="splitRight--second">
            <label>期限日</label>
              <input type="date" value={body.dueDate} onChange={(e)=>setBody({...body, ...{dueDate: e.target.value}})}  className="form" />
              {errors.dueDate === false && <span className="red txt-indent">期限日を選択して下さい</span>}
            </div>
          </div>
        </div>
      </div>
      
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