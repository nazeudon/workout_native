import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { getItems, InsertItem } from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemType, ItemDetailType } from "../types/item";
/* component */
import { Item } from "../component/Item";
/* context */
import { ItemContext } from "../context/itemContext";
import { FloatingActionButton } from "../component/FloatingActionButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Event">;
  route: RouteProp<RootStackParamList, "Event">;
};

export const EventScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { event } = route.params;
  const [items, setItems] = useState<ItemType[]>([]);
  const [insertItemsId, setInserItemsId] = useState<number>(0);
  const { setItem } = useContext(ItemContext);

  const initItem: ItemType = {
    id: 0,
    eventId: event.id,
    createdAt: "",
  };

  const initItemDetail: ItemDetailType = {
    id: 0,
    itemsId: insertItemsId,
    setNum: 1,
    weights: 0,
    times: 0,
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getItems(event.id);
    setItems(res);
  };

  const fetchInsertItem = async () => {
    const res: number = await InsertItem(initItem.eventId);
    setInserItemsId(res);
  };

  const onPressItem = (item: ItemType) => {
    setItem(item.createdAt);
    navigation.navigate("Item", { item });
  };

  const onPressInsertItem = async (item: ItemType) => {
    await fetchInsertItem();
    navigation.navigate("Item", { item });
  };

  return (
    <>
      <View style={styles.descs}>
        <View style={styles.desc}>
          <Text style={styles.textDec}>総セット数</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>総挙上重量</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>推定Max重量</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.textDate}>年-月-日</Text>
        </View>
      </View>
      <SafeAreaView style={styles.list}>
        <SwipeListView
          data={items}
          renderItem={({ item }: { item: ItemType }) => (
            <Item data={item} onPress={() => onPressItem(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={(data, rowMap) => <Text>Left</Text>}
        />
      </SafeAreaView>
      <FloatingActionButton iconName="plus" onPress={() => onPressInsertItem} />
    </>
  );
};

const styles = StyleSheet.create({
  descs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  desc: {
    marginTop: "3%",
    marginLeft: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    marginTop: "3%",
    marginRight: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  textDec: {
    color: "#555",
  },
  separate: {
    color: "#555",
    marginHorizontal: "1%",
  },
  textDate: {
    color: "#555",
  },
  list: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
