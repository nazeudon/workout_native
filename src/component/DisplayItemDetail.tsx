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
    alignSelf: "center",
    backgroundColor: "#0076FF",
    maxHeight: "10%",
    minWidth: "95%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 15,
  },
  text: {
    fontSize: 24,
    color: "#eee",
    fontWeight: "bold",
    // fontFamily: "",
  },
});
