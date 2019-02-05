import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function MovieCard(props) {
  return (
    <View style={props.style || styles.container}>
      <Image 
        source={{uri: `https://image.tmdb.org/t/p/w500/${props.poster_path}`}}
        style={{width: '50%', height: 270, resizeMode: 'contain'}}
      />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 20,
    marginHorizontal: 10,
    flexWrap: 'wrap',
  }
})