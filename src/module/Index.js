import React, { useState, useRef, useEffect}  from "react"
import { useParams, Link, useLocation, useSearchParams, useNavigate, useMatch } from "react-router-dom"

const Index = (props) => {
  const { id } = useParams()

  const tasksPerPage = 5
  const [ tasks, setState ] = useState([])
  const [ sortState, setSortState ] = useState(true)
  
  const currentSortKey = useRef("")
  const currentSortVector = useRef(true)
  const tasksCount = useRef(0)

  const [search] = useSearchParams()
  const search_p = search.get("p") || 1
  const currentPage = useRef(search_p)

  const currentOrder = useRef("asc")

  const [ offSet, setOffset] = useState(currentPage)
  const currentOffset = useRef(0)


  if(search_p === 1) {
    localStorage["currentPage"] = search_p
  }

  const pagenateFetchURL = () => {
    return `https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367&count=${tasksPerPage}&offset=${currentOffset.current}`
  }

  const makeSortFetchURL = () =>{
    return `https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367&sort=${currentSortKey.current}&order=${currentOrder.current}&count=${tasksPerPage}`
  }

  useEffect(() => {

    const get_tasks = () => {
      return fetch(pagenateFetchURL(), {
        method: "GET"
      }).then(res => res.json()).then(js => {console.log(js);return js})
    }
    const get_count = () => {
      return fetch("https://2012.backlog.jp/api/v2/issues/count?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367", {
        method: "GET"
      }).then(res => res.json()).then(js => {console.log(js);return js})
    }
    Promise.all([get_tasks(), get_count()])
    .then(res => {
      console.log(res)
      tasksCount.current = res[1]
      setState(res[0])
    })
    

  }, [offSet])


  useEffect(() => {

    fetch(makeSortFetchURL(), {
        method: "GET"
      })
      .then(res => res.json())
      .then(js => {setState(js)})
  }, [sortState])
  // console.log(ppp.current)
  /** ? 質問
   * 課題取得後にcountとoffsetを使ってページング するとなっていましたが、
   * countとoffsetとはメソッドのことでしょうか？
   * またはlengthを使ってcountする考え方ということでしょうか？
   * イメージが付けられておらず、伺えれば幸いです。
   */
  /** !
   * 既に回答済みですが、countとoffsetはbacklog apiの課題一覧取得時のクエリパラメタです。
   * offsetが「●件目から取得」という取得開始位置で、countが件数です。
   */

    /* 
  * useEffectは、第一引数にcallbackを入れて、第二引数に依存する値の配列を入れる
  * 依存する値が変更される度にcallbackが実行される
  */

    console.log(tasks)
  
  
  const nav = useNavigate()
  const getPosition = (page) => [(page * tasksPerPage) - tasksPerPage, page * tasksPerPage]
  const position = getPosition(currentPage.current)
  console.log(tasks)
  const [ currentTasks , setCurrentTasks ] = useState(tasks.slice(position[0], position[1]))


  const ths = Object.keys(props.keys).map((key, i) => {
    const sortVector = (() => {
      if(currentSortKey.current === (key || `${key}.name`)) {
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

  
  // const tths = tasks.map((task, i) => {
  //  const ttths = Object.keys(task).filter(key => (
  //       [
  //         "id",
  //         "issueType",
  //         "issueKey",
  //         "summary",
  //         "createdUser",
  //         "status",
  //         "priority",
  //         "created",
  //         "startDate",
  //         "dueDate",
  //       ].includes(key)
  //     )).map((kkey,j) => {
  //       const sortVector = (() => {
  //         if(currentSortKey.current === kkey) {
  //           return currentSortVector.current ? "▼" : "▲"
  //         }
  //         return ""
  //       })()

  //       if(kkey === "createdUser"){
  //         return <th key={`${kkey}_${i}_${j}`} onClick={()=>tasksSort(kkey)}>
  //           <Link to={`/`}>{props.keys[kkey] + sortVector}</Link>
  //         </th>
  //       }
  //       if(["issueType", "priority", "status"].includes(kkey)){
  //         return Object.keys(task[kkey]).map((tdd, i) => (
  //           <th key={`${kkey}-${tdd}_${i}_${j}`} onClick={()=>tasksSort(kkey)}>
  //           <Link to={`/`}>{`${kkey}_${tdd}` + sortVector}</Link>
  //           </th>
  //         ))
  //       }
  //       return <th key={`${kkey}_${i}_${j}`} onClick={()=>tasksSort(kkey)}><Link to={`/`}>{`${kkey}` + sortVector}</Link></th>
  //     })

  //     return (
  //       <tr key={`tr_${i}`}>
  //         {ttths}
  //       </tr>
  //     )
  // })



  const tasksSort = (key) => {
    if(key === ("createUser" || "issueType" || "priority" || "status")){
      currentSortKey.current = `${key}.name`
    }else {
    currentSortKey.current = key
    }
    currentSortVector.current = sortState

    if (currentOrder.current === "asc" ){
      currentOrder.current = "desc"
    }else if(currentOrder.current === "desc"){
      currentOrder.current = "asc"
    }

    setSortState(!sortState)

    // console.log(makeSortFetchURL(key))
    // if(sortstate){
    //   const desctasks = tasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
      
    //   setSortState(!sortstate)
    //   setState([...desctasks])
    // }else{
    //   const asctasks = tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    //   setSortState(!sortstate)
    //   setState([...asctasks])
    // }
    // const currentT = tasks.slice(position[0], position[1])
    // changeCurrentTasks(currentT)
    // localStorage["currentPage"] = 1
    // location.href = `/?p=1`
  }



  const pageOflastTask = +localStorage["currentPage"] * tasksPerPage 
  const pageOffarstTask = pageOflastTask - tasksPerPage 
  const pageOfmiddle = currentTasks.length + pageOffarstTask
  const maxPage = Math.ceil(tasksCount.current.count / tasksPerPage)


  let pageNumber = [];

  for(let i = 1; i <= Math.ceil(tasksCount.current.count / tasksPerPage); i++){
    pageNumber.push(i)
  }

  if(maxPage > 5 && +localStorage["currentPage"] <= 3){
    pageNumber = [1,2,3,4,5,null,maxPage]
  }
  if(+localStorage["currentPage"] >= 3 && maxPage >= +localStorage["currentPage"] +2){
    pageNumber = [+localStorage["currentPage"] -2,+localStorage["currentPage"] -1,+localStorage["currentPage"],+localStorage["currentPage"] +1,+localStorage["currentPage"] +2,null,maxPage]
  }
  if(+localStorage["currentPage"] > 5 && +localStorage["currentPage"] === maxPage -2){
    pageNumber = [+localStorage["currentPage"] -2, +localStorage["currentPage"] -1,+localStorage["currentPage"],+localStorage["currentPage"] +1,+localStorage["currentPage"] +2]
  }
  if(+localStorage["currentPage"] > 5 && +localStorage["currentPage"] >= maxPage -1){
    pageNumber = [maxPage -4,maxPage -3,maxPage -2,maxPage -1,maxPage]
  }


  const ttrs = tasks.map((task, i) => {
    const tds = Object.keys(task).filter(key => (
      [
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
      if(td === "issueType") {
        return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      }else if(td === "createdUser") {
        return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      }else if(td === "status") {
        return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      }else if(td === "priority") {
        return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      }
      // if(["createdUser","issueType", "priority", "status"].includes(td)){
      //   return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      // }
      return <td key={`${td}_${i}_${j}`}>{task[td]}</td>
    })
    const toEdit = (id) => {
          // location.href = "/" + id
          nav("/" + id)
    
    }
    console.log(tds)

    return (
      <tr key={`tr_${i}`} onClick={()=>toEdit(task.id)}>
        {tds}
      </tr>
    )
  })

  const numTd = pageNumber.map((v,i) => (
    <td key={`pn_td_${i}`} className="tdnum">
      <span className={`main_container__table_pagenum--num ${+localStorage["currentPage"] === v ? 'currentNum' : '' }`}>
        <Link to={`/?p=${v}`} onClick={()=>hundlePagenate(v)}>{v === null ? "..." : v }</Link>
      </span>
    </td>
  ))

  const backTd = 
    <td className="tdbacktext" onClick={1 < +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"] -1) : ()=>{}}><Link to={`/?p=${1 < +localStorage["currentPage"] ? +localStorage["currentPage"] -1 : +localStorage["currentPage"]}`}><span  className="main_container__table_pagenum--text">戻る</span></Link></td>

  const nextTd =
    <td onClick={+maxPage > +localStorage["currentPage"] ? ()=>hundlePagenate(+localStorage["currentPage"] +1) : ()=>{}}><Link to={`/?p=${+maxPage > +localStorage["currentPage"] ? +localStorage["currentPage"] +1 : +localStorage["currentPage"]}`}><span className="main_container__table_pagenum--text">次へ</span></Link></td>

  const hundlePagenate = (v) => {
    const cp = v
    localStorage["currentPage"] = cp
    currentPage.current = v
    currentOffset.current = tasksPerPage * currentPage.current
    setOffset(currentOffset.current)
  }

    // const location = useLocation();

  const changeCurrentTasks = (tasks) => {
    setCurrentTasks([...tasks])
    localStorage["currentTasks"] = JSON.stringify(tasks)
  }

  const pagenate = (
    <table className="main_container__table_pagenum">
      <tbody>
        <tr>
          <td className="tdcurrentpagenum">{pageOffarstTask +1}〜{currentTasks.length === tasksPerPage ? pageOflastTask :pageOfmiddle}件</td>
          {numTd}
          {backTd}
          {nextTd}
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
      </thead>
      <tbody>
        {ttrs}
      </tbody>
    </table>
      {pagenate}
    </div>
  )
}

export default Index