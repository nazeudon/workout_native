import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { getItems } from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemType, ItemDetailType } from "../types/item";
/* component */
import { Item } from "../component/Item";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Event">;
  route: RouteProp<RootStackParamList, "Event">;
};

export const EventScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { event } = route.params;
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getItems(event.id);
    setItems(res);
  };

  const onPressItem = (item: ItemType) => {
    // setEvent(event.event);
    navigation.navigate("Item", { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={items}
        renderItem={({ item }: { item: ItemType }) => (
          <Item data={item} onPress={() => onPressItem(item)} />
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
