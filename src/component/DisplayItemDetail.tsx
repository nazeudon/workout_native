import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
/* type */
import { ItemDetailType } from "../types/item";

type Props = {
  data: ItemDetailType;
  // onPress: () => void;
};

export const DisplayItemDetail: React.FC<Props> = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.weights} Kg</Text>
      <Text style={styles.text}> / </Text>
      <Text style={styles.text}>{data.times} 回</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    maxHeight: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // margin: 10,
    // paddingLeft: 10,
  },
  text: {
    fontSize: 24,
  },
});
