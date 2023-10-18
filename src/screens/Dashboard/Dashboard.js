import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Dashboard!</Text>
        </View>
    );
};

export default DashboardScreen;
