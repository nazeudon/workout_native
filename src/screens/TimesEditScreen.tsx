import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const TimesEditScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Weights</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
