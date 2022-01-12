import React, { useState, useRef}  from "react"
import { useParams, Link, useLocation, useSearchParams, useNavigate, useMatch } from "react-router-dom"

const Index = (props) => {
  const { id } = useParams()

  const tasksPerPage = 5
  const [ tasks, setState ] = useState(props.tasks)
  const [ sortstate, setSortState ] = useState(true)
  const [ sortkind, setSortKind ] = useState()

  /* ?
   *  const search_pに代入されている関数の中で、[1]がどのような意味であるかわからず、
      ご教授いただければ幸いです。
   */

  /** !
   * developer tookで
   *  location.search.match(/p\=(\d+)/)
   * を実行してみてください。
   * これはlocation.search（URLの?以降の文字列。URLパラメタやクエリパラメタなどとも言う）
   * の「p=N」（Nというのは任意の数字）のNをマッチさせる正規表現なので、
   * URLパラメタに「p=N」がある場合、「a=N」などp以外のパラメタ名の場合、そもそも？がないURLの場合など、いろいろなパターンで試してください。
   * そうするとマッチした場合とそうでない場合で、.match()に結果がどうなるか差がわかるはずです。
   * 結論を言うと、「p=N」にマッチしたら結果が配列で返ってきまして、[0]には全体マッチ結果、
   * [1]には()でキャプチャした結果が格納されます。
   * ので、[1]で「p=N」の「N」が取れるわけです。
   */
  // const search_p = (() => {try{return +location.search.match(/p\=(\d+)/)[1]}catch(e){return 1}})()

  /** !
   * location.searchをmatchで抜いてましたが、
   * react-routerの標準APIでuseSearchParamsてのがありました。
   * これで簡単にパラメタ抜けますね。
   */
  const [search] = useSearchParams()
  const search_p = search.get("p") || 1
  const currentPage = useRef(search_p)


  if(search_p === 1) {
    localStorage["currentPage"] = search_p
  }

  /** !
   * ページ遷移はuseNavigateを使うのが標準ぽいですね。
   */
  const nav = useNavigate()
  const getPosition = (page) => [(page * tasksPerPage) - tasksPerPage, page * tasksPerPage]
  const position = getPosition(currentPage.current)
  const [ currentTasks , setCurrentTasks ] = useState(tasks.slice(position[0], position[1]))

  
  const ths = Object.keys(props.keys).map((key, i) => (
    <th key={`th_${i}`} onClick={()=>tasksSort(key)}><Link to={`/`}>{props.keys[key]+ (localStorage["currentSort"] === key + "false" ? "▲" : localStorage["currentSort"] === key + "true" ? "▼":"")}</Link></th>
  ))
  console.log(ths)
  console.log(props.tasks)
  // console.log(tasks.tasks)
  console.log(props)

  const tasksSort = (key) => {
    if(sortstate){
    const desctasks = tasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState([...desctasks])
    setSortKind(key + sortstate.toString())
    localStorage["currentSort"] = key + sortstate.toString()
  } else {
    const asctasks = tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState([...asctasks])
    localStorage["currentSort"] = key + sortstate.toString()
    setSortKind(key + sortstate.toString())
  }
    const currentT = tasks.slice(position[0], position[1])
    changeCurrentTasks(currentT)
    localStorage["currentPage"] = 1
    location.href = `/?p=1`
  }

  const pageOflastTask = +localStorage["currentPage"] * tasksPerPage 
  const pageOffarstTask = pageOflastTask - tasksPerPage 
  const pageOfmiddle = currentTasks.length + pageOffarstTask
  const maxPage = Math.ceil(tasks.length / tasksPerPage)

  let pageNumber = [];

  for(let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++){
    pageNumber.push(i)
    console.log(i)
  }

  if(+localStorage["currentPage"] >= 1 && +localStorage["currentPage"] < 3){
    pageNumber = [1,2,3,4,5,null,maxPage]
  }
  if(+localStorage["currentPage"] >= 3 && maxPage >= +localStorage["currentPage"] +2){
    pageNumber = [+localStorage["currentPage"] -2, +localStorage["currentPage"] -1,+localStorage["currentPage"],+localStorage["currentPage"] +1,+localStorage["currentPage"] +2,null,maxPage]
  }
  if(+localStorage["currentPage"] === maxPage -2){
    pageNumber = [+localStorage["currentPage"] -2, +localStorage["currentPage"] -1,+localStorage["currentPage"],+localStorage["currentPage"] +1,+localStorage["currentPage"] +2]
  }
  if(+localStorage["currentPage"] >= maxPage -1){
    pageNumber = [maxPage -4,maxPage -3,maxPage -2,maxPage -1,maxPage]
  }


  const trs = JSON.parse(localStorage["currentTasks"]).map((task, i) => {
    const tds = Object.keys(task).map((td, j) => (
      <td key={`td_${j}`}>{task[td]}</td>
    ))
    const toEdit = (id) => {
      console.log(id)
      // location.href = "/" + id
      nav("/" + id)
    }

    return (
      <tr key={`tr_${i}`} onClick={()=>toEdit(task.id)}>
        {tds}
      </tr>
    )
  })

  const numtd = pageNumber.map((v,i) => (
    <td key={`pn_td_${i}`} className="tdnum"><span className={`main_container__table_pagenum--num ${+localStorage["currentPage"] === v ? 'currentNum' : '' }`}><Link to={`/?p=${v}`} onClick={()=>hundlePagenate(v)}>{v===null ? "..." : v}</Link></span></td>
  ))

  const backtd = 
    <td className="tdbacktext" onClick={1 < +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"]-1) : ()=>{}}><Link to={`/?p=${1 < +localStorage["currentPage"] ? +localStorage["currentPage"]-1 : +localStorage["currentPage"]}`}><span  className="main_container__table_pagenum--text">戻る</span></Link></td>

  const hundlePagenate = (v) => {
    const cp = v
    localStorage["currentPage"] = cp
    const position = getPosition(v)
    const currentT = tasks.slice(position[0], position[1])
    changeCurrentTasks(currentT)
  }

  const changeCurrentTasks = (tasks) => {
    setCurrentTasks([...tasks])
    localStorage["currentTasks"] = JSON.stringify(tasks)
    console.log(JSON.parse(localStorage["currentTasks"]))
  }
  return(
    <div className="main_container">
    <table className="main_container__table_pagenum">
      <tbody>
        <tr>
          <td className="tdcurrentpagenum">{pageOffarstTask+1}〜{currentTasks.length === tasksPerPage ?pageOflastTask :pageOfmiddle}件</td>
          {numtd}
          {backtd}
          <td onClick={+maxPage > +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"]+1) : ()=>{}}><Link to={`/?p=${+maxPage > +localStorage["currentPage"] ? +localStorage["currentPage"]+1 : +localStorage["currentPage"]}`}><span className="main_container__table_pagenum--text">次へ</span></Link></td>
          <td className="tdnewbtn"><a href="/new"><span className="main_container__table_pagenum--new">新規作成</span></a></td>
        </tr>
      </tbody>
    </table>
    <table className="main_container__table_tasks">
      <thead>
        <tr>
          {ths}
        </tr>
      </thead>
      <tbody>
        {trs}
      </tbody>
    </table>
    <table className="main_container__table_pagenum">
      <tbody>
        <tr>
        <td className="tdcurrentpagenum">{pageOffarstTask+1}〜{currentTasks.length === tasksPerPage ?pageOflastTask :pageOfmiddle}件</td>
          {numtd}
          {backtd}
          <td onClick={+maxPage > +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"]+1) : ()=>{}}><Link to={`/?p=${+maxPage > +localStorage["currentPage"] ? +localStorage["currentPage"]+1 : +localStorage["currentPage"]}`}><span className="main_container__table_pagenum--text">次へ</span></Link></td>
          <td className="tdnewbtn"><a href="/new"><span className="main_container__table_pagenum--new">新規作成</span></a></td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Index