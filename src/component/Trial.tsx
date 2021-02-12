import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
/* type */
/* component */
import { Icon } from "./Icon";

type Props = {
  data: string;
  onPress: () => void;
};

export const Trial: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.container}>
        <View style={styles.trial}>
          <Text style={styles.text}>{data} 種目目</Text>
        </View>
        <View style={styles.icon}>
          <Icon name="right" />
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
    flexDirection: "row",
    alignItems: "center",
  },
  trial: {
    flexDirection: "row",
    marginLeft: "3%",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: "auto",
    marginRight: "3%",
  },
});
