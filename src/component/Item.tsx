import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
/* type */
import { ItemType } from "../types/item";

type Props = {
  data: ItemType;
  onPress: () => void;
};

export const Item: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{data.createdAt}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  item: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10,
  },
});
