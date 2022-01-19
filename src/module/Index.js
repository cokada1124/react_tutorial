import React, { useState, useRef, useEffect}  from "react"
import { useParams, Link, useLocation, useSearchParams, useNavigate, useMatch } from "react-router-dom"

const Index = (props) => {
  const { id } = useParams()

  const tasksPerPage = 5
  const [ tasks, setState ] = useState([])
  const [ sortstate, setSortState ] = useState(true)
  const currentSortKey = useRef("")
  const currentSortVector = useRef(true)

  const [search] = useSearchParams()
  const search_p = search.get("p") || 1
  const currentPage = useRef(search_p)

  console.log(currentPage.current)

  if(search_p === 1) {
    localStorage["currentPage"] = search_p
  }

  useEffect(() => {
    fetch("https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367", {
    method: "GET"
    })
    .then(res => res.json())
    .then(json => setState(json))
    fetch("https://2012.backlog.jp/api/v2/issues/count?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367", {
    method: "GET"
    })
    .then(res => res.json())
    .then(json => console.log(json.count))

  }, [])
  /** ? 質問
   * 課題取得後にcountとoffsetを使ってページング するとなっていましたが、
   * countとoffsetとはメソッドのことでしょうか？
   * またはlengthを使ってcountする考え方ということでしょうか？
   * イメージが付けられておらず、伺えれば幸いです。
   */
  console.log(tasks)
  /** !
   * 既に回答済みですが、countとoffsetはbacklog apiの課題一覧取得時のクエリパラメタです。
   * offsetが「●件目から取得」という取得開始位置で、countが件数です。
   */

    /* 
  * useEffectは、第一引数にcallbackを入れて、第二引数に依存する値の配列を入れる
  * 依存する値が変更される度にcallbackが実行される
  */

  
  const nav = useNavigate()
  const getPosition = (page) => [(page * tasksPerPage) - tasksPerPage, page * tasksPerPage]
  const position = getPosition(currentPage.current)
  console.log(tasks)
  const [ currentTasks , setCurrentTasks ] = useState(tasks.slice(position[0], position[1]))

  
  console.log(position)
  console.log(tasks)
  console.log(currentTasks)
  console.log(tasks.slice(position[0], position[1]))

  const ths = Object.keys(props.keys).map((key, i) => {
    const sortVector = (() => {
      if(currentSortKey.current === key) {
        return currentSortVector.current ? "▼" : "▲"
      }
      return ""
    })()
    return (
      <th key={ `th_${i}` } onClick={ () => tasksSort(key) }>
        <Link to={`/`}>
          { props.keys[key] + sortVector }
        </Link>
      </th>
    )
  })

  
  /** ? 質問
   * 現在表示されているデータ用の項目名を取得したいのですが、下記の形だと
   * 外側のmapで不要な<tr>保存されてしまいます。
   * mapを1回目でbreakしたいのですが、どのように書けばよいでしょうか？
   * もしくはこの場合キーはこれまでと同じような形で固定の変数で持つ形の方がいいのでしょうか？
   */
  const tths = tasks.map((task, i) => {
   const ttths = Object.keys(task).filter(key => (
        [
          "id",
          "issueType",
          "issueKey",
          "summary",
          "createdUser",
          "status",
          "priority",
          "created",
          "startDate",
          "dueDate",
        ].includes(key)
      )).map((kkey,j) => {
        const sortVector = (() => {
          if(currentSortKey.current === kkey) {
            return currentSortVector.current ? "▼" : "▲"
          }
          return ""
        })()

        if(kkey === "createdUser"){
          return <th key={`${kkey}_${i}_${j}`} onClick={()=>tasksSort(kkey)}>
            <Link to={`/`}>{props.keys[kkey].idd + sortVector}</Link>
          </th>
        }
        if(["issueType", "priority", "status"].includes(kkey)){
          return Object.keys(task[kkey]).map((tdd, i) => (
            <th key={`${kkey}-${tdd}_${i}_${j}`} onClick={()=>tasksSort(kkey)}>
            <Link to={`/`}>{`${kkey}_${tdd}` + sortVector}</Link>
            </th>
          ))
        }
        return <th key={`${kkey}_${i}_${j}`} onClick={()=>tasksSort(kkey)}><Link to={`/`}>{`${kkey}` + sortVector}</Link></th>
      })

      return (
        <tr key={`tr_${i}`}>
          {ttths}
        </tr>
      )
  })

  const ttest = tasks.map((t,i) => (
    <tr key={`tr_${i}`}>
    <td key={`tt_${Math.random()}`}>{t.id}</td>
    <td key={`tt_${Math.random()}`}>{t.projectId}</td>
    <td key={`tt_${Math.random()}`}>{t.issueKey}</td>
    <td key={`tt_${Math.random()}`}>{t.keyId}</td>

    <td key={`tt_${Math.random()}`}>{t.issueType.id}</td>
    <td key={`tt_${Math.random()}`}>{t.issueType.projectId}</td>
    <td key={`tt_${Math.random()}`}>{t.issueType.name}</td>
    <td key={`tt_${Math.random()}`}>{t.issueType.color}</td>
    <td key={`tt_${Math.random()}`}>{t.issueType.displayOrder}</td>

    <td key={`tt_${Math.random()}`}>{t.summary}</td>
    <td key={`tt_${Math.random()}`}>{t.description}</td>
    <td key={`tt_${Math.random()}`}>{t.resolution}</td>

    <td key={`tt_${Math.random()}`}>{t.priority.id}</td>
    <td key={`tt_${Math.random()}`}>{t.priority.name}</td>
    </tr>
  ))
  
  const tasksSort = (key) => {
    currentSortKey.current = key
    currentSortVector.current = sortstate

    if(sortstate){
      const desctasks = tasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
      setSortState(!sortstate)
      setState([...desctasks])
    }else{
      const asctasks = tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
      setSortState(!sortstate)
      setState([...asctasks])
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

  console.log(maxPage)
  console.log(tasks.length)

  let pageNumber = [];

  for(let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++){
    pageNumber.push(i)
  }

  if(+localStorage["currentPage"] > 5 && +localStorage["currentPage"] <= 3){
    pageNumber = [1,2,3,4,5,null,maxPage]
  }
  if(+localStorage["currentPage"] >= 3 && maxPage >= +localStorage["currentPage"] +2){
    pageNumber = [+localStorage["currentPage"] -2,+localStorage["currentPage"] -1,+localStorage["currentPage"],+localStorage["currentPage"] +1,+localStorage["currentPage"] +2,null,maxPage]
  }
  if(+localStorage["currentPage"].length > 5 && +localStorage["currentPage"] === maxPage -2){
    pageNumber = [+localStorage["currentPage"] -2, +localStorage["currentPage"] -1,+localStorage["currentPage"],+localStorage["currentPage"] +1,+localStorage["currentPage"] +2]
  }
  if(+localStorage["currentPage"].length > 5 && +localStorage["currentPage"] >= maxPage -1){
    pageNumber = [maxPage -4,maxPage -3,maxPage -2,maxPage -1,maxPage]
  }


  console.log(currentTasks)
  const ttrs = tasks.map((task, i) => {
    const tds = Object.keys(task).filter(key => (
      [
        "id",
        "issueType",
        "issueKey",
        "summary",
        "createdUser",
        "status",
        "priority",
        "created",
        "startDate",
        "dueDate"
      ].includes(key)
    )).map((td, j) => {
      if(td === "createdUser") {
        return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      }
      if(["issueType", "priority", "status"].includes(td)){
        return Object.keys(task[td]).map((tdd, i) => (
          <td key={`${td}-${tdd}_${i}_${j}`}>{task[td][tdd]}</td>
        ))
      }
      return <td key={`${td}_${i}_${j}`}>{task[td]}</td>
    })
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
    <td key={`pn_td_${i}`} className="tdnum">
      <span className={`main_container__table_pagenum--num ${+localStorage["currentPage"] === v ? 'currentNum' : '' }`}>
        <Link to={`/?p=${v}`} onClick={()=>hundlePagenate(v)}>{v === null ? "..." : v }</Link>
      </span>
    </td>
  ))

  const backtd = 
    <td className="tdbacktext" onClick={1 < +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"] -1) : ()=>{}}><Link to={`/?p=${1 < +localStorage["currentPage"] ? +localStorage["currentPage"] -1 : +localStorage["currentPage"]}`}><span  className="main_container__table_pagenum--text">戻る</span></Link></td>

  const location = useLocation();

  const hundlePagenate = (v) => {
    const cp = v
    localStorage["currentPage"] = cp
    console.log(localStorage["currentPage"])
    const position = getPosition(v)
    const currentT = tasks.slice(position[0], position[1])
    changeCurrentTasks(currentT)
  }

  const changeCurrentTasks = (tasks) => {
    setCurrentTasks([...tasks])
    localStorage["currentTasks"] = JSON.stringify(tasks)
    console.log(JSON.parse(localStorage["currentTasks"]))
  }

  const pagenate = (
    <table className="main_container__table_pagenum">
      <tbody>
        <tr>
          <td className="tdcurrentpagenum">{pageOffarstTask +1}〜{currentTasks.length === tasksPerPage ? pageOflastTask :pageOfmiddle}件</td>
          {numtd}
          {backtd}
          <td onClick={+maxPage > +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"] +1) : ()=>{}}><Link to={`/?p=${+maxPage > +localStorage["currentPage"] ? +localStorage["currentPage"] +1 : +localStorage["currentPage"]}`}><span className="main_container__table_pagenum--text">次へ</span></Link></td>
          <td className="tdnewbtn"><a href="/new"><span className="main_container__table_pagenum--new">新規作成</span></a></td>
        </tr>
      </tbody>
    </table>
  )

  return(
    <div className="main_container">
      {pagenate}
    <table className="main_container__table_tasks">
      <thead>
        <tr>
          {ths}
        </tr>
        {/* {tths} */}
      </thead>
      <tbody>
        {ttrs}
      </tbody>
    </table>
      {pagenate}

    {/* <table>
      <tbody>
      {ttest}
      <tr><td>---------</td></tr>
      {ttrs}
      </tbody>
    </table>
    <table>
      <tbody>
      {tths}
      <tr>
        <td>-------</td>
      </tr>
      </tbody>
    </table> */}
    </div>
  )
}

export default Index