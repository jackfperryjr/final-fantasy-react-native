import React, {Component} from 'react';
import { Text, View, Array, Image, ScrollView } from 'react-native';
 
export default class CharacterScreen extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
          characters: [],
          isLoading: false
        }
      }
      componentDidMount () {
        this.setState({ isLoading: true })
    
        fetch('https://www.moogleapi.com/api/v1/characters')
          .then(response => response.json())
          .then(characters => {
            this.setState({ characters: characters, isLoading: false })
          }
          )
      }
      render () {
        const isLoading = this.state.isLoading
        let render
    
        if (isLoading) {
          render =  <View isLoading={isLoading} style={{ alignContent: "center", alignItems: "center" }}>
                        <Image source={require("./icon-spinner.gif")} style={{ width: 100, height:100, alignContent: "center"}}></Image>
                    </View>;
        } else {
          render =  <ScrollView>
                        {this.state.characters.map((item, key) =>
                            <Text key={key}>{item.name}</Text>
                        )}
                    </ScrollView>
        }
        return (
            <View style={{ alignContent: "center", alignItems: "center", marginTop: 50 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Characters</Text>
                <View style={{ marginTop: 20 }}>
                    {render}
                </View>
            </View>
        );
    }
}