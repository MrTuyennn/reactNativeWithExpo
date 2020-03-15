// import React, { Component } from 'react';
// import { View, Text, StyleSheet, } from 'react-native'
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import Home from 'react-native-vector-icons/FontAwesome';
// import Account from 'react-native-vector-icons/MaterialCommunityIcons';
// import Setting from 'react-native-vector-icons/Ionicons';
// import AccountScreen from './AccountScreen';
// import HomeScreen from './HomeScreen'
// import HomeStackScreen from './HomeStackScreen';
// import SettingScreen from './SettingScreen'
// import Addsp from './AddSp';
// const Tab = createBottomTabNavigator(
//   {
//     Home:{
//     screen:HomeScreen   
//     },
//     Account:{
//         screen:AccountScreen
//   },
//   Setting:{
//       screen:SettingScreen
//   },
  
//   }
// );

// export default class Screen extends Component {
//     render() {
//         return (
//             <View style={styles.container }>
//                 <Tab.Navigator initialRouteName='HomeScreen'   tabBarOptions={{ activeTintColor: 'tomato',
//                         inactiveTintColor: 'white',
//                         style: {
//                             backgroundColor: '#1D1B1B',
//                           }  
//                       }}>
//                     <Tab.Screen
//                         name="Home"
//                         options={{
//                             tabBarIcon: () => (
//                                 <Home name="home" color="#ff4d4d" size={25}></Home>
//                             ),
//                         }}
//                         component={HomeStackScreen}
//                     ></Tab.Screen>
//                     <Tab.Screen
//                         name="Anccount"
//                         options={{
//                             tabBarIcon: () => (
//                                 <Account name="account" color="#00ccff" size={25}></Account>
//                             ),
//                         }}
//                         component={AccountScreen}></Tab.Screen>
//                     <Tab.Screen
//                         name="Setting"
//                         options={{
//                             tabBarIcon: () => (
//                                 <Setting name="ios-settings" color="#696969" size={25}></Setting>
//                             ),
//                         }}
//                         component={SettingScreen}></Tab.Screen>
//                 </Tab.Navigator>
                
                
                
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         height: '100%',
//         width: '100%',
//     },
// })
