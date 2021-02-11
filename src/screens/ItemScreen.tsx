import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import {
  DeleteItemDetail,
  getItemDetails,
  getRecovery,
  getTrial,
  UpdateItemSets,
} from "../lib/sqlite";
/* context */
import { IsNewContext } from "../context/itemDetailContext";
import { SegmentContext } from "../context/segmentContext";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType } from "../types/item";
import { RecoveryType } from "../types/recovery";
import { TrialType } from "../types/trial";
/* component */
import { ItemDetail } from "../component/ItemDetail";
import { Recovery } from "../component/Recovery";
import { Trial } from "../component/Trial";
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
  const [totalWeights, setTotalWeights] = useState<number>(0);
  const [recovery, setRecovery] = useState<RecoveryType[]>([]);
  const [trial, setTrial] = useState<TrialType[]>([]);
  const [itemDetails, setItemDetails] = useState<ItemDetailType[]>([]);
  const [initItemDetail, setInitItemDetial] = useState<ItemDetailType>({
    id: 0,
    itemsId: item.id,
    weights: 0,
    times: 0,
  });

  const sections = [
    {
      title: "セット目 / 挙上重量 / 回数",
      data: itemDetails.map((itemDetail) => ({ ...itemDetail, type: "item" })),
    },
    {
      title: "リカバリー",
      data: recovery.map((rec) => ({ ...rec, type: "rec" })),
    },
    {
      title: "種目目",
      data: trial.map((tri) => ({ ...tri, type: "trial" })),
    },
  ];

  const sumWeights = (res: ItemDetailType[]) => {
    let total: number = 0;
    res.map((r) => {
      total += r.weights * r.times;
    });
    setTotalWeights(total);
  };

  const subWeights = (weight: number) => {
    return totalWeights - weight;
  };

  useEffect(() => {
    navigation.setOptions({
      title: item.createdAt.split(" ")[0],
    });
  }, [item]);

  useEffect(() => {
    // navigation.addListenerの役割は
    // nabigation.goBack()したときに再レンダーされるように
    const refresh = navigation.addListener("focus", () => {
      fetchGetItemDetails();
      fetchGetRecovery();
      fetchGetTrial();
      setSegment("weight");
    });
    return refresh;
  }, [navigation]);

  const fetchGetItemDetails = async () => {
    const res = await getItemDetails(item.id);
    await setItemDetails(res);
    await sumWeights(res);
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

  const fetchGetTrial = async () => {
    const res = await getTrial(item.id);
    await setTrial(res);
  };

  const fetchUpdateItemSets = async (weights: number) => {
    const newWeights = subWeights(weights);
    const res = await UpdateItemSets(item.id, itemLength - 1, newWeights);
  };

  const onPressItemDetail = (
    itemDetail: ItemDetailType,
    index: number,
    totalWeights: number,
    itemLength: number
  ) => {
    navigation.navigate("ItemDetail", {
      itemDetail,
      index,
      totalWeights,
      itemLength,
    });
  };

  const onPressInsertItemDetail = (
    itemDetail: ItemDetailType,
    index: number,
    totalWeights: number,
    itemLength: number
  ) => {
    setIsNew(true);
    navigation.navigate("ItemDetail", {
      itemDetail,
      index,
      totalWeights,
      itemLength,
    });
  };

  const onPressDeleteItemDetail = async (
    rowMap: any,
    itemDetail: ItemDetailType,
    index: number
  ) => {
    await closeRow(rowMap, index);
    await DeleteItemDetail(itemDetail.id);
    await fetchGetItemDetails();
    await fetchUpdateItemSets(itemDetail.weights * itemDetail.times);
  };

  const onPressRecovery = (recovery: RecoveryType) => {
    navigation.navigate("Recovery", { recovery });
  };

  const onPressTrial = (trial: TrialType) => {
    navigation.navigate("Trial", { trial });
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
          renderItem={(data, _) => {
            if (data.item.type === "item") {
              return (
                <ItemDetail
                  data={data.item}
                  index={data.index}
                  onPress={() =>
                    onPressItemDetail(
                      data.item,
                      data.index,
                      totalWeights,
                      itemLength
                    )
                  }
                />
              );
            } else if (data.item.type === "rec") {
              return (
                <Recovery
                  data={data.item.min}
                  onPress={() => onPressRecovery(data.item)}
                />
              );
            } else {
              return (
                <Trial
                  data={data.item.trialNum}
                  onPress={() => onPressTrial(data.item)}
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
                      onPressDeleteItemDetail(
                        rowMap,
                        data.item,
                        data.index,
                        itemLength
                      )
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
          onPress={() =>
            onPressInsertItemDetail(initItemDetail, itemLength, totalWeights)
          }
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
