import React from "react"

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    }
    this.selects = {
      task: [
        [0, "タスク"],
        [1, "検証"],
        [2, "議事録"]
      ],
      author: [
        [0, "minamoto"],
        [1, "taira"],
        [2, "soga"],
        [3, "fujiwara"]
      ],
      status: [
        [0, "高"],
        [1, "中"],
        [2, "低"]
      ]
    }
    this.setSelect = this.setSelect.bind(this)
    
    // this.changeTitle = this.changeTitle.bind(this)
  }

  setSelect(key, val) {
        const new_val = {}
        new_val[key] = val
        this.setState({...this.state, ...new_val})
  }

  // render() {
  //       const task_opt = this.selects.task.map((task, i) => {
  //         return (<option key={`opt_task_${i}`} value={task[0]}>{task[1]}</option>)
  //       })
    
  //       return (
  //         <div>
  //           <h2>{this.state.title}</h2>
  //           <form>
  //             <label>タイトル</label>
  //             <select onChange={(e)=>this.setSelect("task", e.target.value)} value={this.state.task}>
  //               {task_opt}
  //             </select>
  //             <br />
  //             <label>キー</label>
  //             <input type="text" value={this.state.key} onChange={(e)=>this.setState({key: e.target.value})} />
    
  //             {/* <input type="text" id="title" name="title" value={this.state.task} /> */}
            
  //             <div>
  //               <button onClick={()=>this.props.addTask(this.state)}>追加</button>
  //             </div>
  //           </form>
  //         </div>
  //       )
  //     }
  
  // const changeTitle = () => {
  //   this.setState({
  //     title: '課題編集',
  //   });
  

  
  
  // changeTitle() {
  //   this.setState({
  //     title: "cTitle2",
  //   });
  // }


  render() {
    const submitForm = (e) => {
      e.preventDefault();
    }

    const changeTitle = this.props.kind==="edit" ? "課題編集" : "課題追加";

    const editTask = this.props.tasks.find(value => value.id === location.pathname.slice(1,2));

    const testtest = this.props.tasks

    console.log(editTask)

    console.log(this.props.path)

    // console.log(location.pathname.slice(1,2))

    // const etask = this.props.tasks.map((test , i) => {
    //   this.props.keys.map((k,i) => {
    //   return(<p keys={i}>{test[k]}</p>)
    //   })
    // })

    // console.log(this.props.kind)

    // const changeTitle = () => {
    //   this.setState({
    //     title: "課題編集"
    //   });
    // }
    const task_opt = this.selects.task.map((task, i) => {
      return (<option key={`opt_task_${i}`} value={task[0]}>{task[1]}</option>)
    })

    // console.log(testtest)
    

    return (
      
      <div className="main_container fl-right m-top-5">
        <h2>{changeTitle}</h2>
         
        <p>{this.props.kind==="edit" ? Object.values(editTask) : ""}</p>
        {/* {etask} */}
        <form onSubmit={submitForm}>
          <label>タイトル</label>
          <input type="text" id="title" name="title" />

          <select onChange={(e)=>this.setSelect("task", e.target.value)} value={this.state.task}>
          {task_opt}
        </select>
        <br />
        <label>キー</label>
        <input type="text" value={this.state.key} onChange={(e)=>this.setState({key: e.target.value})} />
        
          <div><button onClick={() => this.props.onClickAddTasks()}>
            追加_
          </button>
          </div>
          {/* <div>
          <button onClick={()=>this.props.addTask(this.state)}>追加</button>
        </div> */}
        </form>
        {/* <button onClick={this.changeTitle}>
          変更
        </button> */}

        {console.log(this.props.tasks)}

      </div>


    )
  }
}


export default Form

// import React from "react"

// class Form extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       task        : 0,
//       key         : "",
//       title       : "",
//       author      : "",
//       status      : "",
//       priority    : "",
//       registed_at : "",
//       start_date  : "",
//       end_date    : ""
//     }
//     this.selects = {
//       task: [
//         [0, "タスク"],
//         [1, "検証"],
//         [2, "議事録"]
//       ],
//       author: [
//         [0, "minamoto"],
//         [1, "taira"],
//         [2, "soga"],
//         [3, "fujiwara"]
//       ],
//       status: [
//         [0, "高"],
//         [1, "中"],
//         [2, "低"]
//       ]
//     }
//     this.setSelect = this.setSelect.bind(this)
//   }

//   setSelect(key, val) {
//     const new_val = {}
//     new_val[key] = val
//     this.setState({...this.state, ...new_val})
//   }

//   render() {
//     const task_opt = this.selects.task.map((task, i) => {
//       return (<option key={`opt_task_${i}`} value={task[0]}>{task[1]}</option>)
//     })

//     return (
//       <div>
//         <h2>{this.state.title}</h2>
//         <form>
//           <label>タイトル</label>
//           <select onChange={(e)=>this.setSelect("task", e.target.value)} value={this.state.task}>
//             {task_opt}
//           </select>
//           <br />
//           <label>キー</label>
//           <input type="text" value={this.state.key} onChange={(e)=>this.setState({key: e.target.value})} />

//           {/* <input type="text" id="title" name="title" value={this.state.task} /> */}
        
//           <div>
//             <button onClick={()=>this.props.addTask(this.state)}>追加</button>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }

// export default Form