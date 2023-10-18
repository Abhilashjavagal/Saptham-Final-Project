import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { signOut } from '@firebase/auth';


const DrawerContent = ({ navigation, auth }) => {
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            console.log('Logged out successfully');
            // Navigate to the login screen
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Dashboard');
                }}
            >
            <Text style={styles.menuItem}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Products');
                }}
            >
            <Text style={styles.menuItem}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('AddProduct');
            }}
            >
                <Text style={styles.menuItem}>AddProduct</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('ProductVariants');
            }}
            >
                <Text style={styles.menuItem}>ProductVariants</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.menuData}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export { DrawerContent };
