import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Mail, Lock, LogIn } from 'lucide-react-native';
import api from '../services/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.data));
            navigation.replace('Home');
        } catch (error) {
            Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.header}>
                <View style={styles.iconContainer}>
                    <LogIn size={40} color="#FFF" />
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue shopping</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.form}>
                <View style={styles.inputContainer}>
                    <Mail size={20} color="#999" style={styles.inputIcon} />
                    <CustomInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Lock size={20} color="#999" style={styles.inputIcon} />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <CustomButton
                    title="Login"
                    onPress={handleLogin}
                    loading={loading}
                    style={styles.loginBtn}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupLink}>
                    <Text style={styles.linkText}>New shopper? <Text style={styles.linkHighlight}>Sign Up</Text></Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: {
        height: '40%',
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 80,
        elevation: 10,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
    subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
    form: {
        padding: 30,
        marginTop: -40,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        marginHorizontal: 10,
        borderRadius: 20,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    inputContainer: { flexDirection: 'row', alignItems: 'center' },
    inputIcon: { position: 'absolute', left: 15, zIndex: 1 },
    loginBtn: { marginTop: 20, height: 55, borderRadius: 15 },
    signupLink: { marginTop: 25, alignItems: 'center' },
    linkText: { fontSize: 15, color: '#666' },
    linkHighlight: { color: '#4CAF50', fontWeight: 'bold' },
});

export default LoginScreen;
