import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export interface CityItem {
  id       : string;
  name     : string;
  country  : string;
  locations: Array<string>;
}

export default class City extends Component {
  render() {
    return (
      <View>
        <Text>City</Text>
      </View>
    );
  }
}