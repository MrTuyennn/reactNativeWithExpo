import React ,{Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Splash extends Component{
  
  
      render() {
        const { navigation } = this.props;
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
        return(
            <View style={styles.container}>
            <View style={styles.styleView}>
              <Image style={styles.image} source={require('../image/shopping.png')}></Image>
              <Text style={styles.title}>LMSUNNY</Text>

            </View>
          </View>
        );
    }
} 
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1D1B1B',
      flex: 1,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    styleView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 50,
      flex: 1,
      flexDirection: 'row',
    },
    title: {
      padding: 10,
      fontSize: 22,
      color: '#EC4D37',
  
    },
    image: {
      padding: 10,
    }
  
  })