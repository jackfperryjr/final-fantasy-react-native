import React, {Component} from 'react';
import {Platform, Text, View, Image, Dimensions, NetInfo} from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
        super(props);
    
        this.state = {
            character: {},
            isLoading: false,
        };
    }
    fetchData() {
        fetch("https://www.moogleapi.com/api/v1/characters/random")
        .then(response => response.json())
        .then(character => {
            this.setState({ character: character, isLoading: false });
        })
    }
    componentWillMount() {
        this.setState({ isLoading: true })
        this.fetchData();
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        this.fetchData();
    }
    render() {
        const isLoading = this.state.isLoading;
        let picture = this.state.character.picture;
        let render;

        if (isLoading) {
            render = <View isLoading={isLoading} style={{ alignContent: "center", alignItems: "center" }}>
                        <Image source={require("./icon-spinner.gif")} style={{ width: 100, height:100, alignContent: "center"}}></Image>
                    </View>;
        } else {
            render = <View style={{ alignContent: "center", alignItems: "center", marginTop: 50 }}>
                        <View>
                            <View>
                                <Image style={{ width: 180, height: 180 }} source={{ uri: picture }}></Image>
                                <Text style={{ alignContent: "center", alignItems: "center"}}>Name: {this.state.character.name}</Text>
                                <Text style={{ alignContent: "center", alignItems: "center"}}>Age: {this.state.character.age}</Text>
                                <Text style={{ alignContent: "center", alignItems: "center"}}>Race: {this.state.character.race}</Text>
                                <Text style={{ alignContent: "center", alignItems: "center"}}>Gender: {this.state.character.gender}</Text>
                                <Text style={{ alignContent: "center", alignItems: "center"}}>Job: {this.state.character.job}</Text>
                            </View>
                        </View>
                    </View>;
        }

        return (
            <View style={{ alignContent: "center", marginTop: 50 }}>
                <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>Welcome!</Text>
                <Text style={{ textAlign: "center", marginTop: 20 }}>This is my simple little React-Native web application.</Text>
                <Text style={{ textAlign: "left", paddingLeft: 10, paddingRight: 10 }}>Shameless plug: I'm reaching out to https://www.moogleapi.com to pull in data from three different endpoints.</Text>
                <View style={{ textAlign: "center", paddingLeft: 10, paddingRight: 10 }}>
                    <Text>Here's a fourth endpoint fetching a random character each time this page loads.</Text>
                    {render}
                </View>
            </View>
        );
    }
}