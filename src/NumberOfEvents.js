import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
     state =  { 
      eventCount: 32,
      errorText: ''
     }

    
      optionChanged = (event, props) => {
        const inputValue = event.target.value;
        if (inputValue > 32 || inputValue < 0)
          this.setState({
            number: inputValue,
            errorText: "only values from 1 - 32 can be specified.",
          });
        else {
        this.setState({
          eventCount: inputValue,
          errorText: ''
          });
        }
        this.props.updateEvents(undefined, parseInt(inputValue));
      }; 
    

    render() {
        const { eventCount } = this.state;
        return (
          <div className="NumberOfEvents">
            <label>
          Select how many events to show:
          <input
            className="select-number"
            type="number"
            value={this.state.eventCount}
            onChange={this.optionChanged}
            min="1"
            max="32"
            step="1"
          />
        </label>
        <ErrorAlert text={this.state.errorText} />
            
          </div>
        );
      
      }
}

export default NumberOfEvents;