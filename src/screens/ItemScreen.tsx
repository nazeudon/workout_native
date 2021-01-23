import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { getItemDetails } from "../lib/sqlite";
import { IsNewContext } from "../context/itemDetailContext";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType } from "../types/item";
/* component */
import { ItemDetail } from "../component/ItemDetail";
import { FloatingActionButton } from "../component/FloatingActionButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Item">;
  route: RouteProp<RootStackParamList, "Item">;
};

export const ItemScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { item } = route.params;
  const { setIsNew } = useContext(IsNewContext);
  const [itemDetails, setItemDetails] = useState<ItemDetailType[]>([]);
  const [initItemDetail, setInitItemDetial] = useState<ItemDetailType>({
    id: 0,
    itemsId: item.id,
    setNum: 0,
    weights: 0,
    times: 0,
  });

  useEffect(() => {
    // navigation.addListenerの役割は
    // nabigation.goBack()したときに再レンダーされるように
    const refresh = navigation.addListener("focus", () => {
      fetchItemDetails();
    });
    return refresh;
  }, [navigation]);

  const fetchItemDetails = async () => {
    const res = await getItemDetails(item.id);
    // const maxId = res.reduce((a: any, b: any) => (a.id > b.id ? a : b).id);

    await setItemDetails(res);
    await setInitItemDetial({
      // id: maxId + 1, // これ実際はいらない
      id: 0,
      itemsId: item.id,
      setNum: res.length + 1,
      weights: 0,
      times: 0,
    });
  };

  const onPressItemDetail = (itemDetail: ItemDetailType) => {
    navigation.navigate("ItemDetail", { itemDetail });
  };
  const onPressInsertItemDetail = (itemDetail: ItemDetailType) => {
    setIsNew(true);
    navigation.navigate("ItemDetail", { itemDetail });
  };

  return (
    <>
      <View style={styles.descs}>
        <View style={styles.desc}>
          <Text style={styles.textDec}>セット</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>挙上重量</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>回数</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.textDate}>総挙上重量</Text>
        </View>
      </View>
      <SafeAreaView style={styles.list}>
        <SwipeListView
          data={itemDetails}
          renderItem={({ item }: { item: ItemDetailType }) => (
            <ItemDetail data={item} onPress={() => onPressItemDetail(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={(data, rowMap) => <Text>Left</Text>}
        />
        <FloatingActionButton
          iconName="plus"
          onPress={() => onPressInsertItemDetail(initItemDetail)}
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
