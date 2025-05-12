// AttendanceScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function AttendanceScreen() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const q = query(
          collection(db, 'attendance'),
          where('uid', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const renderItem = ({ item }) => {
    const date = new Date(item.timestamp);
    return (
      <View style={styles.card}>
        <Text style={styles.text}> {date.toLocaleDateString()}</Text>
        <Text style={styles.text}> {date.toLocaleTimeString()}</Text>
       
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={records}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No attendance records found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 12,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2
  },
  text: { fontSize: 16 }
});
