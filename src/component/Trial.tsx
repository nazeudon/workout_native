import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
/* type */

type Props = {
  data: string;
  onPress: () => void;
};

export const Trial: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.trial}>
        <Text style={styles.text}>{data} 種目目</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  trial: {
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
