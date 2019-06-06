import React, {Component} from 'react';
import { Text, View, Array, Image, ScrollView, Dimensions } from 'react-native';
 
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
        this.fetchData();
      }
      render () {
        const isLoading = this.state.isLoading
        let render
        var width = Dimensions.get("window").width; //full width
    
        if (isLoading) {
          render =  <View isLoading={isLoading} style={{ alignContent: "center", alignItems: "center" }}>
                        <Image source={require("./icon-spinner.gif")} style={{ width: 100, height:100, alignContent: "center"}}></Image>
                    </View>;
        } else {
          render =  <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 100, width: width }}>
                        {this.state.games.map((item, key) =>
                            <Text key={key}><Image style={{ width: 100, height: 40 }} source={{ uri: item.picture }}></Image> {item.title}</Text>
                        )}
                    </ScrollView>
        }
        return (
            <View style={{ alignContent: "center", alignItems: "center", marginTop: 50 }}>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>Games</Text>
                <View style={{ marginTop: 20 }}>
                    {render}
                </View>
            </View>
        );
    }
}