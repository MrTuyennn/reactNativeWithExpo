import React, { Component } from 'react';
import { View, Text, Image, ToastAndroid } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebase from '../firebase/firebase';


export default class AddSp extends Component {
    constructor(props){
        super(props);
        this.state = {
            // image:null,
            textKey: '',
            textTenSp:'',
            numberGia: '',
            textMota:'',
            showProgress:false,
        };
    }

    // kiểm tra nguồn
    onProgress=(kt)=>{
        this.setState({showProgress:kt});
    }
    // chéc điều kiện và xử lý firebase
    _Check=(image,textKey,textTenSp,numberGia,textMota)=>{
        if( textKey != '' && textTenSp != ''  && numberGia != '' && textMota != ''){
            this.setState({
                
                // image:'',
                textKey:'',
                textTenSp:'',
                numberGia:'',
                textMota:'',
            })
            this.onProgress(true),
            this._writeUserData(),
            ToastAndroid.show("Thêm Thành Công!",ToastAndroid.SHORT);
        }else{
            ToastAndroid.show("Vui Lòng Nhập Đầy Đủ Thông Tin !!!",ToastAndroid.SHORT);
        }
    }

    // camera
    // componentDidMount() {
    //     this.getPermissionAsync();
    //     console.log('hi');
    //   }
    
    //   getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //       if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //       }
    //     }
    //   }
      
      // chọn ảnh trong thư viện
      // _pickImage = async () => {
      //   let result = await ImagePicker.launchImageLibraryAsync({
      //     mediaTypes: ImagePicker.MediaTypeOptions.All,
      //     allowsEditing: true,
      //     aspect: [4, 3],
      //     quality: 1
      //   });
    
      //   console.log(result);
    
      //   if (!result.cancelled) {
      //     this.setState({ image: result.uri });
      //   }
      // };

      // chụp hình với camera
      // _TakeImage = async () => {
      //   let result = await ImagePicker.launchCameraAsync({
      //     mediaTypes: ImagePicker.MediaTypeOptions.All,
      //     allowsEditing: true,
      //     aspect: [4, 3],
      //     quality: 1
      //   });
    
      //   console.log(result);
    
      //   if (!result.cancelled) {
      //     this.setState({ image: result.uri });
      //   }
      // };
      
      // up load ảnh lên firebase
      // _upLoadImageAsync = async (uri) =>{
      //     const image = await fetch(uri);
      //     const blod = await image.blob();
      //     const ref = firebase.storage().ref().child(uuid.v4());
      //     const snapshot = await ref.put(blod) ;
      //     blod.close();
          
      //     return await snapshot.ref.getDownloadURL();
      // }
      //ghi dữ liệu
      _writeUserData=()=>{
        firebase.database().ref('sanPham').push({
           
             textKey:this.state.textKey,
             textTenSp:this.state.textTenSp,
             numberGia:this.state.numberGia,
             textMota:this.state.textMota,
        })
        this.props.navigation.navigate('Home')
      }
    render() {
        let { image } = this.state;

        return (
            <View style={{flex: 1, flexDirection: 'column',alignItems: 'center'}}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                     value={this.state.image}
                        onChangeText={image => this.setState({ image })}
                    source={{ uri: image }}
                        style={{height: 200, width: 200}}></Image>
                </View>
                <View style={{alignItems: 'center',flexDirection: 'row'}}>
                    <Button onPress={this._pickImage}  color="black" style={{ height: 50, width: 200 }} icon="camera" mode="Outlined ">Take Photo</Button>
                    <Button onPress={this._TakeImage} color="black" style={{ height: 50, width: 200 }} icon="camera" mode="Outlined ">Gallery photo</Button>
                </View>
                <View style={{flexDirection: 'column',height: 100, width: '100%', padding: 20}}>
                    <TextInput style={{paddingTop: 10,}}
                        label='Nhập Mã Sản Phẩm'
                        selectionColor='rgb(255, 0, 0)'
                        mode='outlined'
                        value={this.state.textKey}
                        onChangeText={textKey => this.setState({ textKey })}/>
                    <TextInput style={{paddingTop: 10,}}
                        label='Nhập Tên Sản Phẩm'
                        mode='outlined'
                        value={this.state.textTenSp}
                        onChangeText={textTenSp => this.setState({ textTenSp })}/>
                    <TextInput style={{paddingTop: 10,}}
                        label='Nhập Giá Sản Phẩm'
                        mode='outlined'
                        value={this.state.numberGia}
                        onChangeText={numberGia => this.setState({ numberGia })}/>
                    <TextInput style={{paddingTop: 10,}}
                        label='Mô tả Sản Phẩm'
                        mode='outlined'
                        value={this.state.textMota}
                        onChangeText={textMota => this.setState({ textMota })}/>
                    <View style={{alignItems:'center',flexDirection:'column',paddingVertical:20}}>
                    <Button onPress={this._Check.bind(this,this.state.tetxKey,this.state.tetxTenSp,this.state.numberGia,this.state.textMota)} color="white" style={{ height: 50, width: 200,backgroundColor:'black' }}  mode="Contained ">Thêm Sản Phẩm/></Button>
                    <Button color="white" style={{ height: 50, width: 200,backgroundColor:'black',marginTop:20 }}  mode="Contained ">Trở về</Button>
                    </View>
                </View>  
            </View>
        )
    }
}