import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  onPress: () => void;
};

export const Decision: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <>
      {/* <View style={styles.container}>
        <Button onPress={onPress} title="OK" color="#fff" />
      </View> */}
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.text}>OK</Text>
        </View>
      </TouchableOpacity>
    </>
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
    marginBottom: "15%",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 28,
    padding: "2%",
  },
});
