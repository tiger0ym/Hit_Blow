import React from 'react';

class ResetButton extends React.Component {
    render() {
      return (
        <div>
            <button disabled={this.props.disabled} onClick={()=>{this.props.clickButton()}} >RESET</button>
        </div>
      );
    }
  }

  export default ResetButton;