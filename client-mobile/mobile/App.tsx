
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import dotenv from 'dotenv';


dotenv.config();

//const ip = process.env.IP as string

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <WebView source={{ uri: '192.168.35.25:5173'  }} style={styles.container} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
