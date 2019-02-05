import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ScrollView } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import MovieCard from '../components/MovieCard'

class DetailMovie extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Movie Detail'),
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  _isMounted = false;

  state = {
    movieImages: [{}],
    movieDetail : {},
    poster: '',
    relatedMovies: [],
  }  

  componentDidMount() {
    this._isMounted = true;
    const api_key = Config.APIKEY;
    const { navigation } = this.props;
    const movieId = navigation.getParam('movieId', 'noMovieId');
    this.setState({
      poster: navigation.getParam('poster', 'noPoster'),
    })
    const axiosMovieDetail = axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`);
    const axiosMovieImages = axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${api_key}&language=en-US&include_image_language=en,null`);
    const axiosRelatedMovies = axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US&page=1`)
    Promise.all([axiosMovieImages, axiosMovieDetail, axiosRelatedMovies])
    .then((response) => {
      if(this._isMounted) {
        this.setState({
          movieImages: response[0].data.backdrops,
          movieDetail: response[1].data,
          relatedMovies: response[2].data.results
        })
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  extractMovieReleaseYear(release_date = '') {
    const arr = release_date.split('-');
    return arr[0];
  }

  render() {
    const {poster, movieDetail} = this.state;
    return (
      <ScrollView style={styles.container}>
        <Image 
          source={{uri: `https://image.tmdb.org/t/p/w500/${poster}`}}
          style={{width: 259, height: 389, alignSelf: 'center'}}
        />
        <Text style={{...styles.title, ...styles.textColor}}>{movieDetail.title} ({this.extractMovieReleaseYear(movieDetail.release_date)})</Text>
        <Text style={{...styles.textColor, ...styles.overview}}>{movieDetail.overview}</Text>

        <View>
          <Text style={{...styles.textColor, ...styles.otherMovie}}>Similar Movies</Text>
          <FlatList
            data={this.state.relatedMovies}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={.8}
            onEndReached={this.onEndReached}
            renderItem={({item}) => (
              <TouchableHighlight 
              onPress={() => {
                  this.props.navigation.push('Details', {
                    movieId: item.id,
                    poster: item.poster_path
                  });
                }}
                >
                <MovieCard {...item} />
              </TouchableHighlight>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  textColor: {
    color: 'rgba(255,255,255,0.8)',
  },
  title: {    
    fontSize: 24,
    margin: 10,
    alignSelf: 'center'
  },
  overview: {
    marginHorizontal: 10,
    textAlign: 'justify',
    marginBottom: 10,  
  },
  otherMovie: {
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  }
})

export default DetailMovie;
