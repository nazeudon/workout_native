import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "react-native";
import { Header } from "@react-navigation/stack";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import {
  DeleteItemDetail,
  getItemDetails,
  UpdateItemSets,
} from "../lib/sqlite";
/* context */
import { IsNewContext } from "../context/isNew";
import { SegmentContext } from "../context/segmentContext";
import { recoveryContext } from "../context/recoveryContext";
import { trialContext } from "../context/trialContext";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType, ItemType } from "../types/item";
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
  const { setRecovery } = useContext(recoveryContext);
  const { setTrial } = useContext(trialContext);
  const [itemDetails, setItemDetails] = useState<ItemDetailType[]>([]);
  // const [initItemDetail, setInitItemDetial] = useState<ItemDetailType>({
  //   id: 0,
  //   itemsId: item.id,
  //   weights: 0,
  //   times: 0,
  // });

  const sectionItems = [
    {
      title: "セット目 / 挙上重量 / 回数",
      data: itemDetails,
    },
  ];
  const sectionRecovery = [
    {
      title: "リカバリー",
      data: [item],
    },
  ];
  const sectionTrial = [
    {
      title: "種目目",
      data: [item],
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
    setRecovery(String(item.recovery));
    setTrial(String(item.trial));
  }, [item]);

  useEffect(() => {
    // navigation.addListenerの役割は
    // nabigation.goBack()したときに再レンダーされるように
    const refresh = navigation.addListener("focus", () => {
      fetchGetItemDetails();
      setSegment("weight");
    });
    return refresh;
  }, [navigation]);

  const fetchGetItemDetails = async () => {
    const res = await getItemDetails(item.id);
    await setItemDetails(res);
    await sumWeights(res);
    // await setTotalWeights(item.totalWeights);//これだとうまく行かない
    await setItemLength(res.length);
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

  const onPressRecovery = (item: ItemType) => {
    navigation.navigate("Recovery", { item });
  };

  const onPressTrial = (item: ItemType) => {
    navigation.navigate("Trial", { item });
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
          sections={sectionItems}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headerTitle}>{title}</Text>
          )}
          renderItem={(data, _) => {
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
          }}
          renderHiddenItem={(data, rowMap) => {
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
          }}
          keyExtractor={(item, index) => index.toString()}
          rightOpenValue={-72}
          stopRightSwipe={-72}
          disableRightSwipe={true}
          closeOnRowBeginSwipe={true}
        />
        <SwipeListView
          useSectionList
          sections={sectionRecovery}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headerTitle}>{title}</Text>
          )}
          renderItem={(data, _) => {
            const ref = React.createRef();
            return <Recovery onPress={() => onPressRecovery(data.item)} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
        <SwipeListView
          useSectionList
          sections={sectionTrial}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headerTitle}>{title}</Text>
          )}
          renderItem={(data, _) => {
            return <Trial onPress={() => onPressTrial(data.item)} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </SafeAreaView>
      <FloatingActionButton
        iconName="plus"
        onPress={() =>
          onPressInsertItemDetail(
            // initItemDetail,
            {
              id: 0,
              itemsId: item.id,
              weights: 0,
              times: 0,
            },
            itemLength,
            totalWeights,
            itemLength
          )
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    backgroundColor: "#eee",
    position: "relative",
  },
  date: {
    marginTop: "3%",
    marginRight: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  delete: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 20,
    marginLeft: 50, //背景の赤色が見えないように
    backgroundColor: "#ff3b30", //赤
  },
  headerTitle: {
    marginLeft: "3%",
    marginBottom: "1%",
    color: "#555",
    marginTop: "3%",
  },
  textInputContainer: {
    backgroundColor: "#fff",
    height: 100,
  },
});
