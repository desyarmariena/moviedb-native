import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
//COMPONENTS
import Home from '../containers/HomeScreen';
import NowPlaying from '../containers/NowPlayingScreen';
import Popular from '../containers/PopularScreen';
import TopRated from '../containers/TopRatedScreen';
import Upcoming from '../containers/UpcomingScreen';
import DetailMovie from '../containers/DetailMovie';


const AppTopNavigation = createMaterialTopTabNavigator(
  {
    NowPlaying: Home,
    // NowPlaying,
    // Popular,
    // TopRated,
    // Upcoming,
  },
  {
    tabBarOptions: {
      scrollEnabled: true
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