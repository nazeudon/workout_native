import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
/* type */
import { ItemDetailType } from "../types/item";

type Props = {
  data: ItemDetailType;
  index: number;
  onPress: () => void;
};

export const ItemDetail: React.FC<Props> = ({
  data,
  index,
  onPress,
}: Props) => {
  const volume: number = data.weights * data.times;

  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.item}>
        <View style={styles.desc}>
          <Text style={styles.text}>{index + 1}セット目</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.text}>{data.weights}kg</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.text}>{data.times}回</Text>
        </View>
        <View style={styles.volume}>
          <View>
            <Text style={styles.text}>{volume}kg</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    marginLeft: "3%",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  separate: {
    marginHorizontal: "2%",
    fontSize: 16,
    color: "#333",
  },
  volume: {
    marginLeft: "auto",
    marginRight: "3%",
  },
});
