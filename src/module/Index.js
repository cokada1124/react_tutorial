import React, { useState, useRef }  from "react"

const Index = (props) => {

  /** !
   *  tasksしかプロパティがないので、わざわざstate.tasksと階層を１つ落とす必要がないので、
   *  直接tasksにuseStateを入れる形で良いと思います。
   *  state = {tasks: props.tasks}としていると、「他にプロパティ入るのかなぁ」と
   *  謎の可能性を検討してしまうので、そういう誤解の余地を少なくしておきましょう。
   */
  const [ tasks, setTasks ] = useState(props.tasks)

  /** !
   *  これ動いてましたか？
   *  sortstate = {sortstate: true}
   *  が初期値ですよね。
   *  ということは、setSortState()するときには
   *    setSortState({sortstate: false})
   *  のようにobjectを入れるのが普通だと思いますが、
   *    setSortState(!sortstate)
   *  のように真偽値のようなものをセットしていて、認識に齟齬が生じてるようです。
   *  まぁ{sortstate: true}を真偽判定するとtrueが返ると思うので実際動きますが、
   *  こういう違和感あるコードはバグの起点になったりバグ探索の障害になるのでやめましょう。
   */
  // const [ sortstate, setSortState ] = useState({
  //   sortstate: true
  // })

  /** !
   *  trueならascソートになるので、単純にascという変数名にしました。
   *  あとtrue / falseを持てば良いので、
   *    sortstate({sortstate: false})
   *  のように階層を１つ落とす必要がないから
   *    sortstate(false)
   *  のように直接真偽値を持ちましょう。
   * 
   *  あとstateにしているとascを更新した時に再レンダーかかりますよね。
   *  その後tasksが変わってもう一度再レンダーかかります。
   *  が、再レンダーは１回でいいはずですよね。
   *  ということで、中身を変更可能なuseRefにしました。
   * 
   *  あと、最初props.taskに渡されrるtasksが昇順になってますよね？
   *  すると、ascの初期値がtrueだと最初にsortした時に昇順を昇順でソートし直すので、
   *  何も表示が変わりません。あれ？と思ってもう一度押すと降順になるという動きになります。
   *  実際に初期値をtrueにして、確認してみてください。
   */
  const asc = useRef(false)

  const [ pagenatestatte, setPagenateState] = useState({
    currentPage: 1,
    tasksPerPage: 5
  })

  const ths = Object.keys(props.keys).map((key, i) => (
    <th key={`th_${i}`} onClick={()=>tasksSort(key)}>{props.keys[key]}</th>
  ))
  console.log(ths)
  console.log(props.tasks)
  console.log(tasks)
  console.log(props)

  const tasksSort = (key) => {
    /** !
     *  １行にまとめました…
     */
    const sort_exp = (asc, a, b) => {
      if(asc) { return (a < b) }
      return (a > b)
    }
    const sorted_tasks = tasks.sort((a, b) => sort_exp(asc.current, a,[key], b[key]) ? 1 : -1)
    asc.current = !asc
    setTasks([...sorted_tasks])
  }
  
  const trs = tasks.map((task, i) => {
    const tds = Object.keys(task).map((td, j) => (
      <td key={`td_${j}`}>{task[td]}</td>
    ))
    const toEdit = (id) => {
      location.href = "/" + id
    }

    return (
      <tr key={`tr_${i}`} onClick ={()=>toEdit(task.id)}>
        {tds}
      </tr>
    )
  })

  return(
    <div className="main_container">
    <table className="fl-right m-top-15">
    <thead>
          <tr>
            {ths}
          </tr>
        </thead>
        <tbody>
          {trs}
        </tbody>
        </table>
    </div>
  )
}

export default Index