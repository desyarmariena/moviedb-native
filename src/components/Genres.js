import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'

export class Genres extends Component {
  render() {
    return (
      <View style={{marginHorizontal: 5, flex: 1, flexWrap: 'wrap'}}>
        <FlatList
        data={this.props.genres}
        keyExtractor={item => String(item.id)}
        horizontal={true}
        renderItem={({item}) => (
          <Text style={styles.genre}>{item.name}</Text>
        )}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  genre: {
    color: 'rgba(255,255,255,0.8)',
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 5
  },
})

export default Genres
