// AnalyticsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const [totalDays, setTotalDays] = useState(0);
  const [averageTime, setAverageTime] = useState('');
  const [firstDate, setFirstDate] = useState('');
  const [lastDate, setLastDate] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const q = query(
          collection(db, 'attendance'),
          where('uid', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (records.length > 0) {
          setTotalDays(records.length);

          let totalMinutes = 0;
          const times = records.map(r => {
            const date = new Date(r.timestamp);
            totalMinutes += date.getHours() * 60 + date.getMinutes();
            return date;
          });

          const avgMinutes = totalMinutes / records.length;
          const avgHour = Math.floor(avgMinutes / 60);
          const avgMin = Math.round(avgMinutes % 60);

          setAverageTime(`${avgHour.toString().padStart(2, '0')}:${avgMin.toString().padStart(2, '0')}`);

          const sortedDates = times.sort((a, b) => a - b);
          setFirstDate(sortedDates[0].toLocaleDateString());
          setLastDate(sortedDates[sortedDates.length - 1].toLocaleDateString());
        }

      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📊 Attendance Insights</Text>

      <View style={styles.card}>
        <Text style={styles.text}>✅ Total Days Attended: {totalDays}</Text>
        <Text style={styles.text}>⏰ Average Check-In Time: {averageTime}</Text>
        <Text style={styles.text}>🗓 First Attendance: {firstDate}</Text>
        <Text style={styles.text}>🗓 Last Attendance: {lastDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#e0f7fa', padding: 20, borderRadius: 10 },
  text: { fontSize: 18, marginBottom: 10 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
