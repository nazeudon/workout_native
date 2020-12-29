import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
/* types */
import { EventData } from "../types/event";

const imagePath = require("../statics/img/maccho.png");

type Props = {
  data: EventData;
};

export const Event: React.FC<Props> = ({ data }: Props) => {
  return (
    <View style={styles.event}>
      <Image style={styles.image} source={imagePath} />
      <Text style={styles.text}>{data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
