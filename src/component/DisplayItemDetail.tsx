import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
/* type */
import { ItemDetailType } from "../types/item";
/* context */
import { WeightsContext } from "../context/weightsContext";
import { TimesContext } from "../context/timesContext";

type Props = {
  data: ItemDetailType;
  // onPress: () => void;
};

export const DisplayItemDetail: React.FC<Props> = ({ data }: Props) => {
  const { weights, setWeights } = useContext(WeightsContext);
  const { times, setTimes } = useContext(TimesContext);

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
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
    maxHeight: "15%",
    minWidth: "95%",
    marginVertical: "5%",
    borderRadius: 5,
    backgroundColor: "#0076FF",
  },
  text: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    // fontFamily: "",
  },
});
