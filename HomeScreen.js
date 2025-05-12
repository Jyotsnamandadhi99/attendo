import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoadingLocation(false);
    })();
  }, []);

  const CLASSROOM_COORDS = {
    latitude: 17.357377,
    longitude: 78.508046
  };

  function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const handleMarkAttendance = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available.');
      return;
    }

    const { latitude, longitude } = location.coords;
    const distance = getDistanceFromLatLonInMeters(
      latitude,
      longitude,
      CLASSROOM_COORDS.latitude,
      CLASSROOM_COORDS.longitude
    );

    if (distance > 100) {
      Alert.alert('Too far!', `You're ${Math.round(distance)} meters away from the classroom.`);
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      await addDoc(collection(db, 'attendance'), {
        uid: user.uid,
        email: user.email,
        latitude,
        longitude,
        timestamp
      });

      Alert.alert('Success ✅', 'Attendance marked successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      Alert.alert('Error ❌', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error ❌', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Welcome,</Text>
      <Text style={styles.email}>{user?.email}</Text>

      {loadingLocation ? (
        <ActivityIndicator size="large" color="#6200ee" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton title=" Mark Attendance" onPress={handleMarkAttendance} color="#4caf50" />
          <CustomButton title=" View Attendance" onPress={() => navigation.navigate('Attendance')} color="#03a9f4" />
          <CustomButton title=" View Analytics" onPress={() => navigation.navigate('Analytics')} color="#2196f3" />
          <CustomButton title=" Logout" onPress={handleLogout} color="#f44336" />
        </View>
      )}
    </View>
  );
}

function CustomButton({ title, onPress, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 40, color: '#333' },
  email: { fontSize: 18, color: '#666', marginBottom: 30 },
  buttonContainer: { width: '100%', alignItems: 'center' },
  button: {
    width: '90%',
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
