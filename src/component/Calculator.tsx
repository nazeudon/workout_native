import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  data: number;
  // onPress: () => void;
};

export const Calculator: React.FC<Props> = ({ data }: Props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>{data}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    width: "30%",
    padding: "1.6%",
    margin: "1.7%",
    borderWidth: 1,
    borderColor: "#ACACBA",
    borderRadius: 10,
    alignItems: "center",
  },
});
