import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Toaster } from 'react-hot-toast';
import 'firebase/auth';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import LoginScreen from './src/login/LoginScreen';
import SignUpScreen from './src/signup/SignUpScreen';
import AuthProvider, { AuthContext } from './src/AuthProvider/AuthProvider';
import Dashboard from './src/Dashboard/Dashboard';
import SemesterFeeCalculator from './src/Fee/SemesterFeeCalculator';
import CGPACalculator from './src/CGPA/CGPACalculator';
import StudentAnalytics from './src/StudentAnalytics/StudentAnalytics';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


const Stack = createStackNavigator();


const App = () => {

  return (
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <Toaster />
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Login"}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={({ navigation }) => ({
                title: 'EDUvians',
                headerRight: () => <ToggleButtons navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: 'Sign Up',
              }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={({ navigation }) => ({
                title: 'Dashboard',
                headerRight: () => <ToggleButtons navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Semester"
              component={SemesterFeeCalculator}
              options={({ navigation }) => ({
                title: 'SemesterFee',
                headerRight: () => <ToggleButtons navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="CGPA"
              component={CGPACalculator}
              options={({ navigation }) => ({
                title: 'CGPA',
                headerRight: () => <ToggleButtons navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Analytics"
              component={StudentAnalytics}
              options={({ navigation }) => ({
                title: 'Analytics',
                headerRight: () => <ToggleButtons navigation={navigation} />,
              })}
            />
            {/* Add other screens here */}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const ToggleButtons = ({ navigation }) => {
  const {
    user,
    logOut
  } = useContext(AuthContext);
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
  const dash = () => {
    navigation.navigate('Dashboard');
  }

  if (user) {
    return (
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>

          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={dash}>

          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {

  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 10,
    backgroundColor: '#DAA520',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#800000',
    fontSize: 16,
  },
});

export default App;
