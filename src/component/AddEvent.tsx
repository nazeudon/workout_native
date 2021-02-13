import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export const AddEvent = () => {
  const [eventName, setEventName] = useState<string>();

  return (
    <View>
      <Text>種目名</Text>
      <TextInput
        style={styles.eventNameInput}
        value={eventName}
        onChangeText={(text) => setEventName(text)}
        keyboardType="default"
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventNameInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#0076FF",
    backgroundColor: "#fff",
    paddingVertical: "2%",
    marginHorizontal: "3%",
  },
});
