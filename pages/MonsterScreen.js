import React, { Component } from 'react'
import { Text, View, Array, Image, ScrollView } from 'react-native'

export default class MonsterScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monsters: [],
      isLoading: false
    }
  }
  fetchData () {
    fetch('https://www.moogleapi.com/api/v1/monsters')
      .then(response => response.json())
      .then(monsters => {
        this.setState({ monsters: monsters, isLoading: false })
      })
  }
  componentDidMount () {
    this.setState({ isLoading: true })
    this.fetchData()
  }
  render () {
    const isLoading = this.state.isLoading
    let render

    if (isLoading) {
      render = <View isLoading={isLoading} style={{ alignContent: 'center', alignItems: 'center' }}>
        <Image source={require('./icon-spinner.gif')} style={{ width: 100, height: 100, alignContent: 'center' }} />
      </View>
    } else {
      render = <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {this.state.monsters.map((item, key) =>
          <Text key={key} style={{ paddingBottom: 5 }}><Image source={require('./icon-moogle.png')} style={{ width: 50, height: 50 }} />{item.name}</Text>
        )}
      </ScrollView>
    }
    return (
      <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Monsters</Text>
        <View style={{ marginTop: 20 }}>
          {render}
        </View>
      </View>
    )
  }
}
