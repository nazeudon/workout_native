import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { DeleteItemDetail, getItemDetails, getRecovery } from "../lib/sqlite";
/* context */
import { IsNewContext } from "../context/itemDetailContext";
import { SegmentContext } from "../context/segmentContext";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType } from "../types/item";
import { RecoveryType } from "../types/recovery";
/* component */
import { ItemDetail } from "../component/ItemDetail";
import { Recovery } from "../component/Recovery";
import { FloatingActionButton } from "../component/FloatingActionButton";
import { IconButton } from "../component/IconButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Item">;
  route: RouteProp<RootStackParamList, "Item">;
};

export const ItemScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { item } = route.params;
  const { setIsNew } = useContext(IsNewContext);
  const { setSegment } = useContext(SegmentContext);
  const [itemLength, setItemLength] = useState<number>(0);
  const [recovery, setRecovery] = useState<RecoveryType[]>([]);
  const [itemDetails, setItemDetails] = useState<ItemDetailType[]>([]);
  const [initItemDetail, setInitItemDetial] = useState<ItemDetailType>({
    id: 0,
    itemsId: item.id,
    weights: 0,
    times: 0,
  });

  const sections = [
    {
      title: "セット / 挙上重量 / 回数",
      data: itemDetails.map((itemDetail) => ({ ...itemDetail, type: "item" })),
    },
    // { title: "リカバリー", data: [{ type: "rec", time: recovery }] },
    {
      title: "リカバリー",
      data: recovery.map((rec) => ({ ...rec, type: "rec" })),
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: item.createdAt.split(" ")[0],
    });
  }, [item]);

  useEffect(() => {
    // navigation.addListenerの役割は
    // nabigation.goBack()したときに再レンダーされるように
    const refresh = navigation.addListener("focus", () => {
      fetchItemDetails();
      fetchGetRecovery();
      setSegment("weight");
    });
    return refresh;
  }, [navigation]);

  const fetchItemDetails = async () => {
    const res = await getItemDetails(item.id);
    await setItemDetails(res);
    await setInitItemDetial({
      id: 0,
      itemsId: item.id,
      weights: 0,
      times: 0,
    });
    await setItemLength(res.length);
  };

  const fetchGetRecovery = async () => {
    const res = await getRecovery(item.id);
    await setRecovery(res);
  };

  const onPressItemDetail = (itemDetail: ItemDetailType, index: number) => {
    navigation.navigate("ItemDetail", { itemDetail, index });
  };

  const onPressInsertItemDetail = (
    itemDetail: ItemDetailType,
    index: number
  ) => {
    setIsNew(true);
    navigation.navigate("ItemDetail", { itemDetail, index });
  };

  const onPressDeleteItemDetail = async (
    rowMap: any,
    itemDetail: ItemDetailType,
    index: number
  ) => {
    await closeRow(rowMap, index);
    await deleteRow(itemDetail.id);
    await DeleteItemDetail(itemDetail.id);
    await fetchItemDetails();
  };

  const onPressRecovery = (recovery: RecoveryType) => {
    navigation.navigate("Recovery", { recovery });
  };

  const closeRow = (rowMap: any, rowKey: any) => {
    // https://snack.expo.io/@rollindeep/react-native-swipe-list-view
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowKey: any) => {
    const newData = [...itemDetails];
    const prevIndex = itemDetails.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setItemDetails(newData);
  };

  return (
    <>
      <SafeAreaView style={styles.list}>
        <SwipeListView
          useSectionList
          sections={sections}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headerTitle}>{title}</Text>
          )}
          // data={itemDetails}
          renderItem={(data, _) => {
            if (data.item.type === "item") {
              return (
                <ItemDetail
                  data={data.item}
                  index={data.index}
                  onPress={() => onPressItemDetail(data.item, data.index)}
                />
              );
            } else {
              return (
                <Recovery
                  data={data.item.min}
                  onPress={() => onPressRecovery(data.item)}
                />
              );
            }
          }}
          renderHiddenItem={(data, rowMap) => {
            if (data.item.type === "item") {
              return (
                <View style={styles.delete}>
                  <IconButton
                    name="delete"
                    color={"#fff"}
                    onPress={() =>
                      onPressDeleteItemDetail(rowMap, data.item, data.index)
                    }
                  />
                </View>
              );
            } else {
              return null;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
          rightOpenValue={-72}
          stopRightSwipe={-72}
          disableRightSwipe={true}
          closeOnRowBeginSwipe={true}
        />
        <FloatingActionButton
          iconName="plus"
          onPress={() => onPressInsertItemDetail(initItemDetail, itemLength)}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    marginTop: "3%",
    marginRight: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    flex: 1,
    backgroundColor: "#eee",
    position: "relative",
  },
  delete: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 20,
    marginLeft: 50, //背景の赤色が見えないように
    backgroundColor: "#ff3b30",
  },
  headerTitle: {
    marginLeft: "3%",
    marginBottom: "1%",
    color: "#555",
    marginTop: "3%",
  },
});
