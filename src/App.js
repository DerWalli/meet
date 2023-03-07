import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';

import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32
  }

  updateEvents = (location, numberOfEvents) => {
    numberOfEvents = numberOfEvents || this.state.numberOfEvents;
    location = location || this.state.selectedLocation;

    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events.slice(0, numberOfEvents) :
        events.filter((event) => event.location === location).slice(0, numberOfEvents);

      console.log("LocEvts", locationEvents)
      this.setState({
        events: locationEvents,
        selectedLocation: location,
        numberOfEvents: numberOfEvents
      });
    });
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }
  
  render() {

    const warningMessage = navigator.onLine
      ? ""
      : "App is running in Offline-Mode";

    return (
      <div className="App">
        <WarningAlert text={warningMessage} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
        <ResponsiveContainer height={400} >
          <ScatterChart
          
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
           >
            <CartesianGrid />
           <XAxis type="category" dataKey="city" name="city" />
           <YAxis type="number" dataKey="number" name="number of events" />
           <Tooltip cursor={{ strokeDasharray: '3 3' }} />
           <Scatter data={this.getData()} fill="#8884d8" />
         </ScatterChart>
        </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
        
      </div>
    );
  }
}



export default App;