import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, FlatList } from 'react-native';

const SemesterFeeCalculator = () => {
    const [credit, setCredit] = useState('');
    const [selectedOption, setSelectedOption] = useState('bot'); // Default option is 'bot'
    const optionValues = {
        bot: 1760,
        without_bot: 3000,
    };
    const semesterFee = 11000;
    const otherFee = 500;
    const [totalFee, setTotalFee] = useState(0);

    const calculateTotalFee = () => {
        if (credit && selectedOption) {
            const perCreditFee = optionValues[selectedOption];
            const total = (parseFloat(credit) * perCreditFee) + semesterFee + otherFee;
            setTotalFee(total.toFixed(2));
        }
    };

    const data = [
        { label: 'Credit', value: credit },
        { label: 'Selected Option', value: selectedOption },
        { label: 'Per Credit Fee', value: `$${optionValues[selectedOption]}` },
        { label: 'Semester Fee', value: `$${semesterFee}` },
        { label: 'Other Fee', value: `$${otherFee}` },
        { label: 'Total Fee', value: `$${totalFee}` },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Semester Fee Calculator</Text>
            <Text style={styles.description}>
                Calculate the total semester fees based on credit hours and selected option.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Credit"
                keyboardType="numeric"
                value={credit}
                onChangeText={text => setCredit(text)}
            />
            <Picker
                style={styles.input}
                selectedValue={selectedOption}
                onValueChange={(itemValue) => setSelectedOption(itemValue)}
            >
                <Picker.Item label="With BOT" value="bot" />
                <Picker.Item label="Without BOT" value="without_bot" />
            </Picker>
            <Button title="Calculate Total Fee" onPress={calculateTotalFee} />
            <FlatList
                style={styles.table}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>{item.label}</Text>
                        <Text style={styles.tableCellValue}>{item.value}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginBottom: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#800000', // Maroon color
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#800000', // Maroon color
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#333',
    },
    table: {
        width: '80%',
        marginTop: 20,
        borderColor: '#800000',
        borderWidth: 1,
        borderRadius: 5,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#800000',
    },
    tableCellLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    tableCellValue: {
        fontSize: 16,
        color: '#800000', // Maroon color
    },
});

export default SemesterFeeCalculator;
