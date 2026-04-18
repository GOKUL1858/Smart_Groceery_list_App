import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { ShoppingCart, Type, Hash, Layers, ArrowLeft } from 'lucide-react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { addGrocery } from '../services/GroceryService';

const AddGroceryScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!name || !quantity || !category) {
            Alert.alert('Incomplete Form', 'Please fill in all fields to add the item.');
            return;
        }

        setLoading(true);
        try {
            await addGrocery({ name, quantity: Number(quantity), category });
            Alert.alert('Successful!', 'Item has been added to your list.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ArrowLeft size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Add Item</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Animated.View entering={FadeInRight.delay(100).springify()}>
                    <View style={styles.inputBox}>
                        <View style={styles.inputHeader}>
                            <Type size={18} color="#4CAF50" />
                            <Text style={styles.inputLabel}>Item Name</Text>
                        </View>
                        <CustomInput
                            placeholder="e.g. Organic Milk"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.inputHeader}>
                            <Hash size={18} color="#4CAF50" />
                            <Text style={styles.inputLabel}>Quantity</Text>
                        </View>
                        <CustomInput
                            placeholder="e.g. 2"
                            value={quantity}
                            onChangeText={setQuantity}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.inputHeader}>
                            <Layers size={18} color="#4CAF50" />
                            <Text style={styles.inputLabel}>Category</Text>
                        </View>
                        <CustomInput
                            placeholder="e.g. Dairy"
                            value={category}
                            onChangeText={setCategory}
                        />
                    </View>

                    <CustomButton
                        title="Add to List"
                        onPress={handleAdd}
                        loading={loading}
                        style={styles.addBtn}
                    />
                </Animated.View>
            </ScrollView>

            <View style={styles.footerIcon}>
                <ShoppingCart size={120} color="#F0F0F0" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    content: { padding: 24 },
    inputBox: { marginBottom: 25 },
    inputHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    inputLabel: { fontSize: 16, fontWeight: '600', color: '#666', marginLeft: 10 },
    addBtn: { marginTop: 20, height: 60, borderRadius: 20 },
    footerIcon: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        zIndex: -1
    },
});

export default AddGroceryScreen;
