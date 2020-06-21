import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { colors } from '../styles/theme';
import { CityItem } from '../Cities/City';

interface AddCityState {
  city?:    string;
  country?: string;
}

interface AddCityProps {
  route: {params: {addCity: (city: CityItem) => void, cities: Array<CityItem>}};
  navigation: {navigate: (name: string, params: {screen: string, params: {cities: Array<CityItem>}}) => void};
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

export default class AddCity extends React.Component<AddCityProps, AddCityState> {
  state: AddCityState = {    
    city   : '',
    country: '',
  };

  onChangeText = <Key extends keyof AddCityState>(key: Key, value: AddCityState[Key]) => {    
    const newState: AddCityState = { [key]: value };
    this.setState(newState);
  };

  submit = () => {    
    if (this.state.city === '' || this.state.country === '') {
      alert('please complete form')
    }
    console.log('submit');
    const city: CityItem = {
      name     : this.state.city!,
      country  : this.state.country!,
      id       : guid(),
      locations: []
    }
    this.props.route.params.addCity(city);
    this.setState({
      city   : '',
      country: ''
    }, () => {
      console.log('this.props.navigation.navigate');
      this.props.navigation.navigate(
        'Cities',
        {
          screen: 'Cities',
          params: {cities: this.props.route.params.cities}
        })
    })
  }
  render() {
    console.log('Add city', this.props.route);
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.heading}>Cities</Text>
        <TextInput
          placeholder='City name'
          onChangeText={val => this.onChangeText('city', val)}
          style={this.styles.input}
          value={this.state.city}
        />
        <TextInput
          placeholder='Country name'
          onChangeText={val => this.onChangeText('country', val)}
          style={this.styles.input}
          value={this.state.country}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={this.styles.button}>
            <Text style={this.styles.buttonText}>Add City</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  styles = StyleSheet.create({
    button: {
      height: 50,
      backgroundColor: '#666',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    buttonText: {
      color: 'white',
      fontSize: 18
    },
    heading: {
      color: 'white',
      fontSize: 40,
      marginBottom: 10,
      alignSelf: 'center'
    },
    container: {
      backgroundColor: colors.primary,
      flex: 1,
      justifyContent: 'center'
    },
    input: {
      margin: 10,
      backgroundColor: 'white',
      paddingHorizontal: 8,
      height: 50
    }
  });
}
