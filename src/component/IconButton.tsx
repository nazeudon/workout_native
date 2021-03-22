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
  name: "closecircleo" | "delete" | "filter";
  color?: string;
  size?: number;
  marginLeftRatio?: number;
  marginRightRatio?: number;
};

const WIDTH = Dimensions.get("window").width;

export const IconButton: React.FC<Props> = ({
  onPress,
  name,
  color = "#0076FF",
  size = 32,
  marginLeftRatio,
  marginRightRatio,
}: Props) => {
  const marginLeft = marginLeftRatio ? WIDTH * marginLeftRatio : 0;
  const marginRight = marginRightRatio ? WIDTH * marginRightRatio : 0;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginLeft: marginLeft, marginRight: marginRight }}
    >
      <AntDesign name={name} color={color} size={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});
