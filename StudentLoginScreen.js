import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function StudentLoginScreen() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, studentId.trim(), password)
      .then(() => navigation.replace('Home'))
      .catch(err => Alert.alert('Login Error', err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>STUDENT LOGIN</Text>
      <TextInput
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
        style={styles.input}
        placeholderTextColor="#6F4685"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        placeholderTextColor="#6F4685"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#fff0F5', textAlign: 'right', marginTop: 2,marginBottom: 28,textDecorationLine: 'underline' }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
                style={[styles.button, { backgroundColor: '#6F4685' }]}
                onPress={() => navigation.navigate('AdminLogin')}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#7B679A', padding: 16 },
  heading: { 
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'BOLD',
    fontFamily: 'T',
    color: 'white',
    letterSpacing: 1,
    
    marginTop: 15, 
    marginBottom: 28,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#fff0F5',
    backgroundColor: '#fff0F5',
    marginBottom: 8, 
    padding: 18, 
    marginTop: 15, 
    borderRadius: 15,
    width: '100%',
    color: '#6F4685' 
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 30,
    color: '#fff0F5',
    fontWeight: '500',
    fontFamily: 'T',
    
  },
  button: {
    width: '40%',
    padding: 18,
    borderRadius: 100,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'T',
    fontWeight: '400',
    
    
  },
  
});
