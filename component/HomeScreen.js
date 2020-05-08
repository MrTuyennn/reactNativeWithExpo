import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ToastAndroid, Image, TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import { icon } from 'react-native-vector-icons';
import firebaseConfig from '../firebase/firebase';



export default class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogVisibleDlete: false,
            post: []
        }
    }
    showDialogDelete = () => {
        this.setState({ dialogVisibleDlete: true });
    };
    handleCancelDelete = () => {
        this.setState({ dialogVisibleDlete: false });
    }

    getdata() {
        var firebaseref = firebaseConfig.database().ref().child("sanPham");
        firebaseref.on('value', (snapshot) => {
            var array = [];
            snapshot.forEach((child) => {

                let item = {
                    key: (child.key),
                    textTenSp: child.val().textTenSp,
                    textMota: child.val().textMota,
                    numberGia: child.val().numberGia,
                    textKey: child.val().textKey,

                }
                //  console.log(key);
                array.push(item)
            });
            this.setState({
                post: array
            });

        })
    }
    deleteItem(key) {
        firebaseConfig.database().ref().child('sanPham').child(key).remove();
        this.setState({ dialogVisibleDlete: false });

    }

    componentWillMount() {
        this.getdata()
    }

    render() {

        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <FlatList data={this.state.post} renderItem={({ item }) =>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("Infor", { keyfirebase: item.key })}>
                            <View style={{ flex: 1, flexDirection: 'column', }}>
                            <View style={styles.cardview}>
                                <View style={styles.view}>                             
                                  <Image
                                        source={require('../image/acer.png')}
                                        style={{ width: 100, height: 100, margin: 10 }}>
                                    </Image>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={styles.itemm}>Mã Sản Phẩm : {item.textKey}</Text>
                                        <Text style={styles.itemm}>Tên Sản Phẩm : {item.textTenSp}</Text>
                                        <Text style={styles.itemm}>Gía Sản Phẩm : {item.numberGia}</Text>
                                        <Text style={styles.itemm}>Mô tả Sản Phẩm : {item.textMota}</Text>
                                    </View>
                                    <TouchableOpacity                                  
                                      style={styles.button}  onPress={this.showDialogDelete}>
                                           <Text>Delete</Text> 
                                      </TouchableOpacity>
                                </View>
                                
                                <View>
                                    <Dialog.Container visible={this.state.dialogVisibleDlete}>
                                        <Dialog.Description>
                                            Bạn Có Muốn Xóa Không ? 
                                        </Dialog.Description>
                                        <Dialog.Button label="Xóa" onPress={() => this.deleteItem(item.key)} />
                                        <Dialog.Button label="Trở Về" onPress={this.handleCancelDelete} />
                                    </Dialog.Container>
                                  </View>
                                </View>
                            </View>

                        </TouchableWithoutFeedback>
                    }></FlatList>
                </View>
                <FAB style={styles.fab}
                    small
                    icon="plus"
                    onPress={() => { navigation.navigate('AddSp') }}></FAB>

            </View>


        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },

    view: {
        flex: 1,
        flexDirection: 'row',
    },
    cardview:{
        flex: 1,
        height: 150,
        width: 465,
        margin:10,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,
    },
    itemm: {
        fontSize: 12,
        margin:5,
    },
    button:{
        backgroundColor: 'white',
        height:50,
        width:100,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginHorizontal:10, 
        marginVertical:50,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    
})