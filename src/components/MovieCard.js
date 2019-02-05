import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MovieCard(props) {
  return (
    <View style={props.style || styles.container}>
      <Image 
        source={{uri: `https://image.tmdb.org/t/p/w500/${props.poster_path}`}}
        style={{width: '50%', height: 270, resizeMode: 'contain'}}
      />
      <View style={{flex: 1, flexWrap: 'wrap'}}>
        <Text style={{...styles.title, ...styles.textColor}}>{props.title}</Text>
        <Text style={{...styles.textColor, marginHorizontal: 10}}><Icon name="star" size={25} color="white" /> {props.vote_average}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },
  textColor: {
    color: 'rgba(255,255,255,0.8)',
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: 10,
    flexWrap: 'wrap',
  }
})