import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Tabs from './src';
import { CityItem } from './src/Cities/City';

interface AppState {
  cities: Array<CityItem>;
}
console.log('APP');
export default class App extends Component<{}, AppState> {
  state: AppState = {
    cities: []
  }
  addCity = (city: CityItem) => {
    console.log('add city: ', city)
    const cities = this.state.cities
    cities.push(city)
    this.setState({ cities })
  }
  addLocation = (location: string, city: CityItem) => {
    const index = this.state.cities.findIndex(item => {
      return item.id === city.id
    })
    const chosenCity = this.state.cities[index]
    chosenCity.locations.push(location)
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ]
    this.setState({
      cities
    })
  }
  render() {
    console.log('cities: ', this.state.cities);
    return (
      <Tabs
        cities={this.state.cities}
        addCity={this.addCity}
        addLocation={this.addLocation}
      />
    )
  }
}