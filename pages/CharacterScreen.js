import React, {Component} from 'react';
import { Text, View, Array, Image, ScrollView, Dimensions } from 'react-native';
 
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
      componentWillMount() {
        this.setState({ isLoading: true })
        this.fetchData();
      }
      componentDidMount() {
        this.setState({ isLoading: true })
        this.fetchData();
      }
      render() {
        const isLoading = this.state.isLoading
        let render
        var width = Dimensions.get("window").width; //full width
    
        if (isLoading) {
          render =  <View isLoading={isLoading} style={{ alignContent: "center", alignItems: "center" }}>
                        <Image source={require("./icon-spinner.gif")} style={{ width: 100, height:100, alignContent: "center"}}></Image>
                    </View>;
        } else {
          render =  <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}>
                      <View style={{ flexDirection: "row", flex: 2, justifyContent: "space-around", backgroundColor: "#343a40",  width: width, paddingLeft: 10, paddingRight: 10 }}>
                        <View style={{ flexDirection: "column", flex: 1, alignItems: "center" }}>
                          <Text style={{ fontWeight: "bold" }}>Name</Text>
                        </View>
                        <View style={{ flexDirection: "column", flex: 1, alignItems: "center" }}>
                          <Text style={{ fontWeight: "bold" }}>Job/Class</Text>
                        </View>
                      </View>
                      {this.state.characters.map((item, key) =>
                      <View key={key} style={{ flexDirection: "row", flex: 2, justifyContent: "space-around", width: width, paddingLeft: 10, paddingRight: 10 }}>
                        <View style={{ flexDirection: "column", flex: 1 }}>
                          <Text><Image style={{ width: 20, height: 20 }} source={{ uri: item.picture }}></Image> {item.name}</Text>
                        </View>
                        <View style={{ flexDirection: "column", flex: 1 }}>
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