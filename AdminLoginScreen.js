import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email !== 'admin@gmail.com') {
      Alert.alert('Access Denied', 'Only the admin can log in here.');
      return;
    }

    signInWithEmailAndPassword(auth, email.trim(), pw)
      .then(() => navigation.replace('Admin'))
      .catch(err => Alert.alert('Login Error', err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ADMIN LOGIN</Text>
      <TextInput
        placeholder="Admin Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#6F4685"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#6F4685"
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#fff0F5', textAlign: 'right', textDecorationLine: 'underline',marginTop: 2,marginBottom: 28, }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6F4685' }]}
        onPress={handleLogin}
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
    color: '#6F4685',
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
    fontWeight: '400',
    fontFamily: 'T',
  },

});
