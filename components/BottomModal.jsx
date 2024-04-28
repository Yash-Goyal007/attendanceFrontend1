import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';

function BottomModal(props) {
    return (
        <View style={style.container}>
            <Modal
                animationType="slide"
                visible={props.modalVisible}
                transparent={true}
                presentationStyle={'overFullScreen'}
                style={style.modal}
                onBackdropPress={props.onBackdropPress}
                onBackButtonPress={() => props.onBackdropPress()}
                onRequestClose={props.onBackdropPress}
            >
                <TouchableOpacity
                    style={[style.modalTop, { height: props.modalOffset }]}
                    onPress={() => props.onBackdropPress()}
                />
                <View style={[style.modalView, { height: props.modalHeight }]}>
                    <View style={[style.childContainer, { height: props.modalHeight }]}>
                        {props.childComponent}
                    </View>
                </View>
                <View style={style.blankElement} />
            </Modal>
        </View>
    );
}

export default BottomModal;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        bottom: 0,
        justifyContent: 'flex-end',
    },
    modalView: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
    },
    modalTop: {
        backgroundColor: '#0002',
    },
    blankElement: {
        height: Platform.OS === 'ios' ? 10 : 25,
    },
});
