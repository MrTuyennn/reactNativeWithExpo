import React,{Component} from 'react';
import{StyleSheet,Text,View,Image,TouchableWithoutFeedback,
    StatusBar,TextInput,SafeAreaView,KeyboardType,TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Keyboard,

    ToastAndroid} from 'react-native';

import firebaseConfig from '../firebase/firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            showProgress:false,
        };
    }

    onProgress=(kt)=>{
        this.setState({showProgress:kt});
    }

    getData =(email,password)=>{
        if(email != '' && password != ''){
            this.setState({
                email:'',
                password:''
            })
            this.onProgress(true);
            this.onLogin();
            
        }else{
            // Alert.alert('CC',"Vdu ui Long nhap day ",[],{ cancelable: true })
            ToastAndroid.show('Vui Lòng Nhập Đầy Đủ Thông Tin',ToastAndroid.SHORT);
        }
    }
    onLogin = () => {
        const { email, password } = this.state;
        firebaseConfig.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
              console.log(email);
            // If you need to do anything with the user, do it here
            this.props.navigation.navigate('Home', {
              email: email,
    
            })
            this.onProgress(false);
    
          })
          .catch((error) => {
            const { code, message } = error;
            // representation of the error
            this.onProgress(false);
              Alert.alert('Lỗi! ', 'Vui lòng đăng nhập lại', [], { cancelable: true })
          });
      }
    render(){
        const{navigation} = this.props;
        return(
            // SafeAreaView tránh ở số trường hợp có tai thỏ, giúp làm full màn hình
        <SafeAreaView  style={styles.container}>
            {/* StatusBar áp cho điện thoại tai thỏ hiển thị pin */}
            <StatusBar barStyle='light-content'></StatusBar>
            {/* <KeyboardAvoidingView behavior='padding' style={styles.container} onPress={Keyboard.dismiss}> */}
            <View style={styles.container}>
            <View style={styles.container}>
              <View style={styles.bacground_container}>
                <Image style={styles.image} source={require('../image/shopping.png')}></Image>
                <Text style={styles.title}>LMSUNNY</Text>
              
              </View>
             <View style={styles.InfroContainer}>
                 <TextInput style={styles.input}
                 placeholder="Enter Username/email"
                 onChangeText={(email) => this.setState({ email })}
                 value={this.state.email}
                 placeholderTextColor='rgba(255,255,255,0.8)'
                 KeyboardType='email-address'
                 returnKeyType='next'
                 autoCorrect={false}
                 onSubmitEditing={()=>this.refs.txtPassword.focus()}></TextInput>
                 <TextInput style={styles.input}
                 placeholder="Enter Password"
                 onChangeText={(password) => this.setState({ password })}
                 value={this.state.password}
                 placeholderTextColor='rgba(255,255,255,0.8)'
                 returnKeyType='go'
                 secureTextEntry
                 autoCorrect={false}
                 ref={"txtPassword"}></TextInput>
                 <TouchableOpacity
                 onPress={this.getData.bind(this,this.state.email,this.state.password)}
                  style={styles.buttonContainer}>
                     <Text style={styles.btntext}>LOGIN</Text>
                 </TouchableOpacity>
                 <Text style={styles.or}>Or</Text>
                 <TouchableOpacity
                onPress={()=>{navigation.navigate('Register')}}
                   style={styles.buttonContainer}>
                     <Text style={styles.btntext}>Registration</Text>
                 </TouchableOpacity>
             </View>
           </View>
           </View>
            {/* </KeyboardAvoidingView> */}
            <ProgressDialog
          title="Loading"
          activityIndicatorColor="blue"
          activityIndicatorSize="large"
          animationType="fade"
          message="Please, wait..."
          visible={this.state.showProgress}/>
        </SafeAreaView>
         
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1D1B1B',
        flexDirection:'column',
        height:'100%',
        width:'100%',
       
    },
    bacground_container:{
        marginTop:100,
        alignItems:'center',
        flex:1,
    },
    title:{
        fontSize: 35,
        color:'#EC4D37', 
    },
    title_if:{
        color:'#f7c744',
        fontSize:15,
        textAlign:'center',
        marginTop:5,
        opacity:0.9,
    },
    InfroContainer:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        marginBottom:10,
        height:350,
        padding:25,
        // backgroundColor:'white',  
    },
    input:{
        color:'white',
        height:40,
        borderRadius:10,
        // khoảng cách trái phải
        paddingHorizontal:10,
        marginBottom:20,
        backgroundColor:'rgba(255,255,255,0.2)'
    },
    buttonContainer:{
        borderRadius:10,
        marginVertical:10,
        backgroundColor:'#f7c744',
        paddingVertical:10,
        
    },
    btntext:{
        textAlign:'center',
        alignItems:'center',
        color:'rgb(32,53,70)',
        fontSize:18,
        fontWeight:'bold',
    },
    or:{
        textAlign:'center',
        color:'white',
    },
    image:{
      
        padding:10,
    }
})