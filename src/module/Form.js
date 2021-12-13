import React from 'react';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      title: "課題追加"
    }
  }
  render(){
    return(
      <div>
      <h2>{this.state.title}</h2>
      <form>
        <label for="title">タイトル</label>
      <input type="text" id="title" name="title" />
      
      <div><button>
        追加
      </button></div>
      </form>
      </div>
    )
  }
}

export default Form;