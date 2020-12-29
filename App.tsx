import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";
// import { EventsList } from "./src/component/EventsList";

const App = () => {
  return (
    // <SafeAreaView style={styles.container}>
    //   <EventsList />
    // </SafeAreaView>
    <AppNavigator />
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
