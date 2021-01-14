import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType } from "../types/item";
/* component */
import { DisplayItemDetail } from "../component/DisplayItemDetail";
import { SegmentedControl } from "../component/SegmentedControl";
import { Decision } from "../component/Decision";
/* screen */
import { NumberInputScreen } from "../screens/NumberInputScreen";
/* context */
import { WeightsContext } from "../context/weightsContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "ItemDetail">;
  route: RouteProp<RootStackParamList, "ItemDetail">;
};

export const ItemDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { itemDetail } = route.params;
  const { setWeights } = useContext(WeightsContext);

  useEffect(() => {
    const weights = itemDetail.weights.toFixed(1);
    setWeights(weights);
  }, []);

  const onPressDecision = () => {
    console.log("Decision");
  };

  return (
    <SafeAreaView style={styles.container}>
      <DisplayItemDetail data={itemDetail} />
      <SegmentedControl />
      <NumberInputScreen />
      <Decision onPress={onPressDecision} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
