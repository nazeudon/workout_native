import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import { EventsList } from "./src/component/EventsList";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <EventsList />
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
