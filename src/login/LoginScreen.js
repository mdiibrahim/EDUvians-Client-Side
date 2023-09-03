import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthProvider/AuthProvider';


const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn, signInWithGoogle, signInWithGitHub, setUser, user, setLoading, logOut } = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();
        logIn(email, password)
            .then((result) => {
                // Handle successful login
                Alert.alert('Success', 'Logged in successfully');
                setEmail('');
                setPassword('');
                setUser(result?.user);
                navigation.navigate('Dashboard');
            })
            .catch(error => {
                // Handle login errors
                Alert.alert('Error', error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                // Handle successful logout
                setUser(null); // Clear the user in the context
                Alert.alert('Success', 'Logged out successfully');
            })
            .catch(error => {
                // Handle logout errors
                Alert.alert('Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {user ? (
                // If user is logged in, show logout button
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            ) : <>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>New to EDUvians? Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                    <Text style={styles.buttonText}>Sign In with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={signInWithGitHub}>
                    <Text style={styles.buttonText}>Login with GitHub</Text>
                </TouchableOpacity>
            </>


            }
        </View>
    );
};

const styles = StyleSheet.create({
    githubButton: {
        backgroundColor: '#333', // GitHub black color
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
        marginTop: 10,
    },
    googleButton: {
        backgroundColor: '#db4437', // Google red color
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#800000',

        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff',
    },
    inputContainer: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#800000',
        fontSize: 16,
    },
    linkButton: {
        marginTop: 20,
    },
    linkButtonText: {
        color: 'white',
    },
});

export default LoginScreen;
