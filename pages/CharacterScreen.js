import React, { Component } from 'react'
import { Text, View, Array, Image, ScrollView, Dimensions } from 'react-native'

export default class CharacterScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      characters: [],
      isLoading: false
    }
  }
  fetchData () {
    fetch('https://www.moogleapi.com/api/v1/characters')
      .then(response => response.json())
      .then(characters => {
        this.setState({ characters: characters, isLoading: false })
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
      render = <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around', backgroundColor: '#343a40', width: width, paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Name</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Job/Class</Text>
          </View>
        </View>
        {this.state.characters.map((item, key) =>
          <View key={key} style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around', width: width, paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={{ paddingBottom: 5 }}><Image style={{ width: 20, height: 20, paddingBottom: 5 }} source={{ uri: item.picture }} /> {item.name}</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={{ paddingTop: 5 }}>{item.job}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    }
    return (
      <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Characters</Text>
        <View style={{ marginTop: 20 }}>
          {render}
        </View>
      </View>
    )
  }
}
