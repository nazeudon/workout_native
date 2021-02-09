import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
/* lib */
/* type */
import { ItemType } from "../types/item";

type Props = {
  data: ItemType;
  onPress: () => void;
};

export const Item: React.FC<Props> = ({ data, onPress }: Props) => {
  const createdAt = data.createdAt.split(" ")[0];
  const sets = data.sets;
  const totalWeights = data.totalWeights;

  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.items}>
        <View style={styles.desc}>
          <Text style={styles.text}>{sets}セット</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.text}>min</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.text}>{totalWeights}kg</Text>
        </View>
        <View style={styles.createdAt}>
          <Text style={styles.text}>{createdAt}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  items: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    // borderColor: "#0076FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  desc: {
    marginLeft: "3%",
    flexDirection: "row",
  },
  createdAt: {
    marginRight: "3%",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  separate: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: "2%",
  },
});
