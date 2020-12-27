import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const imagePath = require("../statics/img/maccho.png");

export const EventsList: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.event}>
        <Image style={styles.image} source={imagePath} />
        <Text style={styles.text}>ベンチプレス</Text>
      </View>
      <View style={styles.event}>
        <Image style={styles.image} source={imagePath} />
        <Text style={styles.text}>ベンチプレス</Text>
      </View>
      <View style={styles.event}>
        <Image style={styles.image} source={imagePath} />
        <Text style={styles.text}>ベンチプレス</Text>
      </View>
      <View style={styles.event}>
        <Image style={styles.image} source={imagePath} />
        <Text style={styles.text}>ベンチプレス</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexWrap: "wrap",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  event: {
    display: "flex",
    width: "45%",
    padding: "2.5%",
    margin: "2.5%",
    borderWidth: 1,
    borderColor: "#ACACBA",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    marginTop: -20,
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
