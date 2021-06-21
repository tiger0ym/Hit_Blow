import React from 'react';

class StartButton extends React.Component {
    

    render() {
      return (
        <div>
            <button disabled={this.props.disabled} onClick={()=>this.props.clickButton()} >START</button>
        </div>
      );
    }
  }
 export default StartButton;