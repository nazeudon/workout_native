import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  data: number | string;
  // onPress: () => void;
};

export const Calculator: React.FC<Props> = ({ data }: Props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{data}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: "7%",
    marginBottom: "3%",
    margin: "1%",
    borderWidth: 1,
    borderColor: "#0076FF",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
