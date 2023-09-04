import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthProvider/AuthProvider';



const SignUpScreen = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        signUp, signInWithGoogle, signInWithGitHub, setUser, user, saveUserInDB
    } = useContext(AuthContext);
    if (user) {
        navigation.navigate('Dashboard');
    }
    if (!user) {
        navigation.navigate('Login');
    }
    const handleSignUp = (event) => {

        event.preventDefault();
        signUp(email, password)
            .then((result) => {
                saveUserInDB(fullName, email);
                // Handle successful sign-up
                Alert.alert('Success', 'Sign-up successful');
                setEmail('');
                setPassword('');
                setFullName('');
                setUser(result.user);
                navigation.navigate('Dashboard');
            })
            .catch(error => {
                // Handle sign-up errors
                Alert.alert('Error', error.message);
            });
    };
    const handleLogInWithGoogle = () => {

        signInWithGoogle()
            .then(result => {
                const user = result.user;
                navigation.navigate('Dashboard');
                saveUserInDB(user.displayName, user.email, 'buyer');


            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });

    }
    const handleLogInWithGithub = () => {

        signInWithGitHub()
            .then(result => {
                const user = result.user;
                navigation.navigate('Dashboard');
                saveUserInDB(user.displayName, user.email, 'buyer');
                navigation.navigate('Dashboard');
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });

    }
    const handleLogout = () => {

        logOut()
            .then(() => {
                // Handle successful logout
                setUser(null); // Clear the user in the context
                navigation.navigate('Login');
                Alert.alert('Success', 'Logged out successfully');
            })
            .catch(error => {
                // Handle logout errors
                Alert.alert('Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    onChangeText={text => setFullName(text)}
                />
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            {user ? (
                // If user is logged in, show logout button
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            ) : <>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton} onPress={handleLogInWithGoogle}>
                    <Text style={styles.buttonText}>Sign Up with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.githubButton} onPress={handleLogInWithGithub}>
                    <Text style={styles.buttonText}>Sign Up with GitHub</Text>
                </TouchableOpacity>
            </>

            }
        </View>
    );
};

const styles = StyleSheet.create({
    githubButton: {
        backgroundColor: '#fff', // GitHub black color
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#800000',
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

export default SignUpScreen;
