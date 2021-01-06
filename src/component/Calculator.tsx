import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  data: number | string;
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
    width: "31%",
    paddingVertical: "5%",
    margin: "1.17%",
    borderWidth: 1,
    borderColor: "#ACACBA",
    borderRadius: 5,
    alignItems: "center",
  },
});
