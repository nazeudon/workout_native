import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType } from "../types/item";
/* component */
import { EditItem } from "../component/EditItem";
import { DisplayItemDetail } from "../component/DisplayItemDetail";

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

  //   const onPressItemDetail = (itemDeteil: ItemDetailType) => {};

  return (
    <SafeAreaView style={styles.container}>
      <DisplayItemDetail data={itemDetail} />
      <EditItem data={itemDetail} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
