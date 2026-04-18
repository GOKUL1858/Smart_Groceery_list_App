import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const Loader = ({ visible }) => {
    return (
        <Modal transparent visible={visible}>
            <View style={styles.container}>
                <View style={styles.loaderBox}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderBox: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
    },
});

export default Loader;
