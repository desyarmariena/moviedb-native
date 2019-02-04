import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

class DetailMovie extends Component {
  state = {
    movieImages: [{}],
    movieDetail : {},
    poster: '',
  }
  componentDidMount() {
    const api_key = Config.APIKEY;
    const { navigation } = this.props;
    const movieId = navigation.getParam('movieId', 'noMovieId');
    this.setState({
      poster: navigation.getParam('poster', 'noPoster'),
    })
    const axiosMovieDetail = axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`);
    const axiosMovieImages = axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${api_key}&language=en-US&include_image_language=en,null`)
    Promise.all([axiosMovieImages, axiosMovieDetail])
    .then((response) => {
      this.setState({
        movieImages: response[0].data.backdrops,
        movieDetail: response[1].data,
      })
    });
  }
  render() {
    return (
      <View>
        <Image 
          source={{uri: `https://image.tmdb.org/t/p/w500/${this.state.poster}`}}
          style={{width: 259, height: 389}}
        />
        <Text>{this.state.movieDetail.title}</Text>
      </View>
    );
  }
}

export default DetailMovie;
