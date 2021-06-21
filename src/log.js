import React from 'react';

class Log extends React.Component {
    render() {
      return (
        <div className="logrow">
            <p>{this.props.times}</p>
            <p>{this.props.number}</p>
            <p>{this.props.hit}</p>
            <p>{this.props.blow}</p>
        </div>
      );
    }
  }

  export default Log;