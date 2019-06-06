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
      fetchData() {
        fetch('https://www.moogleapi.com/api/v1/characters')
          .then(response => response.json())
          .then(characters => {
            this.setState({ characters: characters, isLoading: false })
          });
      }
      componentDidMount() {
        this.setState({ isLoading: true })
        this.fetchData();
        this.subs = [
          this.props.navigation.addListener('didFocus', this.componentDidFocus)
        ];
      }
      componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
      }
      componentDidFocus() {
        this.fetchData;
      }
      render() {
        const isLoading = this.state.isLoading
        let render
    
        if (isLoading) {
          render =  <View isLoading={isLoading} style={{ alignContent: "center", alignItems: "center" }}>
                        <Image source={require("./icon-spinner.gif")} style={{ width: 100, height:100, alignContent: "center"}}></Image>
                    </View>;
        } else {
          render =  <ScrollView contentContainerStyle={{ alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flexDirection: "column", paddingRight: 5 }}>
                          <Text style={{ fontWeight: "bold" }}>Name</Text>
                        </View>
                        <View style={{ flexDirection: "column", paddingLeft: 5 }}>
                          <Text style={{ fontWeight: "bold" }}>Job/Class</Text>
                        </View>
                      </View>
                      {this.state.characters.map((item, key) =>
                      <View key={key} style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flexDirection: "column", paddingRight: 5 }}>
                          <Text>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: "column", paddingLeft: 5 }}>
                          <Text>{item.job}</Text>
                        </View>
                      </View>
                        )}
                    </ScrollView>
        }
        return (
            <View style={{ alignContent: "center", alignItems: "center", marginTop: 50 }}>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>Characters</Text>
                <View style={{ marginTop: 20 }}>
                    {render}
                </View>
            </View>
        );
    }
}