import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  name: "right" | "up" | "down" | "check" | "filter-variant";
  color?: string;
  size?: number;
};

export const Icon: React.FC<Props> = ({
  name,
  color = "#0076FF",
  size = 18,
}: Props) => {
  if (name === "filter-variant") {
    return <MaterialCommunityIcons name={name} color={color} size={size} />;
  } else {
    return <AntDesign name={name} color={color} size={size} />;
  }
};

const styles = StyleSheet.create({
  container: {},
});
