import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
     state =  { 
      eventCount: 32,
      errorText: ''
     }

    /* optionChanged = (event, props) => {
      const inputValue = event.target.value;
      if(inputValue < 0 || inputValue > 32 ) {
        this.setState({
          errorText: 'Please select number from 1 to 32'
        })
      } else {
        this.props.updateEvents(null, inputValue);
        this.setState({
          eventCount: inputValue,
          errorText: ''
        })
      }
      } */
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
        this.props.updateEvents(undefined, inputValue);
      };
      //this.setState({eventCount: event.target.value});
    //}

    render() {
        const { eventCount } = this.state;
        return (
          <div className="NumberOfEvents">
            <label>
          Select how many events to show:
          <input
            className="select-number"
            type="number"
            value={this.state.number}
            onChange={this.optionChanged}
            min="1"
          />
        </label>
        <ErrorAlert text={this.state.errorText} />
            {/* <ErrorAlert text={this.state.errorText} />
            <select 
            className="select-number"
            value={this.state.eventCount}
            onChange= { this.optionChanged } 
            
            >
              <option 
              className="option-32"
              value={this.state.eventCount}
              >32</option>
              <option 
              className="option-64"
              value={64}
              >64</option>

              <option 
              className="option-96"
              value={96}
              >96</option>
            </select>
 */}
          </div>
        );
      
      }
}

export default NumberOfEvents;