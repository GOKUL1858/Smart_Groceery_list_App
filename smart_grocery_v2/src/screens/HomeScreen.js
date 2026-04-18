import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
    FadeInDown,
    FadeOutLeft,
    Layout,
    useAnimatedStyle,
    withSpring,
    useSharedValue
} from 'react-native-reanimated';
import { ShoppingBasket, Plus, LogOut, CheckCircle2, Trash2, Tag } from 'lucide-react-native';
import { getGroceries, deleteGrocery, updateGrocery } from '../services/GroceryService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const fetchItems = async () => {
        try {
            const data = await getGroceries();
            setItems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchItems();
            const getUser = async () => {
                const userData = await AsyncStorage.getItem('user');
                if (userData) setUser(JSON.parse(userData));
            };
            getUser();
        }, [])
    );

    const handleDelete = (id) => {
        Alert.alert('Delete Item', 'Remove this from your list?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    try {
                        await deleteGrocery(id);
                        fetchItems();
                    } catch (error) {
                        Alert.alert('Error', 'Failed to delete');
                    }
                }
            }
        ]);
    };

    const handleToggle = async (item) => {
        try {
            await updateGrocery(item._id, { isPurchased: !item.isPurchased });
            fetchItems();
        } catch (error) {
            Alert.alert('Error', 'Failed to update');
        }
    };

    const renderItem = ({ item, index }) => (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            exiting={FadeOutLeft}
            layout={Layout.springify()}
            style={[styles.itemCard, item.isPurchased && styles.itemCardPurchased]}
        >
            <TouchableOpacity
                style={styles.itemMain}
                onPress={() => handleToggle(item)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkCircle, item.isPurchased && styles.checkCircleActive]}>
                    {item.isPurchased && <CheckCircle2 size={18} color="#FFF" />}
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.itemName, item.isPurchased && styles.strikethrough]}>
                        {item.name}
                    </Text>
                    <View style={styles.metaRow}>
                        <View style={styles.tag}>
                            <Tag size={12} color="#666" />
                            <Text style={styles.tagText}>{item.category}</Text>
                        </View>
                        <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteBtn}>
                <Trash2 size={20} color="#FF5252" />
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcome}>Welcome back,</Text>
                    <Text style={styles.userName}>{user?.name || 'Shopper'}</Text>
                </View>
                <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
                    <LogOut size={20} color="#666" />
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{items.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={[styles.statValue, { color: '#4CAF50' }]}>
                        {items.filter(i => i.isPurchased).length}
                    </Text>
                    <Text style={styles.statLabel}>Done</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={[styles.statValue, { color: '#FF9800' }]}>
                        {items.filter(i => !i.isPurchased).length}
                    </Text>
                    <Text style={styles.statLabel}>Left</Text>
                </View>
            </View>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <ShoppingBasket size={64} color="#DDD" />
                        <Text style={styles.emptyText}>Your list is looking empty</Text>
                        <Text style={styles.emptySub}>Add some essentials to get started</Text>
                    </View>
                )}
            />

            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.fab}
                onPress={() => navigation.navigate('AddGrocery')}
            >
                <Plus size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F2F5' },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 24,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    welcome: { fontSize: 14, color: '#999', fontWeight: '500' },
    userName: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
    logoutBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: -30,
        justifyContent: 'space-between'
    },
    statCard: {
        backgroundColor: '#FFF',
        width: width * 0.26,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    statLabel: { fontSize: 12, color: '#999', marginTop: 2 },
    list: { padding: 24, paddingTop: 30 },
    itemCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    itemCardPurchased: { backgroundColor: '#FBFBFB', opacity: 0.8 },
    itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    checkCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#4CAF50',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkCircleActive: { backgroundColor: '#4CAF50' },
    textContainer: { flex: 1 },
    itemName: { fontSize: 17, fontWeight: '600', color: '#333' },
    strikethrough: { textDecorationLine: 'line-through', color: '#AAA' },
    metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 12
    },
    tagText: { fontSize: 11, color: '#666', marginLeft: 4, fontWeight: '600' },
    qtyText: { fontSize: 12, color: '#999', fontWeight: '500' },
    deleteBtn: { padding: 8 },
    fab: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        backgroundColor: '#4CAF50',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    emptyContainer: { alignItems: 'center', marginTop: 100 },
    emptyText: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 20 },
    emptySub: { fontSize: 14, color: '#999', marginTop: 8 },
});

export default HomeScreen;
