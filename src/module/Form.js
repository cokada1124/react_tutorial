import React from "react"

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "課題追加"
    }
  }
  
  changeTitle(text) {
    this.setState({
      title: text
    });
    return this.state.title;
  }

  
  
  


  render() {
    const submitForm = (e) => {
      e.preventDefault();
    }

    console.log(this.props.kind)

    

    return (
      
      <div className="main_container fl-right m-top-5">
        <h2>{this.props.kind==="edit" ? this.changeTitle("課題編集") :this.state.title}</h2>
        <form onSubmit={submitForm}>
          <label>タイトル</label>
          <input type="text" id="title" name="title" />
        
          <div><button onClick={() => this.props.onClickAddTasks()}>
            追加
          </button></div>
        </form>
      </div>
    )
  }
}

export default Form