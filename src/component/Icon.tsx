import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  name: "right" | "up" | "down" | "check";
  color?: string;
};

export const Icon: React.FC<Props> = ({ name, color = "#0076FF" }: Props) => {
  return <AntDesign name={name} color={color} size={18} />;
};

const styles = StyleSheet.create({
  container: {},
});
