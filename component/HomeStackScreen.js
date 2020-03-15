import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import AddSp from './AddSp';
import Infor from './Infor';
import { createAppContainer } from 'react-navigation';
const HomeStack = createStackNavigator({
  Home:{
    screen:HomeScreen
  },
  AddSp:{
    screen:AddSp
  },
  Infor:{
    screen:Infor
  }
});
export default createAppContainer(HomeStack)
// export default class HomeStackScreen extends Component {
//   render() {
//     return (
//       <HomeStack.Navigator >
//         <HomeStack.Screen name="HomeScreen" options={{
//           title: 'Thông Tin Sản Phẩm',
//           headerTitleAlign: 'center'
//         }} component={HomeScreen} />
//         <HomeStack.Screen name="AddSp" options={{
//           title: 'Sản Phẩm',
//           headerTitleAlign: 'center',
//           headerLeft: null
//         }} component={AddSp} />
//         <HomeStack.Screen name='Infor'  options={{
//           title: 'Thông Tin Sản Phẩm',
//           headerTitleAlign: 'center'
//         }} component={Infor}/>
//       </HomeStack.Navigator>
//     );
//   }
// }