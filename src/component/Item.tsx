import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
/* lib */
/* type */
import { ItemType } from "../types/item";
import { RecoveryType } from "../types/recovery";

type Props = {
  data: { item: ItemType; recovery: RecoveryType };
  onPress: () => void;
};

export const Item: React.FC<Props> = ({ data, onPress }: Props) => {
  const createdAt = data.item.createdAt.split(" ")[0];
  const sets = data.item.sets;
  const totalWeights = data.item.totalWeights;
  // console.log(data);
  const recovery = data.recovery.min;

  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.items}>
        <View style={styles.desc}>
          <Text style={styles.text}>{sets}セット</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.text}>{recovery}min</Text>
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
