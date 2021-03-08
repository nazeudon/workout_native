import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import {
  getItem,
  getItems,
  getRecoveryByEventId,
  getTrialByEventId,
  InsertItem,
  InsertInitItemDetails,
  InsertInitRecovery,
  InsertInitTrial,
  DeleteItem,
  DeleteItemDetailByItemsId,
  DeleteRecoveryByItemsId,
  DeleteTrialByItemsId,
} from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemType } from "../types/item";
import { RecoveryType } from "../types/recovery";
import { TrialType } from "../types/trial";
/* component */
import { Item } from "../component/Item";
import { IconButton } from "../component/IconButton";
/* context */
import { FloatingActionButton } from "../component/FloatingActionButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Event">;
  route: RouteProp<RootStackParamList, "Event">;
};

export const EventScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { event } = route.params;
  const [items, setItems] = useState<ItemType[]>([]);
  const [recoverys, setRecoverys] = useState<RecoveryType[]>([]);
  const [trials, setTrials] = useState<TrialType[]>([]);

  const forItems = items.map((item, idx) => ({
    item: item,
    recovery: recoverys[idx],
    trial: trials[idx],
  }));

  useEffect(() => {
    navigation.setOptions({
      title: event.event,
    });
  }, [event]);

  useEffect(() => {
    // navigation.addListenerの役割は
    // nabigation.goBack()したときに再レンダーされるように
    const refresh = navigation.addListener("focus", () => {
      // なぜかfetchの順番逆だとrecoverysの配列が空になる
      fetchGetRecoveryByEventId();
      fetchGetTrialByEventId();
      fetchGetItems();
    });
    return refresh;
  }, [navigation]);

  const fetchGetItems = async () => {
    const res = await getItems(event.id);
    setItems(res);
  };

  const fetchGetRecoveryByEventId = async () => {
    const res = await getRecoveryByEventId(event.id);
    setRecoverys(res);
  };

  const fetchGetTrialByEventId = async () => {
    const res = await getTrialByEventId(event.id);
    setTrials(res);
  };

  const fetchInsertItem = async () => {
    const res: number = await InsertItem(event.id);
    return res;
  };

  const fetchInsertInitItemDetail = async (itemsId: number) => {
    const res: number = await InsertInitItemDetails(itemsId, 0, 0);
  };

  const fetchGetItem = async (id: number) => {
    const res = await getItem(id);
    return res;
  };

  const fetchInsertInitRecovery = async (itemsId: number) => {
    const res: number = await InsertInitRecovery(itemsId, 0, event.id);
  };

  const fetchInsertInitTrial = async (itemsId: number) => {
    const res: number = await InsertInitTrial(itemsId, 1, event.id);
  };

  const onPressItem = (item: ItemType) => {
    navigation.navigate("Item", { item });
  };

  const onPressInsertItem = async () => {
    const itemsId = await fetchInsertItem();
    await fetchInsertInitItemDetail(itemsId);
    await fetchInsertInitRecovery(itemsId);
    await fetchInsertInitTrial(itemsId);
    const items: ItemType[] = await fetchGetItem(itemsId);
    const item: ItemType = await items[0];
    await navigation.navigate("Item", { item });
  };

  const onPressDeleteItem = async (
    rowMap: any,
    item: ItemType,
    index: number
  ) => {
    await closeRow(rowMap, index);
    DeleteItem(item.id);
    DeleteItemDetailByItemsId(item.id);
    DeleteRecoveryByItemsId(item.id);
    DeleteTrialByItemsId(item.id);
    fetchGetItems();
  };

  const closeRow = (rowMap: any, rowKey: any) => {
    // https://snack.expo.io/@rollindeep/react-native-swipe-list-view
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const sections = [
    {
      title: (
        <View style={styles.descs}>
          <View style={styles.desc}>
            <Text style={styles.textDec}>総セット数</Text>
            <Text style={styles.separate}>/</Text>
            <Text style={styles.textDec}>種目目</Text>
            <Text style={styles.separate}>/</Text>
            <Text style={styles.textDec}>リカバリー</Text>
            <Text style={styles.separate}>/</Text>
            <Text style={styles.textDec}>総挙上重量</Text>
            {/* <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>推定Max重量</Text> */}
          </View>
          <View style={styles.date}>
            <Text style={styles.textDate}>年-月-日</Text>
          </View>
        </View>
      ),
      data: forItems,
    },
  ];

  return (
    <>
      {/* <View style={styles.descs}>
        <View style={styles.desc}>
          <Text style={styles.textDec}>総セット数</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>種目目</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>リカバリー</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>総挙上重量</Text> */}
      {/* <Text style={styles.separate}>/</Text>
          <Text style={styles.textDec}>推定Max重量</Text> */}
      {/* </View>
        <View style={styles.date}>
          <Text style={styles.textDate}>年-月-日</Text>
        </View>
      </View> */}
      <SafeAreaView style={styles.list}>
        <SwipeListView
          useSectionList
          sections={sections}
          // data={forItems}
          renderSectionHeader={({ section: { title } }) => title}
          renderItem={({
            item,
          }: {
            item: { item: ItemType; recovery: RecoveryType; trial: TrialType };
          }) => <Item data={item} onPress={() => onPressItem(item.item)} />}
          keyExtractor={(_, index) => index.toString()}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.delete}>
              <IconButton
                name="delete"
                color={"#fff"}
                onPress={() =>
                  onPressDeleteItem(rowMap, data.item.item, data.index)
                }
              />
            </View>
          )}
          rightOpenValue={-72}
          stopRightSwipe={-72}
          disableRightSwipe={true}
          closeOnRowBeginSwipe={true}
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
    marginBottom: "1%",
    // backgroundColor: "#eee",
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
  delete: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // marginRight: WIDTH * 0.05,
    paddingRight: 20,
    marginLeft: 50, //背景の赤色が見えないように
    backgroundColor: "#ff3b30",
  },
});
