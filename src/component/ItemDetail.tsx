import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
/* type */
import { ItemDetailType } from "../types/item";

type Props = {
  data: ItemDetailType;
  onPress: () => void;
};

export const ItemDetail: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text>{data.setNum}セット目</Text>
      <Text>{data.weights}kg</Text>
      <Text>{data.times}回</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
