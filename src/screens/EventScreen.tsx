import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
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
/* context */
import { ItemContext } from "../context/itemContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Event">;
  route: RouteProp<RootStackParamList, "Event">;
};

export const EventScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { event } = route.params;
  const [items, setItems] = useState<ItemType[]>([]);
  const { setItem } = useContext(ItemContext);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getItems(event.id);
    setItems(res);
  };

  const onPressItem = (item: ItemType) => {
    setItem(item.createdAt);
    navigation.navigate("Item", { item });
  };

  return (
    <>
      <View style={styles.descs}>
        <View style={styles.desc}>
          <Text style={styles.textDec}>Volume(総挙上重量)(kg)</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>推定Max重量(kg)</Text>
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
