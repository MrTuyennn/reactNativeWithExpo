import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList,TextInput,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Dialog from 'react-native-dialog';
import firebase from '../firebase/firebase';
export default class Infor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false,
            dialogVisibleDlete: false,
            key: this.props.navigation.state.params.keyfirebase,
            textKey: this.props.navigation.state.params.textKey,
            textTenSp : this.props.navigation.state.params.textTenSp,
            textMota: this.props.navigation.state.params.textMota,
            numberGia: this.props.navigation.state.params.numberGia,
            
        };
    }

    showDialog = () => {
        this.setState({
            dialogVisible: true,         
        });
    };
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    componentDidMount() {
        console.log(this.state.key)
        this.getData();
    }
    getData() {
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
            textMota: this.state.textMota,
        });

        this.setState({ dialogVisible: false });

    };
    render() {

        const { navigation } = this.props;
     
        return (
            <View style={styles.container}>
                <View style={styles.styleCard}>
                    <View style={{ flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.customText}>Mã Sản Phẩm</Text>
                        <Text>{this.state.textKey}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.customText}>Tên Sản Phẩm</Text>
                        <Text>{this.state.textTenSp}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.customText}>Giá Sản Phẩm</Text>
                        <Text>{this.state.numberGia}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.customText}>Mô Tả Sản Phẩm</Text>
                        <Text>{this.state.textMota}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row',margin: 50}}>
                    <TouchableOpacity style={styles.Button} onPress={this.showDialog}>
                    <Text>Cập Nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={() => { navigation.navigate('Home') }}>
                    <Text>Trở Về</Text>
                    </TouchableOpacity>
                </View>
                
                <Dialog.Container visible={this.state.dialogVisible}>
                   <View style={{ flex: 1, flexDirection: 'column',height:300}}>
                       <Text style={{color: 'red',fontWeight: 'bold',fontSize:20,marginVertical:20}}>Cập Nhập Thông Tin Sản Phẩm</Text>
                       <Text style={styles.txtDialog}>Mã Sản Phẩm :</Text>
                       <TextInput  onChangeText={textKey => this.setState({ textKey })}>
                           {this.state.textKey}
                          
                       </TextInput>
                       <Text style={styles.txtDialog}>Tên Sản Phẩm :</Text>
                       <TextInput onChangeText={textTenSp => this.setState({ textTenSp })}>
                           {this.state.textTenSp}
                           
                       </TextInput>
                       <Text style={styles.txtDialog}>Giá Sản Phẩm :</Text>
                       <TextInput  onChangeText={numberGia => this.setState({ numberGia })}>
                           {this.state.numberGia}
                          
                       </TextInput>
                       <Text style={styles.txtDialog}>Mô Tả Sản Phẩm :</Text>
                       <TextInput onChangeText={textMota => this.setState({ textMota })}>
                           {this.state.textMota}
                           
                       </TextInput>
                       <View style={{ flex: 1, flexDirection: 'row'}}>
                           <TouchableOpacity style={styles.Button} onPress={() =>this.handleDialogUpdate(this.state.key)}>
                               <Text>Cập Nhập</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.Button} onPress={this.handleCancel}>
                               <Text>Trở Về</Text>
                           </TouchableOpacity>
                       </View>
                   </View>
                </Dialog.Container>
            </View>

        )

        
    
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    styleCard: {
        height: 400,
        width: 390,
        marginLeft:50,
        marginTop:30,
        backgroundColor: 'black',
        borderRadius: 9,
        padding: 20,
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    customText: {
        color: "red",
        fontSize:20,
        fontWeight: "bold",
    },
    Button:{
        height:50, 
        width:100, 
        margin:50,
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        borderWidth:1,
    },
    txtDialog:{
        fontSize:20,
        marginVertical:20,
        fontWeight: 'bold',
    }
    

})