import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  name: "closesquareo" | "closecircleo" | "delete";
  color?: string;
};

const WIDTH = Dimensions.get("window").width;

export const IconButton: React.FC<Props> = ({
  onPress,
  name,
  color = "#0076FF",
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AntDesign name={name} color={color} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: WIDTH * 0.025,
  },
});
