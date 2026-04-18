import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const CustomInput = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType, style }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, style]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor="#AAA"
                autoCapitalize="none"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 8,
    },
    input: {
        width: '100%',
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#F0F2F5',
    },
});

export default CustomInput;
