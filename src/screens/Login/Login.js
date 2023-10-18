import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "./styles";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../../firebase/config';
import { ref, set } from 'firebase/database';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleLogin = async () => {
        try {
            let user = await signInWithEmailAndPassword(auth, email, password);
            // After successfully login connect Realtime Database
            if (user) {
                const userId = user.user.uid; // Assuming you want to use the user's UID as the key

                // Create a reference to the "users" table in the database
                const usersRef = ref(db, 'users/' + userId);

                // Set the data (email and password) in the database
                set(usersRef, {
                    email: email,
                    password: password,
                    role: '',
                    account_creation_date: '',
                    display_name: '',
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    id: ''
                });
                console.log('User logged in successfully', user);
                navigation.navigate('Dashboard');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError(error.message)
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};


export default LoginScreen;
