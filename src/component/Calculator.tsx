import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
/* context */
import { SegmentContext } from "../context/segmentContext";

type Props = {
  data: string;
  onPress: () => void;
};

export const Calculator: React.FC<Props> = ({ data, onPress }: Props) => {
  const { segment } = useContext(SegmentContext);
  if (segment === "times" && data === ".") {
    return <View style={styles.unvisible}></View>;
  } else if (segment === "recovery" && data === ".") {
    return <View style={styles.unvisible}></View>;
  } else {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{data}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: "7%",
    marginVertical: "1%",
    marginHorizontal: "1%",
    borderWidth: 1,
    borderColor: "#0076FF",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  unvisible: {
    flex: 1,
    paddingVertical: "7%",
    marginBottom: "3%",
    margin: "1%",
    borderWidth: 1,
    borderColor: "#eee",
  },
});
