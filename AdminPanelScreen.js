// screens/AdminPanelScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function AdminPanelScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Admin Panel</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4caf50' }]}
        onPress={() => navigation.navigate('CreateStudent')}
      >
        <Text style={styles.buttonText}> Create Student Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196f3' }]}
        onPress={() => navigation.navigate('ViewRecords')}
      >
        <Text style={styles.buttonText}> View Student Records</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f44336' }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}> Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 30 },
  button: {
    width: '80%',
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
