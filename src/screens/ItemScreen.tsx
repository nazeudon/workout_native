import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { getItemDetails } from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType } from "../types/item";
/* component */
import { ItemDetail } from "../component/ItemDetail";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Item">;
  route: RouteProp<RootStackParamList, "Item">;
};

export const ItemScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { item } = route.params;
  const [itemDetails, setItemDetails] = useState<ItemDetailType[]>([]);

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    const res = await getItemDetails(item.id);
    setItemDetails(res);
  };

  const onPressItemDetail = (itemDetail: ItemDetailType) => {
    navigation.navigate("ItemDetail", { itemDetail });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={itemDetails}
        renderItem={({ item }: { item: ItemDetailType }) => (
          <ItemDetail data={item} onPress={() => onPressItemDetail(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        renderHiddenItem={(data, rowMap) => <Text>Left</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});