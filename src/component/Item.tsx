import React from "react";
import { StyleSheet, Text, View } from "react-native";
/* type */
import { ItemType } from "../types/item";

type Props = {
  data: ItemType;
  //   onPress: () => void;
};

export const Item: React.FC<Props> = ({ data }: Props) => {
  return (
    <View>
      <Text>{data.createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
