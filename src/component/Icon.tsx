import React from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  name: "right";
  color?: string;
};

export const Icon: React.FC<Props> = ({ name, color = "#0076FF" }: Props) => {
  return <AntDesign name={name} color={color} size={18} />;
};

const styles = StyleSheet.create({
  container: {},
});
