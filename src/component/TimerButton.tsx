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
const SIZE = WIDTH * 0.22;

type Props = {
  iconName: "controller-jump-to-start" | "controller-stop" | "restart";
  onPress: (event: GestureResponderEvent) => void;
  disable?: boolean;
};

export const TimerButton: React.FC<Props> = ({
  iconName,
  onPress,
  disable,
}: Props) => {
  if (iconName === "restart") {
    const backgroundColor = disable ? "#9EA0A4" : "#004777";
    return (
      <TouchableOpacity
        style={{ ...styles.container, backgroundColor: backgroundColor }}
        onPress={onPress}
        disabled={disable}
      >
        <MaterialCommunityIcons name={iconName} color="#fff" size={50} />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Entypo name={iconName} color="#fff" size={50} />
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
