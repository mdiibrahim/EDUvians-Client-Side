import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Picker } from 'react-native';

const creditOptions = ["Select Credit", "1", "1.5", "3", "6"]; // Dropdown options

const CGPACalculator = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [credit, setCredit] = useState(creditOptions[0]); // Initialize with default option
  const [gpa, setGpa] = useState('');
  const [cgpa, setCGPA] = useState('');

  const addCourse = () => {
    if (courseName && credit !== "Select Credit" && gpa) {
      const course = {
        name: courseName,
        credit: parseFloat(credit),
        gpa: parseFloat(gpa),
      };
      setCourses([...courses, course]);
      setCourseName('');
      setCredit(creditOptions[0]); // Reset to default option
      setGpa('');
    }
  };

  const calculateCGPA = () => {
    if (courses.length > 0) {
      const totalCredits = courses.reduce((total, course) => total + course.credit, 0);
      const weightedSum = courses.reduce((sum, course) => sum + course.credit * course.gpa, 0);
      const semesterCGPA = weightedSum / totalCredits;
      setCGPA(semesterCGPA.toFixed(2));
    }
  };

  const calculateTotalCGPA = () => {
    if (courses.length > 0) {
      const totalCredits = courses.reduce((total, course) => total + course.credit, 0);
      const weightedSum = courses.reduce((sum, course) => sum + course.credit * course.gpa, 0);
      const totalCGPA = weightedSum / totalCredits;
      return totalCGPA.toFixed(2);
    }
    return 'N/A';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDUCATIONAL ANALYTICS</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Course Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Course Name"
            value={courseName}
            onChangeText={setCourseName}
            placeholderTextColor="#ffffff" // White Placeholder text color
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Credit</Text>
          <Picker
            style={styles.picker}
            selectedValue={credit}
            onValueChange={(itemValue) => setCredit(itemValue)}
          >
            {creditOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>GPA/Grade</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GPA"
            value={gpa}
            onChangeText={setGpa}
            keyboardType="numeric"
            placeholderTextColor="#ffffff" // White Placeholder text color
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addCourse}
        >
          <Text style={styles.addButtonLabel}>ADD COURSE</Text>
        </TouchableOpacity>
      </View>
      {courses.length > 0 && (
        <ScrollView style={styles.courseList}>
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeadline}>COURSE DETAILS</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.columnHeader}>Course</Text>
                <Text style={styles.columnHeader}>Credit</Text>
                <Text style={styles.columnHeader}>GPA</Text>
              </View>
              {courses.map((course, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableData}>{course.name}</Text>
                  <Text style={styles.tableData}>{course.credit}</Text>
                  <Text style={styles.tableData}>{course.gpa}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
      <Text style={styles.totalCGPA}>
        Semester CGPA: {calculateTotalCGPA()}
      </Text>
      {cgpa ? <Text style={styles.result}>Semester CGPA: {cgpa}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(106, 0, 50)', // Background color in rgb(106, 0, 50)
    padding: 25,
    color: '#FFFFFF', // White text color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#FFFFFF', // White title color
  },
  inputContainer: {
    backgroundColor: 'rgb(106, 0, 50)', // Background color in rgb(106, 0, 50)
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgb(75, 0, 35)', // Background color in rgb(75, 0, 35)
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    padding: 8,
    color: '#FFFFFF',
  },
  inputLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  picker: {
    backgroundColor: 'rgb(75, 0, 35)', // Background color in rgb(75, 0, 35)
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: 'rgb(75, 0, 35)', // Background color in rgb(75, 0, 35)
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  addButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  courseList: {
    marginBottom: 20,
  },
  tableContainer: {
    backgroundColor: 'rgb(106, 0, 50)', // Background color in rgb(106, 0, 50)
    borderRadius: 8,
    padding: 16,
  },
  tableHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    padding: 10,
  },
  tableData: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  totalCGPA: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF', // White color
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF', // White color
  },
});


export default CGPACalculator;