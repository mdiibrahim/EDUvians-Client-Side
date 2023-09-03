import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();

    const navigateToFeeCalculator = () => {
        navigation.navigate('Semester');
    };

    const navigateToCgpaCalculator = () => {
        navigation.navigate('CGPA');
    };

    const navigateToStudentAnalytics = () => {
        navigation.navigate('Analytics');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToFeeCalculator} style={styles.button}>
                <Text style={styles.buttonText}>Fee Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToCgpaCalculator} style={styles.button}>
                <Text style={styles.buttonText}>CGPA Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToStudentAnalytics} style={styles.button}>
                <Text style={styles.buttonText}>Student Analytics</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        backgroundColor: '#DAA520',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#800000',
        fontSize: 16,
    },
});

export default Dashboard;
