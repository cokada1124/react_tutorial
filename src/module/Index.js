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
  // const nextPage = useRef(search_p)+1 

  if(search_p === 1) {
    localStorage["currentPage"] = search_p
  }


  //下記作業途中のものになります。
  // if(false){
  // const pageNate = [1,null,+currentPage.curren-2,+currentPage.current-1,+currentPage.current,+currentPage.current+1,+currentPage.current+2,null,tasks.length]
  // }else{
  // const pageNate = [1,null,+currentPage.curren-2,+currentPage.current-1,+currentPage.current,+currentPage.current+1,+currentPage.current+2,null,tasks.length]
  // }
  // console.log(pageNate)
  console.log(search.get("p"))
  // console.log(search.remove())
  // const test = () => {
  //   if(currentPage) {
  //   }
  // }
  //

  /** !
   * ページ遷移はuseNavigateを使うのが標準ぽいですね。
   */
  const nav = useNavigate()
  const getPosition = (page) => [(page * tasksPerPage) - tasksPerPage, page * tasksPerPage]
  const position = getPosition(currentPage.current)
  const [ currentTasks , setCurrentTasks ] = useState(tasks.slice(position[0], position[1]))

  console.log(position)
  console.log(currentPage.current)
  console.log(currentPage)
  // console.log(nextPage)

  //下記作業途中のものになります。
  // const total_page = tasks.length / tasksPerPage
  // // useEffect
  // if (tasks.length % tasksPerPage > 0){
  //   total_page +1
  // }
  //
  
  const ths = Object.keys(props.keys).map((key, i) => (
    <th key={`th_${i}`} onClick={()=>tasksSort(key)}><Link to={`/`}>{props.keys[key]+ (sortkind === key + !sortstate.toString() ? "▼" : sortkind === key + sortstate.toString() ? "aaa":"")}</Link></th>
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
    console.log(sortstate)
    console.log(key)
    setSortKind(key + sortstate.toString())
    console.log(sortkind)
    // const desccurrenttasks = currentTasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
    // setCurrentTasks(desccurrenttasks)
    // location.href = `/`

  }else{
    const asctasks = tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState([...asctasks])
    console.log(key)
    console.log(sortstate)
    setSortKind(key + sortstate.toString())
    console.log(sortkind)
    // location.href = `/`
    // const asccurrenttasks = currentTasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    // setCurrentTasks(asccurrenttasks)
  }
  const currentT = tasks.slice(position[0], position[1])
  changeCurrentTasks(currentT)
  localStorage["currentPage"] = 1
  location.href = `/?p=1`
  }


  console.log(sortkind)
  // const location = useLocation();

  // console.log(location.search)

  // if(location.search === "?p=" + currentPage){
    
  // }
  // if(location.search.charAt(0) !== "?" ){
  //   const pageOflastTask = 1 * tasksPerPage
  //   const pageOffarstTask = pageOflastTask - tasksPerPage 

  //   const currentT = tasks.slice(pageOffarstTask, pageOflastTask)
  //   localStorage["currentTage"] = currentT
  //   console.log(currentT)
  // }


  const pageOflastTask = +localStorage["currentPage"] * tasksPerPage 
  const pageOffarstTask = pageOflastTask - tasksPerPage 
  const pageOfmiddle = currentTasks.length + pageOffarstTask
  const maxPage = Math.ceil(tasks.length / tasksPerPage)

  console.log(currentTasks.length)

  console.log(pageOflastTask)
  console.log(pageOffarstTask)

  // const currentT = tasks.slice(pageOffarstTask, pageOflastTask)

  
  console.log(id)
  console.log(tasks)

  // (() => {
  //   setState([...currentTasks]) 
  // })();

  const pageNumber = [];

  for(let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++){
    pageNumber.push(i)
    console.log(i)
  }
  // tasks.map((v,i) => pageNumber.push(i) )
  console.log(pageNumber)

  // console.log(pageNumber)
  
  
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
    // <td key={`pn_td_${i}`} onClick={()=>hundlePagenate(v)}><span className="main_container__table_pagenum--num"><Link to={`/?${v}`}>{v}</Link></span></td>
    <td key={`pn_td_${i}`} className="tdnum"><span className={`main_container__table_pagenum--num ${+localStorage["currentPage"] === v ? 'currentNum' : '' }`}><Link to={`/?p=${v}`} onClick={()=>hundlePagenate(v)}>{v}</Link></span></td>
  ))

  console.log(currentPage.current)

  const location = useLocation();

  const hundlePagenate = (v) => {
    // setPagenateState({currentPage : v})
    // location.href = `/?${v}`
    // setCurrentPage(v)
    // console.log(v)
    const cp = v
    localStorage["currentPage"] = cp
    console.log(localStorage["currentPage"])
    // const pageOflastTask = currentPage * tasksPerPage
    // const pageOffarstTask = pageOflastTask - tasksPerPage 
    // const currentTasks = tasks.slice(pageOffarstTask, pageOflastTask)
    // console.log(currentTasks)
    // console.log(pageOffarstTask)
    // console.log(pageOflastTask)
    // setState([...currentTasks]) 
    // changeCurrentTasks(currentT)
    
    // const aaa = currentTasks
    // if(llocation.search === "?p=" + v){
    //   console.log("testtest")
    // }
    // console.log(location)
  
  // console.log(pageOflastTask)
  // console.log(pageOffarstTask)

  // location.href = `/?${v}`

  const position = getPosition(v)
  const currentT = tasks.slice(position[0], position[1])
  changeCurrentTasks(currentT)
    
    

  // console.log(location.search)
  // setCurrentTasks(currentT)
  // window.location.replace( `/?${v}`) ;
  }
  // console.log()
  // console.log(tasks)
  // console.log(currentTasks)

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
          <td className="main_container__table_pagenum--text" onClick={+maxPage > +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"]+1) : ()=>{}}><Link to={`/?p=${+maxPage > +localStorage["currentPage"] ? +localStorage["currentPage"]+1 : +localStorage["currentPage"]}`}>次へ</Link></td>
          <td className="tdnewbtn"><a href="/new"><span className="main_container__table_pagenum--new">新規作成</span></a></td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Index