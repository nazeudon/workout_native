import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  onPress: () => void;
};

export const AddEventButton: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>新規追加</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "darkorange",
    backgroundColor: "darkorange",
    borderRadius: 5,
    marginHorizontal: "3%",
    marginBottom: "15%",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    padding: "2%",
  },
});
