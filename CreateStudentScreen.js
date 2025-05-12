// screens/CreateStudentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function CreateStudentScreen() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleCreate = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), pw);
      Alert.alert('✅ Success', 'Student account created!');
      setEmail('');
      setPw('');
    } catch (err) {
      Alert.alert('❌ Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Create Student Account</Text>
      <TextInput
        placeholder="Student ID"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4 }
});
