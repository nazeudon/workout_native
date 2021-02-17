import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
/* type */
/* component */
import { Icon } from "./Icon";

type Props = {
  data: string;
  onPress: () => void;
};

export const Recovery: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.container}>
        <View style={styles.recovery}>
          <Text style={styles.text}>{data} 分</Text>
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
  recovery: {
    flexDirection: "row",
    marginLeft: "3%",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: "auto",
    marginRight: "1%",
  },
});
