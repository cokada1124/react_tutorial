import React from "react"

export class Index extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data_: JSON.parse(localStorage["test"]),
      vals: Object.values(JSON.parse(localStorage["test"])),
      vals_: [Object.values(JSON.parse(localStorage["test"])[0])],
      keys: [Object.keys(JSON.parse(localStorage["test"])[0])],

      le: this.props.tasks.length,
      data: this.props.tasks.concat()
    }

    // localstorageデータ
    // state=[{kind: 'タスク', key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}]
    // localStorage["test"]=JSON.stringify(state)

  }
  render(){
    // return null
    // const {tasks} = this.props.tasks;
    const test = [];
    const local = (() => {
      try{
        return JSON.parse(localStorage["test"])
      }catch(e) {return null }
    })()



    return(
      
      <div>
        {console.log(this.props.tasks[0])}
      <table className="fl-right">
        <tbody>
        <tr>
          <th>種別</th>
          <th>キー</th>
          <th>件名</th>
          <th>担当者</th>
          <th>状態</th>
          <th>優先度</th>
          <th>登録者</th>
          <th>開始日</th>
          <th>期限日</th>
          {/* {console.log(this.state.vals[0])}
          {console.log(this.state.vals_)}
          {console.log(this.state.keys[0])} */}
          {/* {JSON.stringify(this.state.data)} */}
          

        </tr>
          {/* {this.state.a.map((key, i) => {
            return(
              {this:key.map((keys, j) =>
                <td key={j}>{keys}</td>
                )}
          <td key={i}>
         {key.namne}</td>
            )
          }
         )} */}

         {/* データを一つづつ表示 dateの要素が2つになると動かない状態です */}
          {/* <tr>
          {this.props.tasks.map((key, i) =>
          <td key={i}>{key.kind}</td>
          )}

          {this.state.data.map((key, i) =>
          <td key={i}>{key.key}</td>
          )}

          {this.state.data.map((key, i) =>
          <td key={i}>{key.task_name}</td>
          )}

          {this.state.data.map((key, i) =>
          <td key={i}>{key.manager}</td>
          )}
          {this.state.data.map((key, i) =>
          <td key={i}>{key.state}</td>
          )}
          {this.state.data.map((key, i) =>
          <td key={i}>{key.primary}</td>
          )}
          {this.state.data.map((key, i) =>
            <td key={i}>{key.registration_date}</td>
          )}
          {this.state.data.map((key, i) =>
          <td key={i}>{key.start_date}</td>
          )}
          {this.state.data.map((key, i) =>
          <td key={i}>{key.deadline_date}</td>
          )}
        </tr> */}
        {
          
        }
        {/* {
            Array(this.state.le).fill("0").map((test,i) => {
                return (
                      <tr key ={i}>
                      {
                          this.state.data.map((test2, j)=>{
                            return(

                              this.state.keys.map((test3, k)=>{
                                return(
                                  <td key={k}>
                                  {test2.test3}</td>
                                  );
                              })
                            );
                          })
                      }
                      </tr>
                );
            })
      } */}
      
      {     // 下記詰まっている内容になります。
            // this.state.valsをthis.state.vals[i]として要素分回したいのですが、エラーとなる。
            // {val}が<td></td>の中に全て入ってしまう。
            // let tasks = this.props.tasks;
            

            // Array(this.state.le).fill("0").map((test,i) => {
            //     return (
            //           <tr key ={i}>
            //           {
                        
            //               this.props.tasks.map((val, j)=>{
            //                 return(
            //                       <td key={j}>
                                    
            //                       {val}
                                    
            //                       </td>
            //                 );
            //               })
            //           }
            //           </tr>
            //     );
            // })
      }
        </tbody>
      </table>

      

            {/* {
                Array(3).fill('test').map((val, i) => {
                    return (
                        Array(3).fill(0).map((val2, j) => {
                            return (
                                <div>
                                    {i}, {j}
                                </div>
                            );
                        })
                    );
                })
            } */}
            {JSON.stringify(this.props.tasks)}
            {/* console.log({this.props.tasks}); */}
      </div>
      
      
    )
  }
}
// {kind: 'タスク', key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}
// JSON.parse(localStorage["this_test"])

// for (var i = 0, length = localStorage.length; i < length; ++i) {
//   console.log(localStorage.key(i));
// }

// {arr.map((fruit, i) => <li key={i}>{fruit}</li>)}

// [{"namne":"hoge","kind":"task"}]

// Object.keys(state[0])[0]