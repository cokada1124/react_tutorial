import React from "react"

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "課題追加"
    }
  }
  
  render() {
    const submitForm = (e) => {
      e.preventDefault();
    }

    return (
      <div>
        <h2>{this.state.title}</h2>
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