import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { IsNewEventContext } from "../context/isNew";

type Props = {
  onPress: () => void;
};

export const AddEventButton: React.FC<Props> = ({ onPress }: Props) => {
  const { isNewEvent } = useContext(IsNewEventContext);
  const buttonText = isNewEvent ? "追加" : "完了";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: "darkorange",
    backgroundColor: "darkorange",
    borderRadius: 5,
    marginHorizontal: "3%",
    marginBottom: "5%",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    padding: "2%",
  },
});
