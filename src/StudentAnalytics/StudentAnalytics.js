import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import additional hooks
import { AuthContext } from '../AuthProvider/AuthProvider';

const semesters = [
    'S1', 'S2', 'S3', 'S4',
    'S5', 'S6', 'S7', 'S8',
    'S9', 'S10', 'S11', 'S12'
];

const chartConfig = {
    backgroundGradientFrom: 'rgb(106, 0, 50)',
    backgroundGradientTo: 'rgb(106, 0, 50)',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const StudentAnalytics = () => {
    const [inputValue, setInputValue] = useState('');
    const [chartWidth, setChartWidth] = useState(Dimensions.get('window').width - 40);
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext)
    console.log(user)
    useEffect(() => {
        const updateChartWidth = () => {
            setChartWidth(Dimensions.get('window').width - 40);
        };

        Dimensions.addEventListener('change', updateChartWidth);

        return () => {
            Dimensions.removeEventListener('change', updateChartWidth);
        };
    }, []);

    // Fetch CGPA data from Express API using React Query
    const { data: cgpa = [] } = useQuery({
        queryKey: ['cgpa'], // Replace with the user's email
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cgpa/:${user?.email}`); // Replace with your API endpoint
            const data = await res.json();
            console.log(data)
            return data;
        },
    });

    // Mutation function for adding CGPA data
    const addCGPAMutation = useMutation(
        async (newCGPA) => {
            const res = await fetch(`http://localhost:5000/cgpa/:${user?.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCGPA),
            });

            if (!res.ok) {
                throw new Error('Failed to add CGPA');
            }
        },
        {
            onSuccess: () => {
                // Invalidate and refetch the CGPA query after successfully adding data
                queryClient.invalidateQueries('cgpa');
            },
        }
    );

    const handleInputChange = (value) => {
        if (value === '' || (!isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 4)) {
            setInputValue(value);
        }
    };

    const addCGPA = () => {
        const parsedValue = parseFloat(inputValue);
        if (parsedValue >= 0 && parsedValue <= 4) {
            // Send CGPA data to the server
            addCGPAMutation.mutate({ email: user?.email, cgpa: parsedValue }); // Replace with the user's email
            setInputValue('');
        }
    };

    const chartData = {
        labels: semesters,
        datasets: [
            {
                data: cgpa.map((item) => item.cgpa), // Extract CGPA values from the fetched data
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            },
        ],

    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.heading}>CGPA ANALYTICS</Text>
                <View style={styles.chartContainer}>
                    <LineChart
                        data={chartData}
                        width={chartWidth}
                        height={300}
                        yAxisLabel="CG"
                        yAxisSuffix=""
                        chartConfig={chartConfig}
                        xLabelsOffset={10}
                        fromZero={true}
                        xLabels={{
                            labelAlignment: 'center',
                            fontSize: 10,
                        }}
                    />
                    <Text style={styles.averageLabel}>
                        Average CGPA: {calculateAverage(cgpa.map((item) => item.cgpa)).toFixed(2)}
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter CGPA (0-4)"
                        placeholderTextColor="#fff"
                        value={inputValue}
                        onChangeText={handleInputChange}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={addCGPA}
                        disabled={inputValue === '' || addCGPAMutation.isLoading}
                        underlayColor="rgba(255, 255, 255, 0.3)"
                    >
                        <Text style={styles.addButtonText}>Add CGPA</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const calculateAverage = (values) => {
    const filteredValues = values.filter(
        (value) => !isNaN(parseFloat(value)) && value >= 0 && value <= 4
    );
    if (filteredValues.length === 0) return 0;
    const sum = filteredValues.reduce((total, value) => total + parseFloat(value), 0);
    return sum / filteredValues.length;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(106, 0, 50)',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
    },
    chartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    averageLabel: {
        marginTop: 10,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        borderColor: '#fff',
        borderWidth: 1,
        marginRight: 10,
        color: 'white',
    },
    addButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
    },
});

export default StudentAnalytics;
