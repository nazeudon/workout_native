import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const imagePath = require("../statics/img/maccho.png");

export const Event: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={imagePath} />
      <View style={styles.textContent}>
        <Text style={styles.text}>ベンチプレス</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  textContent: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
