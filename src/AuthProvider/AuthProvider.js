import React, { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';



const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        try {
            setLoading(true);
            const result = signInWithPopup(auth, googleProvider);
            const user = result.user;
            navigation.navigate('Dashboard');
            saveUserInDB(user?.displayName, user?.email);
            setUser(user);
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }

    }
    const signInWithGitHub = () => {
        try {
            setLoading(true);
            const result = signInWithPopup(auth, githubProvider);
            const user = result.user;

            saveUserInDB(user?.displayName, user?.email);
            setUser(user);
        } catch (error) {
            console.error('Github Sign-In Error:', error);
        }

    }
    const saveUserInDB = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())

            .catch((err) => {
                console.error(err);
            })
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser === null) {
                setUser(currentUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        signUp,
        logIn,
        logOut,
        signInWithGoogle,
        signInWithGitHub,
        setLoading,
        setUser,
        saveUserInDB

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;