import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import api from '../services/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert('Incomplete', 'Please fill in all the details.');
            return;
        }
        setLoading(true);
        try {
            await api.post('/auth/signup', { name, email, password, role });
            Alert.alert('Welcome!', 'Registration successful. Let’s log you in.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <Animated.View entering={FadeInUp.duration(800).springify()} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.iconBox}>
                        <UserPlus size={40} color="#4CAF50" />
                    </View>
                    <Text style={styles.title}>Join Us</Text>
                    <Text style={styles.subtitle}>Create an account to start your list</Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(200).duration(800).springify()} style={styles.form}>
                    <View style={styles.inputWrap}>
                        <User size={18} color="#999" style={styles.icon} />
                        <CustomInput placeholder="Your Name" value={name} onChangeText={setName} style={{ paddingLeft: 45 }} />
                    </View>

                    <View style={styles.inputWrap}>
                        <Mail size={18} color="#999" style={styles.icon} />
                        <CustomInput placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" style={{ paddingLeft: 45 }} />
                    </View>

                    <View style={styles.inputWrap}>
                        <Lock size={18} color="#999" style={styles.icon} />
                        <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ paddingLeft: 45 }} />
                    </View>

                    <View style={styles.roleLabelWrap}>
                        <Text style={styles.roleLabel}>Choose your role:</Text>
                    </View>

                    <View style={styles.roleButtons}>
                        {['user', 'admin'].map((r) => (
                            <TouchableOpacity
                                key={r}
                                style={[styles.roleButton, role === r && styles.roleButtonActive]}
                                onPress={() => setRole(r)}
                            >
                                <Text style={[styles.roleButtonText, role === r && styles.roleButtonTextActive]}>
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <CustomButton title="Create Account" onPress={handleSignup} loading={loading} style={styles.signupBtn} />

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
                        <Text style={styles.linkText}>Got an account? <Text style={styles.linkHighlight}>Login</Text></Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#4CAF50' },
    scroll: { flexGrow: 1, paddingBottom: 40 },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        alignItems: 'center',
        paddingBottom: 40
    },
    backBtn: { alignSelf: 'flex-start', padding: 8, marginBottom: 10 },
    iconBox: {
        width: 80,
        height: 80,
        borderRadius: 30,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 20
    },
    title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
    subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
    form: {
        marginHorizontal: 16,
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 24,
        elevation: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    inputWrap: { flexDirection: 'row', alignItems: 'center' },
    icon: { position: 'absolute', left: 15, zIndex: 1 },
    roleLabelWrap: { marginTop: 20, marginBottom: 12 },
    roleLabel: { fontSize: 15, fontWeight: '600', color: '#666' },
    roleButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    roleButton: {
        flex: 1,
        paddingVertical: 12,
        borderWidth: 1.5,
        borderColor: '#F0F2F5',
        borderRadius: 15,
        alignItems: 'center',
        marginHorizontal: 5
    },
    roleButtonActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
    roleButtonText: { fontWeight: 'bold', color: '#666' },
    roleButtonTextActive: { color: '#FFF' },
    signupBtn: { height: 55, borderRadius: 15 },
    loginLink: { marginTop: 25, alignItems: 'center' },
    linkText: { fontSize: 15, color: '#666' },
    linkHighlight: { color: '#4CAF50', fontWeight: 'bold' },
});

export default SignupScreen;
