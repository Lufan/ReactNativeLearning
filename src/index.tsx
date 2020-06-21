import React from 'react';

import Cities             from './Cities/Cities';
import City, { CityItem } from './Cities/City';
import AddCity            from './AddCity/AddCity';

import { NavigationContainer }      from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator }     from '@react-navigation/stack';

interface CitiesProps {
  route: {params: {cities: Array<CityItem>}};
}

const CitiesNav = createStackNavigator();
const CitiesNavCmp = function CitiesNavCmp({route: {params}}: CitiesProps) {
  console.log('CitiesNavCmp cities', params);
  return (
    <CitiesNav.Navigator>
      <CitiesNav.Screen name="Cities" component={Cities} initialParams={params}/>
      <CitiesNav.Screen name="City"   component={City}/>
    </CitiesNav.Navigator>
  );
}

const TabsBottom = createBottomTabNavigator();

interface TabProps {
  cities: Array<CityItem>;
  addCity: (city: CityItem) => void;
  addLocation: (location: string, city: CityItem) => void;
}

export default function Tabs(props: TabProps) {
  console.log('Tabs cities', props.cities);
  return (
    <NavigationContainer>
      <TabsBottom.Navigator>
        <TabsBottom.Screen name="Cities"  component={CitiesNavCmp} initialParams={{cities: props.cities}}/>
        <TabsBottom.Screen name="AddCity" component={AddCity}      initialParams={{addCity: props.addCity, addLocation: props.addLocation, cities: props.cities}}/>
      </TabsBottom.Navigator>
    </NavigationContainer>
  );
}
