import React from "react"

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "課題追加"
    }
  }
  
  // const changeTitle = () => {
  //   this.setState({
  //     title: '課題編集',
  //   });
  // }

  
  
  changetitle() {
    this.setState({
      title: "test",
    });
  }


  render() {
    const submitForm = (e) => {
      e.preventDefault();
    }

    console.log(this.props.kind)

    // const changeTitle = () => {
    //   this.setState({
    //     title: "課題編集"
    //   });
    // }

    

    return (
      
      <div className="main_container fl-right m-top-5">
        <h2>{this.props.kind==="edit" ? "課題編集" : "課題追加" }</h2>
        <form onSubmit={submitForm}>
          <label>タイトル</label>
          <input type="text" id="title" name="title" />
        
          <div><button onClick={() => this.props.onClickAddTasks()}>
            追加
          </button>
          </div>
        </form>
        <button onClick={() => this.changeTitle()}>
          変更
        </button>
        {this.state.title}
      </div>
    )
  }
}

export default Form