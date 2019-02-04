import React, { Component } from 'react';
import { View, TouchableHighlight, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config'

class HomeScreen extends Component {
  state = {
    movies: [],
  }
  componentDidMount() {
    const api_key = Config.APIKEY;
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`)
    .then(({data: {results}}) => {
      this.setState({
        movies: results,
      });
    });
  }
  render() {
    return (
      <FlatList
        data={this.state.movies}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <TouchableHighlight 
          onPress={() => {
              this.props.navigation.navigate('Details', {
                movieId: item.id,
                poster: item.poster_path
              });
            }}
            >
            <View>
              <Image 
                source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
                style={{width: 259, height: 389}}
              />
              <Text>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

export default HomeScreen;
