import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const SIZE = WIDTH * 0.2;

type Props = {
  iconName: "controller-jump-to-start" | "controller-stop" | "restart";
  onPress: (event: GestureResponderEvent) => void;
};

export const TimerButton: React.FC<Props> = ({ iconName, onPress }: Props) => {
  if (iconName === "restart") {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons name={iconName} color="#fff" size={40} />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Entypo name={iconName} color="#fff" size={40} />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "#004777",
    alignItems: "center",
    justifyContent: "center",
  },
});
