import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { getItems } from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemType } from "../types/item";
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
  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={({ item }: { item: ItemType }) => <Item data={item} />}
        keyExtractor={(item, index) => index.toString()}
        // numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
