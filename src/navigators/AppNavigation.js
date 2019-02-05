import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
//COMPONENTS
import Home from '../containers/HomeScreen';
import DetailMovie from '../containers/DetailMovie';


const AppTopNavigation = createMaterialTopTabNavigator(
  {
    NowPlaying: Home,
  },
  {
    tabBarOptions: {
      scrollEnabled: true,
      style: {
        backgroundColor: 'black'
      }
    }
  }
);

const AppStackNavigation = createStackNavigator({
  NowPlaying: {
    screen: AppTopNavigation,
    navigationOptions: {
      header: null,
    },
  },
  Details: DetailMovie,
});

export default createAppContainer(AppStackNavigation);