import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
/* type */
import { ItemDetailType } from "../types/item";

type Props = {
  data: ItemDetailType;
  onPress: () => void;
};

export const ItemDetail: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.container}>
        <View style={styles.sets}>
          <Text style={styles.text}>{data.setNum}セット</Text>
        </View>
        <View style={styles.separate}>
          <Text style={styles.text}>/</Text>
        </View>
        <View style={styles.weights}>
          <Text style={styles.text}>{data.weights}kg</Text>
        </View>
        <View style={styles.separate}>
          <Text style={styles.text}>/</Text>
        </View>
        <View style={styles.times}>
          <Text style={styles.text}>{data.times}回</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    // borderColor: "#0076FF",
    padding: 10,
    margin: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sets: {
    width: "20%",
  },
  weights: {
    width: "14%",
  },
  times: {
    width: "10%",
  },
  text: {
    alignSelf: "flex-end",
    fontSize: 16,
    color: "#333",
  },
  separate: {
    width: "3%",
  },
});
