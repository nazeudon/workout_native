import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { EditItem } from "../component/EditItem";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "ItemDetail">;
  route: RouteProp<RootStackParamList, "ItemDetail">;
};

export const ItemDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { itemDetail } = route.params;
  const [weights, setWeights] = useState<number>(itemDetail.weights);
  const [times, setTimes] = useState<number>(itemDetail.times);

  // useEffect(() => {
  //   fetchItemDetails();
  // }, []);

  // const fetchItemDetails = async () => {
  //   const res = await getItemDetails(item.id);
  //   setItemDetails(res);
  // };

  // const onPressItemDetail = (itemDeteil: ItemDetailType) => {};

  return (
    <SafeAreaView style={styles.container}>
      <EditItem />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});