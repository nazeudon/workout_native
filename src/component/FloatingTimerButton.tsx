import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const SIZE = WIDTH * 0.15;

type Props = {
  iconName: "timer-outline";
  onPress: (event: GestureResponderEvent) => void;
};

export const FloatingTimerButton: React.FC<Props> = ({
  iconName,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} color="#fff" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "#0076FF",
    position: "absolute",
    right: SIZE / 2,
    bottom: SIZE * 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
