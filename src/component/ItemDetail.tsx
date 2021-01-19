import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
/* type */
import { ItemDetailType } from "../types/item";

type Props = {
  data: ItemDetailType;
  onPress: () => void;
};

export const ItemDetail: React.FC<Props> = ({ data, onPress }: Props) => {
  const volume: number = data.weights * data.times;

  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.item}>
        <View style={styles.sets}>
          <Text style={styles.text}>{data.setNum}セット</Text>
        </View>
        <View style={styles.separate1}>
          <Text style={styles.text}>/</Text>
        </View>
        <View style={styles.weights}>
          <Text style={styles.text}>{data.weights}kg</Text>
        </View>
        <View style={styles.separate2}>
          <Text style={styles.text}>/</Text>
        </View>
        <View style={styles.times}>
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
    position: "relative",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    // borderColor: "#0076FF",
    flexDirection: "row",
    alignItems: "center",
  },
  sets: {
    marginLeft: "3%",
  },
  weights: {
    position: "absolute",
    right: "63%",
  },
  times: {
    width: "10%",
    position: "absolute",
    left: "43%",
  },
  text: {
    alignSelf: "flex-end",
    fontSize: 16,
    color: "#333",
  },
  volume: {
    marginLeft: "auto",
    marginRight: "3%",
  },
  separate1: {
    marginHorizontal: "1%",
    position: "absolute",
    left: "18%",
  },
  separate2: {
    marginHorizontal: "1%",
    position: "absolute",
    left: "38%",
  },
});
