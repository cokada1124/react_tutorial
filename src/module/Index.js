import React, { useState, useRef, useEffect}  from "react"
import { useParams, Link, useLocation, useSearchParams, useNavigate, useMatch } from "react-router-dom"

const Index = (props) => {
  const { id } = useParams()

  const tasksPerPage = 5
  const [ tasks, setState ] = useState([])
  /** !!!!!!!!!!!!!!!!!!!!!
   * sortはtasksSort()で直接fetchするようにしたので、再レンダーはsetStateで十分
   */
  // const [ sortState, setSortState ] = useState(true)
  
  const currentSortKey = useRef("")
  /** !!!!!!!!!!!!!!!!!!!
   * currentOrderと意味が被ってたので削除
   */
  // const currentSortVector = useRef(true)
  const tasksCount = useRef(0)

  const [search] = useSearchParams()
  const search_p = search.get("p") || 1
  const currentPage = useRef(search_p)

  const currentOrder = useRef("")

  /** !!!!!!!!!!!!!!!!!!!!
   * 初期値が正しくセットされてなかったので。
   * あとcurrentOffset使う意味がなかったので削除。
   */
  // const [ offSet, setOffset] = useState(currentPage)
  // const currentOffset = useRef(0)
  const [ offSet, setOffset] = useState((currentPage.current - 1) * tasksPerPage)


  // if(search_p === 1) {
  //   currentPage.current = search_p
  // }

  /** !!!!!!!!!!!!!!!!!!
   * URLは統一しておかないと、ソートした状態でページ切り替えたらソートが解除されませんか？
   */
  // const pagenateFetchURL = () => {
  //   return `https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367&count=${tasksPerPage}&offset=${offSet}`
  // }

  // const makeSortFetchURL = () =>{
  //   return `https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367&sort=${currentSortKey.current}&order=${currentOrder.current}&count=${tasksPerPage}&offset=${offSet}`
  // }

  const makeFetchURL = () =>{
    const sort = currentSortKey.current ? `&sort=${currentSortKey.current}` : ""
    const order = currentOrder.current ? `&order=${currentOrder.current}` : ""
    return `https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367${sort}${order}&count=${tasksPerPage}&offset=${offSet}`
  }

  useEffect(() => {
    const get_tasks = () => {
      return fetch(makeFetchURL(), {
        method: "GET"
      }).then(res => res.json())
    }
    const get_count = () => {
      return fetch("https://2012.backlog.jp/api/v2/issues/count?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367", {
        method: "GET"
      }).then(res => res.json())
    }
    Promise.all([get_tasks(), get_count()])
    .then(res => {
      // console.log(res)
      tasksCount.current = res[1]
      setState(res[0])
    })
    

  }, [offSet])


  /** !!!!!!!!!!!!!!!!!!!!
   * こっちもuseEffectしてたら↑のuseEffectの後にこっちも実行されませんか？
   * せっかくURLに?p=3とかつけて初期表示を３ページ目にしていても
   * 二度目のuseEffectで０〜５件目表示で上書きされますよね。
   * ソートは表頭を押した時だけで良いので、tasksSortに含めてしまいましょう。
   */
  //  useEffect(() => {
  //   fetch(makeSortFetchURL(), {
  //       method: "GET"
  //     })
  //     .then(res => res.json())
  //     .then(js => {setState(js)})
  // }, [sortState])
  
  const nav = useNavigate()
  const getPosition = (page) => [(page * tasksPerPage) - tasksPerPage, page * tasksPerPage]
  const position = getPosition(currentPage.current)
  // console.log(tasks)
  const [ currentTasks , setCurrentTasks ] = useState(tasks.slice(position[0], position[1]))


  const ths = Object.keys(props.keys).map((key, i) => {
    const sortVector = (() => {
      /** !!!!!!!!!!!!!
       * currentSortKey.current === (key || `${key}.name`)
       * という書き方は意図通り動いてますか？
       * (key || `${key}.name`)
       * は、
       * 　keyがtruthyならkeyと比較
       * 　keyがfalsyなら`${key}.name`と比較
       * という動きになります。
       * props.keysは絶対にtrucyなので`${key}.name`との比較が発動することはないように見えます。
       * 
       */
      if(currentSortKey.current === (key)) {
        return currentOrder.current === "asc" ? "▲" : "▼"
      }
      return ""
    })()
    /** !!!!!!!!!!!!!!!!!!!!!!
     * なぜか<Link>があったんですが、不要ですよね？？
     * 単に文字色を変えるためなら
     * .main_container__table_tasks > th
     * にcolorをつければ良いと思います。
     */
    return (
      <th key={ `th_${i}` } onClick={ () => tasksSort(key) }>
          { props.keys[key] + sortVector }
      </th>
    )
  })



  const tasksSort = async (key) => {
    /** !!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * `${key}.name`の条件は必要なのでしょうか？
     * https://developer.nulab.com/ja/docs/backlog/api/2/get-issue-list/#%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%83%BC
     * を見るとsortに指定できる文字列で「〜.name」というものはありませんでした。
     * 
     * あとconst thsのところでも書いたのですが、
     * 　=== (A || B || C || ...)
     * というのは意図通り動いていますか？
     * この書き方では、まずAがtrucyか判定しtrucyならAを比較、falsyならBを判定し、、、
     * という風に左にある選択肢がtrucyならそこで比較されてしまうものです。
     * 
     * "createUser"はtrucyなので、毎回必ずkey === "createUser"が採用されます。
     */
    // if(key === ("createUser" || "issueType" || "priority" || "status")){
    //   currentSortKey.current = `${key}.name`
    // }else {
    currentSortKey.current = key
    // }

    /** !!!!!!!!!
     * currentSortVectorとcurrentOrderが全く同じ意味のようなので、
     * こちらを削ります。
     */
    // currentSortVector.current = sortState

    /** !!!!!!!!!!!!
     * ２値反転なら三項演算子の方がシンプルに書けます。
     */
    // if (currentOrder.current === "asc" ){
    //   currentOrder.current = "desc"
    // }else if(currentOrder.current === "desc"){
    //   currentOrder.current = "asc"
    // }
    currentOrder.current = currentOrder.current === "asc" ? "desc" : "asc"

    const res = await fetch(makeFetchURL(), {method: "GET"})
    const js = await res.json()
    setState(js)
  }
　


  const pageOflastTask = +currentPage.current * tasksPerPage 
  const pageOffarstTask = pageOflastTask - tasksPerPage 
  const pageOfmiddle = currentTasks.length + pageOffarstTask
  const maxPage = Math.ceil(tasksCount.current.count / tasksPerPage)


  let pageNumber = [];

  for(let i = 1; i <= Math.ceil(tasksCount.current.count / tasksPerPage); i++){
    pageNumber.push(i)
  }

  if(maxPage > 5 && +currentPage.current <= 3){
    pageNumber = [1,2,3,4,5,null,maxPage]
  }
  if(+currentPage.current >= 3 && maxPage >= +currentPage.current +2){
    pageNumber = [+currentPage.current -2,+currentPage.current -1,+currentPage.current,+currentPage.current +1,+currentPage.current +2,null,maxPage]
  }
  if(+currentPage.current > 5 && +currentPage.current === maxPage -2){
    pageNumber = [+currentPage.current -2, +currentPage.current -1,+currentPage.current,+currentPage.current +1,+currentPage.current +2]
  }
  if(+currentPage.current > 5 && +currentPage.current >= maxPage -1){
    pageNumber = [maxPage -4,maxPage -3,maxPage -2,maxPage -1,maxPage]
  }


  const ttrs = tasks.map((task, i) => {
    /** !!!!!!!!!!!!!!!!!!!
     * props.keysで表示する列を絞り込むようにしたんですよね。
     * なのでここでもそれを使えば良いように思いました。
     */
    // const tds = Object.keys(task).filter(key => (
    //   [
    //     "issueType",
    //     "issueKey",
    //     "summary",
    //     "createdUser",
    //     "status",
    //     "priority",
    //     "created",
    //     "startDate",
    //     "dueDate"
    //   ].includes(key)
    // )).map((td, j) => {
    const tds = Object.keys(props.keys).map((td, j) => {
      /** !!!!!!!!!!!!!!!!!!!
       * 返却値が同じなのにelse ifが重複しているのは冗長なので、
       * ["name"]したいカラム名を配列で定義しincludesで三項演算子にかけました。
       */
      const name_keys = ["issueType", "createdUser", "status", "priority"]
      const val = name_keys.includes(td) ? task[td]["name"] : task[td]
      return <td key={`${td}_${i}_${j}`}>{val}</td>
      // if(td === "issueType") {
      //   return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      // }else if(td === "createdUser") {
      //   return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      // }else if(td === "status") {
      //   return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      // }else if(td === "priority") {
      //   return <td key={`${td}_${i}_${j}`}>{task[td]["name"]}</td>
      // }
      // return <td key={`${td}_${i}_${j}`}>{task[td]}</td>
    })
    const toEdit = (id) => {
          // location.href = "/" + id
          nav("/" + id)
    
    }
    // console.log(tds)

    return (
      <tr key={`tr_${i}`} onClick={()=>toEdit(task.id)}>
        {tds}
      </tr>
    )
  })

  const numTd = pageNumber.map((v,i) => (
    <td key={`pn_td_${i}`} className="tdnum">
      <span className={`main_container__table_pagenum--num ${+currentPage.current === v ? 'currentNum' : '' }`}>
        <Link to={`/?p=${v}`} onClick={()=>hundlePagenate(v)}>{v === null ? "..." : v }</Link>
      </span>
    </td>
  ))

  const backTd = 
    <td className="tdbacktext" onClick={1 < +currentPage.current ? ()=>hundlePagenate(+currentPage.current -1) : ()=>{}}><Link to={`/?p=${1 < +currentPage.current ? +currentPage.current -1 : +currentPage.current}`}><span  className="main_container__table_pagenum--text">戻る</span></Link></td>

  const nextTd =
    <td onClick={+maxPage > +currentPage.current ? ()=>hundlePagenate(+currentPage.current +1) : ()=>{}}><Link to={`/?p=${+maxPage > +currentPage.current ? +currentPage.current +1 : +currentPage.current}`}><span className="main_container__table_pagenum--text">次へ</span></Link></td>

  const hundlePagenate = (v) => {
    /** !!!!!!!!!!!!!!!!!!
     * localStorageにcurrentPage入れる必要ないですよね・・・・・・・
     * しかもhundlePagenateでしかセットされてないので、URLの「?p=X」を変更しても
     * localStorageに反映されずページ番号が間違った表示になってしまってました。
     * 
     * currentPage.currentを全体で参照するのと何が違うんでしょうか？
     * 
     * あとconst cp = vの意味がわかりませんでした。
     */
    // const cp = v
    // localStorage["currentPage"] = cp
    currentPage.current = v
    setOffset((currentPage.current - 1) * tasksPerPage)
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