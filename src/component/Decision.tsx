import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

type Props = {
  onPress: () => void;
};

export const Decision: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Button onPress={onPress} title="OK" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignSelf: "center",
    minWidth: "95%",
    borderColor: "darkorange",
    backgroundColor: "darkorange",
    borderRadius: 5,
  },
});
