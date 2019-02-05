import React, { Component } from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  FlatList, 
  View, 
  Text, 
  Image, 
  TouchableHighlight, 
  ScrollView 
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
//COMPONENTS
import MovieCard from '../components/MovieCard';
import Genres from '../components/Genres';

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
    movieDetail : {},
    relatedMovies: [],
    loading: true,
  }  

  componentDidMount() {
    this._isMounted = true;
    const api_key = Config.APIKEY;
    const movieId = this.props.navigation.getParam('movieId', 'noMovieId');
    const axiosMovieDetail = axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`);
    const axiosRelatedMovies = axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US&page=1`)
    Promise.all([axiosMovieDetail, axiosRelatedMovies])
    .then((response) => {
      if(this._isMounted) {
        this.setState({
          movieDetail: response[0].data,
          relatedMovies: response[1].data.results,
          loading: false,
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
    const {movieDetail, loading} = this.state;
    if(loading) {
      return (
        <View style={{...styles.container, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Image 
          source={{uri: `https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}}
          style={{width: 259, height: 389, alignSelf: 'center'}}
        />
        <Text style={{...styles.title, ...styles.textColor}}>{movieDetail.title} ({this.extractMovieReleaseYear(movieDetail.release_date)})</Text>
        <Text style={{...styles.textColor, ...styles.overview}}>{movieDetail.overview}</Text>

        <Genres genres={movieDetail.genres} />
        
        <View>
          <Text style={{...styles.textColor, ...styles.otherMovie}}>Similar Movies</Text>
          <FlatList
            data={this.state.relatedMovies}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <TouchableHighlight 
              onPress={() => {
                  this.props.navigation.push('Details', {
                    movieId: item.id,
                    title: item.title,
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
    flex: 1,
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
    margin: 10,
  }
})

export default DetailMovie;
