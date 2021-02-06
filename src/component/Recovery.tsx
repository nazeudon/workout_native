import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
/* type */
import { RecoveryType } from "../types/recovery";

type Props = {
  data: string;
  onPress: () => void;
};

export const Recovery: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.recovery}>
        <Text style={styles.text}>{data} 分</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  recovery: {
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: "3%",
    fontSize: 16,
    color: "#333",
  },
});
