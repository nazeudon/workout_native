import React from "react";
import { StyleSheet, Text, View } from "react-native";
/* type */
import { ItemDetailType } from "../types/item";

type Props = {
  data: ItemDetailType;
  onPress: () => void;
};

export const ItemDetail: React.FC<Props> = ({ data, onPress }: Props) => {
  return (
    <View>
      <Text>{data.weights}</Text>
      <Text>{data.times}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
