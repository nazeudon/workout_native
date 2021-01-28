import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import {
  getItem,
  getItems,
  InsertItem,
  InsertInitItemDetails,
} from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemType } from "../types/item";
/* component */
import { Item } from "../component/Item";
/* context */
import { FloatingActionButton } from "../component/FloatingActionButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Event">;
  route: RouteProp<RootStackParamList, "Event">;
};

export const EventScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { event } = route.params;
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: event.event,
    });
  }, [event]);

  useEffect(() => {
    // navigation.addListenerの役割は
    // nabigation.goBack()したときに再レンダーされるように
    const refresh = navigation.addListener("focus", () => {
      fetchGetItems();
    });
    return refresh;
  }, [navigation]);

  const fetchGetItems = async () => {
    const res = await getItems(event.id);
    setItems(res);
  };

  const fetchInsertItem = async () => {
    const res: number = await InsertItem(event.id);
    return res;
  };

  const fetchInsertInitItemDetail = async (id: number) => {
    const res: number = await InsertInitItemDetails(id, 1, 0, 0);
  };

  const fetchGetItem = async (id: number) => {
    const res = await getItem(id);
    return res;
  };

  const onPressItem = (item: ItemType) => {
    navigation.navigate("Item", { item });
  };

  const onPressInsertItem = async () => {
    const id = await fetchInsertItem();
    await fetchInsertInitItemDetail(id);
    const items: ItemType[] = await fetchGetItem(id);
    const item: ItemType = await items[0];
    await navigation.navigate("Item", { item });
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
      <FloatingActionButton
        iconName="plus"
        onPress={async () => await onPressInsertItem()}
      />
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
