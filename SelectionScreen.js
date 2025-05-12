import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SelectionScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top logo area */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')} // Replace with your logo path
          style={styles.imageLogo}
        />
        <Text style={styles.logo}>ATTENDO</Text>
        <Text style={styles.caption}>Your smart attendance board</Text>
      </View>

      {/* Spacer pushes buttons to center/bottom */}
      <View style={styles.spacer} />

      {/* Button area */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6F4685' }]}
          onPress={() => navigation.navigate('StudentLogin')}
        >
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6F4685' }]}
          onPress={() => navigation.navigate('AdminLogin')}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B679A',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  imageLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 1,
    borderRadius: 80,
  },
  logo: {
    fontSize: 65,
    fontWeight: 'bold',
    fontFamily: 'B',
    color: '#fff0F5',
    letterSpacing: 1,
    marginTop: 15, // space below image
  },
  caption: {
    fontSize: 19,
    color: '#fff0F5',
    fontFamily: 'B',
    marginTop: 1, // space below ATTENDO
  },
  spacer: {
    flex: 1,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 190,
  },
  button: {
    width: '72%',
    padding: 20,
    borderRadius: 30,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff0F5',
    fontSize: 25,
    fontFamily: 'B',
    fontWeight: '400',
  },
});
