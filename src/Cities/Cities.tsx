import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'

import CenterMessage from '../CenterMessage/CenterMessage'    

import { colors } from '../styles/theme';
import { CityItem } from './City';

const styles = StyleSheet.create({
  cityContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  },
  city: {
    fontSize: 20,
  },
  country: {
    color: 'rgba(0, 0, 0, .5)'
  },
});

interface CityNav {
  city: CityItem;
}

interface CitiesProps {
  route: {params: {cities: Array<CityItem>}};
  navigation : {navigate: (name: string, params: CityNav) => void};
}
console.log('Cities');

export default class Cities extends React.Component<CitiesProps, {}> {
  static navigationOptions = {    
    title: 'Cities',
    headerTitleStyle: {
      color: 'white',
      fontSize: 20,
      fontWeight: '400'
    }
  }
  navigate = (item: CityItem) => {
    this.props.navigation.navigate('City', { city: item })    
  }
  render() {
    const {cities} = this.props.route.params || {cities: []};
    console.log('Cities', this.props.route.params);
    return (
      <ScrollView  contentContainerStyle={[!cities.length && { flex: 1 }]}>
        <View style={[!cities.length && { justifyContent: 'center', flex: 1 }]}>
        {
          !cities.length && <CenterMessage message='No saved cities!'/>    
        }
        {
          cities.map((item) => (    
            <TouchableWithoutFeedback
              onPress={() => this.navigate(item)} key={item.id} >
              <View style={styles.cityContainer}>
                <Text style={styles.city}>{item.name}</Text>
                <Text style={styles.country}>{item.country}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
        </View>
      </ScrollView>
    )
  }
}
