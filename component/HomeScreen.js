import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ToastAndroid, Image, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FAB, Button } from 'react-native-paper';
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
                                <View style={styles.view}>
                                    <Image
                                        source={require('../image/coding.png')}
                                        style={{ width: 100, height: 100, margin: 5 }}>
                                    </Image>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={styles.itemm}>Mã Sản Phẩm : {item.textKey}</Text>
                                        <Text style={styles.itemm}>Tên Sản Phẩm : {item.textTenSp}</Text>
                                        <Text style={styles.itemm}>Gía Sản Phẩm : {item.numberGia}</Text>
                                        <Text style={styles.itemm}>Mô tả Sản Phẩm : {item.textMota}</Text>
                                    </View>
                                    <Button style={styles.styleButton} mode="contained" onPress={this.showDialogDelete}>Xóa</Button>
                                </View>
                                <View style={{ height: 1, backgroundColor: 'black', }}></View>
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
    itemm: {
        fontSize: 18,
        backgroundColor: '#c6ffb3',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    styleButton: {
        height: 50,
        width: 10,
        backgroundColor: 'black',
        margin: 30,
    },
})