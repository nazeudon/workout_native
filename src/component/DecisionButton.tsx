import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  onPress: () => void;
};

export const Decision: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>OK</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    alignSelf: "center",
    minWidth: "95%",
    borderColor: "darkorange",
    backgroundColor: "darkorange",
    borderRadius: 5,
    marginBottom: "5%",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 28,
    padding: "2%",
  },
});
