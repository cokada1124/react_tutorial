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

  //// よくわかってないんですが、submitボタンが押されるタイミングでこのerrorCheckを
  //// 実行したいんですかね？
  //// 「即時関数」というのは知りませんが、「関数の即時実行」なら知っていて、関数を宣言すると同時に実行するというものです。
  //// (()=>{}())という書き方はアロー関数を宣言すると同時に()で実行しているため、
  //// 「アロー関数の即時実行」になっていますね。
  //// で、このFormはFunctionalComponentなので、再レンダーごとに全部の関数が毎回実行されます。
  //// (useStateやuseMemoが例外です)
  //// なのでこのerrorCheckは再レンダーのたびに実行されるはずです。
  //// 下は俺が直した内容ですが、直す前から再レンダー時に毎回実行されてましたよ。

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

  //// errorCheckは再レンダーごとに実行する必要ないかなと思いました。
  //// inputに１文字入るたびに実行する必要ないですよね？
  //// ということで、submitボタン押下時に実行するイメージにしました。
  //// 入力値の判定は単純にif(!state[key])としました。これは初期値が0か''なので、いずれも真偽判定するとfalseが返るという性質を利用したものです。
  //// 正確に書くならif(state[key] !== 0 && state[key] !== "")ですかね。
  //// 各要素の入力判定結果をsetErrorすると共に、falseが１つでもあれば全体としてfalseを返すようにしました。
  //// resultの判定部分でeveryを使ってましたが、この場合は１つでもfalseがあればsubmitを実行しないようにしたいので、
  //// some()の方が適しています。
  const can_i_submit = () => {
    const new_error = {...error}
    Object.keys(error).forEach(key => {
      // if(!state[key])
      if(state[key] === 0 || state[key] === "") { new_error[key] = false }
      else { new_error[key] = true }
    })
    setError(new_error)
    const result = !(Object.values(new_error).some(e => e === false))
    console.log(result)
    return result
  }
  
  // const check_result =(Object.values(error))
  // const result =check_result.every((b) => {
  //   return b===true
  // } )
  // console.log(result)

  useEffect(() => {
    const this_task = id === undefined ? null : props.tasks.find(task => +task.id === +id)
    if(this_task !== null) {
      setState({...this_task})
    }
  }, [])

  const generateOpt = (key) => {
    // console.log("gen opt: ", selects[key])
    return selects[key].map((opt, i) => (
      <option key={`${key}_${i}`} value={opt}>{opt}</option>
    ))
  }

  //// errorCheckは再レンダーごとに実行する必要はないのでは。
  //// submitされた時に実行すれば良いと思うので、submitメソッドが実行されたらerrorCheckを実行するようにしました。
  //// errorCheckは各要素に対応したtrue / falseをsetErrorすると共に、一つでもfalseがあればfalseを返却するように作ったので、これがfalseならsubmitを実行しないようにしました。
  const createOrUpdateTask2 = (tasks) => {
    // if(!errorCheck()) { return false}
    // const onclick = props.onClickAddTask || props.onClickUpdateTask
    // onclick(tasks)

    if(errorCheck()) {
      const onclick = props.onClickAddTask || props.onClickUpdateTask
      onclick(tasks)
    }
  } 
  
  const createOrUpdateTask = props.onClickAddTask || props.onClickUpdateTask

  return (
    <div className="main_container fl-right m-top-5">
      {/* num: {props.num} */}
      <h2>{title}</h2>
      {/* <form onSubmit={}> */}
      <ul className="FormList">
        <li><label>id</label>{id}</li>

        <li>
          <label>task</label>
          <select onChange={(e)=>setState({...state, ...{task: e.target.value}})} value={state.task} className={error.task === true ? "" : "-error"}>
          {generateOpt("task")}
          </select>
          {error.task === false && <span className="red txt-indent">タスクを選択して下さい</span>}
          {console.log(error.task)}
          {console.log(state.task)}
        </li>
        
        <li>
          <label>key</label>
          <input type="text" value={state.key} onChange={(e) => setState({...state, ...{key: e.target.value}})} className={error.key === true ? "" : "-error"} />
          {error.key === false && <span className="red txt-indent">キーを入力して下さい</span>}
        </li>
        
        <li>
          <label>title</label>
          <input type="text" value={state.title} onChange={(e) => setState({...state, ...{title: e.target.value}})} className={error.title === true ? "" : "-error"} />
          {error.title === false && <span className="red txt-indent">タイトルを入力して下さい</span>}
        </li>
        
        <li>
          <label>author</label>
          <select onChange={(e)=>setState({...state, ...{author: e.target.value}})} value={state.author} className={error.author === true ? "" : "-error"}>
          {generateOpt("author")}
          </select>
          {error.author === false && <span className="red txt-indent">authorを入力して下さい</span>}
        </li>
        
        <li>
          <label>status</label>
          <select onChange={(e)=>setState({...state, ...{status: e.target.value}})} value={state.status} className={error.status === true ? "" : "-error"}>
          {generateOpt("status")}
          </select>
          {error.status === false && <span className="red txt-indent">statusを入力して下さい</span>}
        </li>
        
        <li>
          <label>priority</label>
          <select onChange={(e)=>setState({...state, ...{priority: e.target.value}})} value={state.priority} className={error.priority === true ? "" : "-error"}>
          {generateOpt("priority")}
          </select>
          {error.priority === false && <span className="red txt-indent">優先度を入力して下さい</span>}
        </li>
        
        <li>
          <label>registed_at</label>
          <input type="date" value={state.registed_at} onChange={(e) => setState({...state, ...{registed_at: e.target.value}})} className={error.registed_at === true ? "" : "-error"} />
          {error.registed_at === false && <span className="red txt-indent">登録日を入力して下さい</span>}
        </li>
        
        <li>
          <label>start_date</label>
          <input type="date" value={state.start_date} onChange={(e) => setState({...state, ...{start_date: e.target.value}})} className={error.start_date === true ? "" : "-error"} />
          {error.start_date === false && <span className="red txt-indent">開始日を入力して下さい</span>}
        </li>
        
        <li>
          <label>end_date</label>
          <input type="date" value={state.end_date} onChange={(e) => setState({...state, ...{end_date: e.target.value}})} className={error.end_date === true ? "" : "-error"} />
          {error.end_date === false && <span className="red txt-indent">終了日を入力して下さい</span>}
        </li>
      </ul>
      
      <div>
        <button onClick={()=>{
          //resultがtrueの場合だけcreateOrUpdateTask(state)を実行させようとしましたが、うまく処理が書けず、どのように書いたら良いでしょうか？
          // 現在はcreateOrUpdateTask()がエラーとなっています。

          //// いろいろ書き方がありそうでしたが、ここではsubmitメソッドをwrapする方法を選択しました。
          // can_i_submit() ? createOrUpdateTask(state) : (10 == 10) ? true : false}
          can_i_submit() && createOrUpdateTask(state) }}>{submit_label}</button>

          {/* true || 実行されない
          false || 実行される(trueの場合) */}
        
      </div>
    </div>
  )
}

export default Form