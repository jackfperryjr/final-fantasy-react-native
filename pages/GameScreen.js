import React, { Component } from 'react'
import { Text, View, Array, Image, ScrollView, Dimensions } from 'react-native'

export default class GameScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      games: [],
      isLoading: false
    }
  }
  fetchData () {
    fetch('https://www.moogleapi.com/api/v1/games')
      .then(response => response.json())
      .then(games => {
        this.setState({ games: games, isLoading: false })
      })
  }
  componentDidMount () {
    this.setState({ isLoading: true })
    this.fetchData()
  }
  render () {
    const isLoading = this.state.isLoading
    let render
    var width = Dimensions.get('window').width // full width

    if (isLoading) {
      render = <View isLoading={isLoading} style={{ alignContent: 'center', alignItems: 'center' }}>
        <Image source={require('./icon-spinner.gif')} style={{ width: 100, height: 100, alignContent: 'center' }} />
      </View>
    } else {
      render = <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, width: width }}>
        <View style={{ flexDirection: 'row', flex: 3, justifyContent: 'space-around', backgroundColor: '#343a40', width: width, paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Title</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Platform</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Release Date</Text>
          </View>
        </View>
        {this.state.games.map((item, key) =>
          <View key={key} style={{ flexDirection: 'row', flex: 3, justifyContent: 'space-around', width: width, paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Image style={{ width: 100, height: 40, paddingBottom: 10 }} source={{ uri: item.picture }} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={{ paddingTop: 5 }}>{item.platform}</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={{ paddingTop: 5 }}>{item.releaseDate}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    }
    return (
      <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Games</Text>
        <View style={{ marginTop: 20 }}>
          {render}
        </View>
      </View>
    )
  }
}
