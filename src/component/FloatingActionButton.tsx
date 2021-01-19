import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const SIZE = WIDTH * 0.15;

type Props = {
  iconName: "plus";
  onPress: (event: GestureResponderEvent) => void;
};

export const FloatingActionButton: React.FC<Props> = ({
  iconName,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Feather name={iconName} color="#fff" size={30} />
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
    bottom: SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
