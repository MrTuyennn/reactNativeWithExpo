import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,ScrollView,FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import Dialog from 'react-native-dialog';
import firebase from '../firebase/firebase';
export default class Infor extends Component {
    constructor(props){
        super(props)
        this.state ={
            dialogVisible: false,
            dialogVisibleDlete:false,
            textKey:'',
            key: this.props.navigation.state.params.keyfirebase,
            textSp:'',
            textMota:'',
            numberGia:'',
        };
    }
    
    showDialog = () => {
        this.setState({ dialogVisible: true });
      };
   
     
      handleCancel = () => {
        this.setState({ dialogVisible: false });
      };
      
      componentDidMount(){
          console.log(this.state.key)
          this.getData();
      } 
      getData(){
        var recentPostsRef = firebase.database().ref().child('sanPham').child(this.state.key);
        recentPostsRef.on('value', (snapshot) => {
            var array = [];
            let item = {
                textKey: snapshot.val().textKey,
                textTenSp: snapshot.val().textTenSp,
                numberGia: snapshot.val().numberGia,
                textMota: snapshot.val().textMota,
            }
            array.push(item)
            this.setState({
                post: array
            })

        })
      }
      handleDialogUpdate(key) {
        firebase.database().ref().child("sanPham").child(key).set({
            textKey: this.state.textKey,
            textTenSp: this.state.textTenSp,
            numberGia: this.state.numberGia,
            textMota:this.state.textMota,
        });

        this.setState({ dialogVisible: false });

    };
  


    render() {
        // console.log(JSON.stringify(textKey));
        const { navigation} = this.props;
       
        return (
        <ScrollView>
                <FlatList data={this.state.post} renderItem={({ item }) =>
                <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.styleImage} source={require('../image/coding.png')}></Image>
                </View>
                <View elevation={5} style={styles.styleCard}>
                    <Text style={styles.styleText}> Mã Sản Phẩm : {item.textKey}
                    
                    </Text>
                    
                    <Text style={styles.styleText}> Tên Sản Phẩm : {item.textTenSp}</Text>
                    <Text style={styles.styleText}> Giá Sản Phẩm :{item.numberGia}</Text>
                    <Text style={styles.styleText}> Mô Tả Sản Phẩm:{item.textMota}</Text>
                </View>
                <View style={styles.styleViewButun}>
                    <Button style={styles.styleButton} mode="contained" onPress={this.showDialog}>Cập Nhập</Button>
                    <Button style={styles.styleButton} mode="contained" onPress={() => { navigation.navigate('Home') }}>Trở Về</Button>
                </View>
                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Cập Nhập Sản Phẩm</Dialog.Title>
                    <Dialog.Input
                     value={this.state.textKey}
                     onChangeText={textKey => this.setState({ textKey })}
                    label="Nhập Mã Sản Phẩm"></Dialog.Input>
                    <Dialog.Input
                     value={this.state.textTenSp}
                     onChangeText={textTenSp => this.setState({ textTenSp })}
                    label="Nhập Tên Sản Phẩm"></Dialog.Input>
                    <Dialog.Input
                     value={this.state.numberGia}
                     onChangeText={numberGia => this.setState({ numberGia })}
                    label="Nhập Giá Sản Phẩm"></Dialog.Input>
                    <Dialog.Input
                     value={this.state.textMota}
                     onChangeText={textMota => this.setState({ textMota })}
                    label="Mô tả Sản Phẩm"></Dialog.Input>
                    <Dialog.Button label="Cập Nhập" onPress={() =>this.handleDialogUpdate(this.state.key)} />
                    <Dialog.Button label="Trở Về" onPress={this.handleCancel} />
                    </Dialog.Container>
                </View>
               
                
            </View>
                 }> </FlatList>


        </ScrollView>
            
            
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    styleImage: {
        height: 200,
        width: 200,
        marginTop: 10,
    },
    styleCard: {
        height: 400,
        width: 390,
        marginLeft: 50,
        marginTop: 30,
        backgroundColor:'black',
        borderRadius:9,
        padding:20,
        backgroundColor:'#d9d9d9',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 1
        }
    },
    styleText:{
        fontSize:18,
        color:'black',
        margin:20,
        padding:10,

    },
    styleViewButun:{
       flex:1,
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'center'
    },
    styleButton:{
        height:50,
        width:150,
        backgroundColor:'black',
        margin:30,   
    },

})