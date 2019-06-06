import React, { Component } from 'react'
import { Text, View, Array, Image, ScrollView, Dimensions } from 'react-native'

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
    var width = Dimensions.get('window').width // full width

    if (isLoading) {
      render = <View isLoading={isLoading} style={{ alignContent: 'center', alignItems: 'center' }}>
        <Image source={require('./icon-spinner.gif')} style={{ width: 100, height: 100, alignContent: 'center' }} />
      </View>
    } else {
      render = <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', flex: 3, justifyContent: 'space-around', backgroundColor: '#343a40', width: width, paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Name</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Strength</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Weakness</Text>
          </View>
        </View>
        {this.state.monsters.map((item, key) =>
          <View key={key} style={{ flexDirection: 'row', flex: 3, justifyContent: 'space-around', width: width, paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text key={key} style={{ paddingTop: 5 }}><Image source={require('./icon-moogle.png')} style={{ width: 30, height: 30 }} />{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={{ paddingTop: 20, textAlign: "center" }}>{item.strength}</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={{ paddingTop: 20, textAlign: "center" }}>{item.weakness}</Text>
            </View>
          </View>
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
