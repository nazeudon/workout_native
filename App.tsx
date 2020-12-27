import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import { Event } from "./src/component/Event";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Event />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
