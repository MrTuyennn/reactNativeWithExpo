import React, { Component } from 'react';
import firebaseConfig from '../firebase/firebase';
import {
    StyleSheet, Text, View, Image, TouchableWithoutFeedback,
    StatusBar, TextInput, SafeAreaView, KeyboardType, TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,Alert,
    Button,
    ToastAndroid
} from 'react-native';
import {ProgressDialog} from 'react-native-simple-dialogs';
export default class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            cofin:'',
            showProgress:false,
        }
    }
    openProgress = (kt)=>{
        this.setState({showProgress :kt});
    }
    getData=(email,cofin)=>{
        console.log('dk ne');
        if(email != '' && cofin != '' && this.state.password != ''){
            if(cofin === this.state.password){
                this.setState({
                    email:'',
                    password:'',
                    cofin:'',
                })
                this.openProgress(true);
                this.onRegister();
               
            }else{
                ToastAndroid.show('Vui lòng nhập đúng mật khẩu !!!',ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show('Vui Lòng Nhập Đầy Đủ Thông Tin',ToastAndroid.SHORT)
        }
    }
    
  onRegister = () => {
      console.log('dk nua ne');
    const { email, cofin } = this.state;
    console.log(email)
    firebaseConfig.auth().createUserWithEmailAndPassword(email, cofin)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
        console.log(user);  
        ToastAndroid.show('Đăng kí thành công!', ToastAndroid.SHORT);
          this.openProgress(false),
          this.props.navigation.navigate('Login')
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
        this.openProgress(false);
       Alert.alert('Lỗi! ', 'Vui lòng thử lại',[],{ cancelable: true })
  
      });
    }
 
    render() {
        const { navigation } = this.props;
        return (
            // SafeAreaView tránh ở số trường hợp có tai thỏ, giúp làm full màn hình
            <SafeAreaView style={styles.container}>
                {/* StatusBar áp cho điện thoại tai thỏ hiển thị pin */}
                <StatusBar barStyle='light-content'></StatusBar>
               
                    <View style={styles.container}>
                        <View style={styles.container}>
                            <View style={styles.bacground_container}>
                                <Text style={styles.title}>LMSUNNY</Text>
                               
                            </View>
                        </View>
                        <View style={styles.InfroContainer}>
                            <TextInput style={styles.input}
                                placeholder="Enter Email"
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                                placeholderTextColor='rgba(255,255,255,0.8)'
                                returnKeyType='next'
                                autoCorrect={false}
                                ref={"txtEmail"}
                                onSubmitEditing={() => this.refs.txtPhone.focus()}></TextInput>
                            <TextInput style={styles.input}
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChangeText={(password) => this.setState({password})}
                                placeholderTextColor='rgba(255,255,255,0.8)'
                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                                ref={"txtPassword"}
                                onSubmitEditing={() => this.refs.txtRemakePassword.focus()}></TextInput>
                            <TextInput style={styles.input}
                                placeholder="Enter Remake Password"
                                onChangeText={(cofin) => this.setState({cofin})}
                                value={this.state.cofin}
                                placeholderTextColor='rgba(255,255,255,0.8)'
                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                                ref={"txtRemakePassword"}></TextInput>
                            <TouchableOpacity
                                onPress={() => {this.getData(this.state.email,this.state.cofin)}} style={styles.buttonContainer}
                                style={styles.buttonContainer}>
                                <Text style={styles.btntext}>Registration</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
               
                <ProgressDialog
            title="Loading"
            activityIndicatorColor="blue"
            activityIndicatorSize="large"
            animationType="fade"
            message="Please, wait..."
            visible={this.state.showProgress}></ProgressDialog>
            </SafeAreaView>
           
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1B1B',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    bacground_container: {
        marginTop: 20,
        alignItems: 'center',
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 35,
        color: '#EC4D37',
    },
    title_if: {
        color: '#f7c744',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9,
    },
    InfroContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 280,
        padding: 20,
    },
    input: {
        borderRadius:10,
        color: 'white',
        height: 40,
        // khoảng cách trái phải
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    buttonContainer: {
        marginVertical: 10,
        backgroundColor: '#f7c744',
        paddingVertical: 10,
        borderRadius:10,

    },
    btntext: {
        textAlign: 'center',
        alignItems: 'center',
        color: 'rgb(32,53,70)',
        fontSize: 18,
        fontWeight: 'bold',
    },
})