import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
/* type */
import { ItemType } from "../types/item";

type Props = {
  data: ItemType;
  onPress: () => void;
};

export const Item: React.FC<Props> = ({ data, onPress }: Props) => {
  const date = data.createdAt.split(" ")[0];
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.items}>
        <View style={styles.desc}>
          <Text style={styles.text}>{date}</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.text}>{date}</Text>
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
  },
  date: {
    marginRight: "3%",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
