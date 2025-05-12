// screens/ViewRecordsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function ViewRecordsScreen() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const q = query(collection(db, 'attendance'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecords(data);
      } catch (err) {
        Alert.alert('❌ Error', 'Could not fetch records.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllAttendance();
  }, []);

  const grouped = records.reduce((acc, record) => {
    if (!acc[record.email]) acc[record.email] = [];
    acc[record.email].push(record);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📂 Student Attendance Records</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : Object.keys(grouped).length === 0 ? (
        <Text>No attendance records found.</Text>
      ) : (
        Object.entries(grouped).map(([email, entries]) => (
          <View key={email} style={styles.groupCard}>
            <Text style={styles.studentHeader}>👤 {email}</Text>
            {entries.map(entry => {
              const date = new Date(entry.timestamp);
              return (
                <View key={entry.id} style={styles.recordCard}>
                  <Text> {date.toLocaleDateString()}</Text>
                  <Text> {date.toLocaleTimeString()}</Text>
                 
                </View>
              );
            })}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f2f5' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  groupCard: { backgroundColor: '#fff3e0', padding: 12, borderRadius: 8, marginBottom: 20 },
  studentHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#6a1b9a' },
  recordCard: { backgroundColor: '#fce4ec', padding: 10, borderRadius: 6, marginBottom: 10 }
});
