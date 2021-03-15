import React, { useContext } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
/* type */
/* component */
import { Icon } from "./Icon";
/* context */
import { recoveryContext } from "../context/recoveryContext";

type Props = {
  onPress: () => void;
};

export const Recovery = ({ onPress }: Props) => {
  const { recovery } = useContext(recoveryContext);
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.container}>
        <View style={styles.recovery}>
          <Text style={styles.text}>{recovery} 分</Text>
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
