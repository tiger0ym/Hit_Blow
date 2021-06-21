import React from 'react';
import StartButton from './start';
import ResetButton from './reset';
import Log from './log';
import './index.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ans:[],
      inputLog:[],
      playing:false,
      NotNumError:false,
      LengrhError:false,
      canSubmit:false,
      InputNum:'',
      SubmitNum:'',
      digit:'4',
      correct:false,
      end:false,
    };
  }

  
  /*リロードしてもstateがリセットされないようにlocalstorageを用いる　https://nari19.me/190711/
  初回のみ実行*/
  componentDidMount(){
    if(localStorage.app){
      const saveDate = JSON.parse(localStorage.app);
      this.setState({
        ans: saveDate.ans,
        playing: saveDate.playing,
      })
    }
  }

  /*stateが変更されたら実行*/
  componentDidUpdate(){
    localStorage.setItem('app',JSON.stringify(this.state));
  }
  

  generateNumber(){
    var answer = [];
    for(let i=0;i<this.state.digit;i++){
      answer.push(Math.floor(Math.random() * (10)));
    }
    this.setState({
      ans:answer,
      playing:true,
    });
  }

  resetNumber(){
    this.setState({
      ans:[],
      inputLog:[],
      playing:false,
      InputNum:'',
      canSubmit:false,
      end:false,
      correct:false,
    });
  }

  handleDigitChange(event){
    this.setState({digit:event.target.value});
  }

  handInputChange(event){
    const inputValue = event.target.value;
    const inputValueNum = inputValue-0;
    this.setState({InputNum:inputValue});
    if(isNaN(inputValueNum) === true){
      this.setState({
        NotNumError:true,
        canSubmit:false,
      });
    }else if(inputValue === ''){
      this.setState({
        NotNumError:false,
        LengrhError:false,
        canSubmit:false,
      });
    }else if(String(inputValue).length !== Number(this.state.digit)){
      this.setState({
        NotNumError:false,
        LengrhError:true,
        canSubmit:false,
      });
    }else{
      this.setState({
        NotNumError:false,
        LengrhError:false,
        canSubmit:true,
        SubmitNum:inputValue,
      });
    }
  }

  handleSubmit(event){
    event.preventDefault();
    let hit=0;
    let blow=0;
    for(let i=0;i<this.state.SubmitNum.length;i++){
      if(this.state.SubmitNum[i] === String(this.state.ans[i])){
        hit+=1;
      }
    }
    
    for(let i=0;i<this.state.SubmitNum.length;i++){
      for(let j=0;j<this.state.SubmitNum.length;j++){
        if((this.state.SubmitNum[j] === String(this.state.ans[i])) & (this.state.SubmitNum[i] !== String(this.state.ans[i])) & (this.state.SubmitNum[j] !== String(this.state.ans[j]))){
          blow+=1;
          break;
        }
      }
    }
    this.setState({
      inputLog:this.state.inputLog.concat({number:this.state.SubmitNum,hit:hit,blow:blow}),
      InputNum:'',
    });

    if(hit === Number(this.state.digit)){
      this.setState({
        correct:true,
        canSubmit:false,
        end:true,
      });
    }
  }

  render() {
    let NumErrorText;
      if(this.state.NotNumError){
        NumErrorText=(
          <p className="errormessage">input a <strong>number</strong></p>
        );
      }else if(this.state.LengrhError){
        NumErrorText=(
          <p className="errormessage">input a <strong>{this.state.digit}-digit</strong> number</p>
        );
      }else{
        NumErrorText=(<p className="errormessage">&nbsp;</p>);
      }

      let correctText;
      if(this.state.correct){
        correctText=(
          <p className="correctmessage">Got it! The correct answer is <span><strong>{this.state.ans}</strong></span>.</p>
        );
      }else{
        correctText=(<p className="correctmessage">&nbsp;</p>);
      }


    return (
      <div>
        <h1>Hit & Blow</h1>
        <div className="digitinput">
          <select value={this.state.digit} onChange={(event)=>{this.handleDigitChange(event)}} disabled={this.state.playing} className="inputselect">
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
          <p className="inputselect2">digits</p>
        </div>
        <div className="buttons">
          <StartButton disabled={this.state.playing} clickButton={()=>this.generateNumber()} />
          <ResetButton disabled={!this.state.playing} clickButton={()=>this.resetNumber()} />
        </div>
        <div className="input_area">
            <form onSubmit={(event)=>{this.handleSubmit(event)}}>
              <input
                value={this.state.InputNum}
                onChange={(event)=>{this.handInputChange(event)}}
                disabled={!this.state.playing || this.state.end}
              />
              <button disabled={!this.state.canSubmit}>CALL</button>
            </form>
          {NumErrorText}
        </div>
        <div className="logtitle">
            <p>Times</p>
            <p>Number</p>
            <p>Hit</p>
            <p>Blow</p>
        </div>
        { this.state.inputLog.map((inputItem) => {
              return (
                <Log
                  times={this.state.inputLog.findIndex(ele => ele === inputItem)+1}
                  number={inputItem.number}
                  hit={inputItem.hit}
                  blow={inputItem.blow}
                />
              );
        }) }
        {correctText}
      </div>
    );
  }
}

export default Main;
