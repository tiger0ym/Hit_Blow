import React from 'react';

const digit = 4;

class InputArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InputNum:'',
      NotNumError:false,
      LengrhError:false,
      canSubmit:false,
    };
  }

  

  handleInputChange(event){
    const inputValue = event.target.value;
    const inputValueNum = inputValue-0;
    this.setState({InputNum:inputValue});
    if(isNaN(inputValueNum) === true){
      //alert(typeof(inputValueNum));
      this.setState({NotNumError:true});
      this.setState({canSubmit:false});
    }else if(String(inputValueNum).length !== digit){
      //alert(typeof(inputValueNum));
      this.setState({NotNumError:false});
      this.setState({LengrhError:true});
      this.setState({canSubmit:false});
    }else{
      this.setState({NotNumError:false});
      this.setState({LengrhError:false});
      this.setState({canSubmit:true});
    }
  }

  /*
  handleSubmit(event){
    
  }
  */

    render() {
      let NumErrorText;
      if(this.state.NotNumError){
        NumErrorText=(
          <p className="errormessage">input a <strong>number</strong></p>
        )
      }else if(this.state.LengrhError){
        NumErrorText=(
          <p className="errormessage">input a <strong>four-digit</strong> number</p>
        )
      }else{
        NumErrorText=(<p>&nbsp;</p>)
      }

      return (
        <div>
          {/* <form onSubmit={(event)=>{this.handleSubmit(event)}} > */}
          <form onSubmit={this.props.onSubmit}>
            <input
            value={this.state.InputNum}
            onChange={(event)=>{this.handleInputChange(event)}}
            disabled={this.props.disabled}
            />
            <button disabled={!this.state.canSubmit}>CALL</button>
            {NumErrorText}
          </form>
          {/* <a>{this.props.ansNumber}</a> */}
        </div>
      );
    }
  }

  export default InputArea;