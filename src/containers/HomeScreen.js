import React, { Component } from 'react';
import { View, TouchableHighlight, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import MovieCard from '../components/MovieCard';

class HomeScreen extends Component {
  state = {
    movies: [],
    page: 1,
  }
  componentDidMount() {
    this.getMovieDataFromAPI();
  }

  getMovieDataFromAPI = async () => {
    const api_key = Config.APIKEY;
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${this.state.page}`)
    this.setState({
      movies: this.state.movies.concat(data.results),
      page: this.state.page + 1,
    });
  }
  onEndReached = () => {
    this.getMovieDataFromAPI();
  }
  render() {
    return (
      <FlatList
        data={this.state.movies}
        keyExtractor={item => String(item.id)}
        onEndReachedThreshold={.8}
        onEndReached={this.onEndReached}
        style={{backgroundColor: 'rgba(0,0,0,0.8)'}}
        renderItem={({item}) => (
          <TouchableHighlight 
          onPress={() => {
              this.props.navigation.navigate('Details', {
                movieId: item.id,
                poster: item.poster_path,
                title: item.title,
              });
            }}            
            >
            <MovieCard {...item} />
          </TouchableHighlight>
        )}
      />
    );
  }
}

export default HomeScreen;
