import React from 'react'
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './pages/HomeScreen'
import CharacterScreen from './pages/CharacterScreen'
import MonsterScreen from './pages/MonsterScreen'
import GameScreen from './pages/GameScreen'

const App = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Characters: { screen: CharacterScreen },
    Games: { screen: GameScreen },
    Monsters: { screen: MonsterScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // tabBarOnPress: () => {
      //   navigation.getParam('fetchData')();
      // },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = Ionicons
        let iconName

        if (routeName === 'Home') {
          iconName = `ios-home`
        } else if (routeName === 'Characters') {
          iconName = `ios-contacts`
        } else if (routeName === 'Games') {
          iconName = `ios-disc`
        } else if (routeName === 'Monsters') {
          iconName = `ios-bug`
        }

        return <IconComponent name={iconName} size={30} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: '#dc3545',
      inactiveTintColor: '#808080'
    }
  }
)

export default createAppContainer(App)
