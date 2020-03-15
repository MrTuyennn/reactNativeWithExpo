import * as React from 'react';
import{View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from './component/Splash';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './component/Login';
import Registration from './component/Registration';
import AccountScreen from './component/AccountScreen';
import SettingScreen from './component/SettingScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from 'react-native-vector-icons/FontAwesome';
import Account from 'react-native-vector-icons/MaterialCommunityIcons';
 import Setting from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './component/HomeStackScreen';



const SplashStack = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: '#FFFFFF' }
    }
  },
});



const AuthhenStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    }
  },
  Register: {
    screen: Registration,
    navigationOptions: {
    }
  },

});
const BottomNavigation = createBottomTabNavigator({
  Home: {
    screen: HomeStackScreen,
    navigationOptions: {

      tabBarIcon: ({ tintColor, activeTintColor }) => (
        <View>
           <Home name="home" color="#ff4d4d" size={25}></Home>
        </View>
      ),
    },

  },
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor, activeTintColor }) => (
        <View>
         <Account name="account" color="#00ccff" size={25}></Account>
        </View>
      ),
    }
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor, activeTintColor }) => (
        <View>
           <Setting name="ios-settings" color="#696969" size={25}></Setting>
        </View>
      ),
    }
  },
},

  {
    defaultNavigationOptions: {
      backgroundColor:'black',
      tabBarOptions: {
        activeTintColor: '#fc4a1a',
        inactiveTintColor: '#ccc',
        showLable: false,
        allowFontScaling: false,
        elevation: 0.0,
        barStyle: {  backgroundColor:'black' },
        animationEnable: false,
       
      }
    }
  });
const App = createSwitchNavigator({

  Splash:{
    screen:SplashStack
  },

  AuthhenStack: {
    screen: AuthhenStack,
  },
  HomeAppButtom: BottomNavigation,

});


export default createAppContainer(App);
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

// const Stack = createStackNavigator();
// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash"  >
//         <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash}></Stack.Screen>
//         <Stack.Screen name="Login" options={{ headerShown: false }} component={Login}></Stack.Screen>
//         <Stack.Screen name="Registration" component={Registration}></Stack.Screen>
//         <Stack.Screen initialRouteName='HomeScreen' name="Screen" options={{
//           title: 'LMSunny',
//           headerTitleAlign:'center',
//           headerLeft:null,
//           headerStyle: {
//             backgroundColor: '#1D1B1B',
//           }, headerTintColor: '#EC4D37',       
//         }} component={Screen}></Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>

//   );
// }
// export default App;