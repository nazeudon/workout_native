import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { DeleteItemDetail, getItemDetails } from "../lib/sqlite";
/* context */
import { IsNewContext } from "../context/itemDetailContext";
/* type */
import { RootStackParamList } from "../types/navigation";
import { ItemDetailType } from "../types/item";
/* component */
import { ItemDetail } from "../component/ItemDetail";
import { FloatingActionButton } from "../component/FloatingActionButton";
import { IconButton } from "../component/IconButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Item">;
  route: RouteProp<RootStackParamList, "Item">;
};

export const ItemScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { item } = route.params;
  const { setIsNew } = useContext(IsNewContext);
  const [itemLength, setItemLength] = useState<number>(0);
  const [itemDetails, setItemDetails] = useState<ItemDetailType[]>([]);
  const [initItemDetail, setInitItemDetial] = useState<ItemDetailType>({
    id: 0,
    itemsId: item.id,
    weights: 0,
    times: 0,
  });

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
          renderItem={(data, _) => (
            <ItemDetail
              data={data.item}
              index={data.index}
              onPress={() => onPressItemDetail(data.item, data.index)}
            />
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.delete}>
              <IconButton
                name="delete"
                color={"#fff"}
                onPress={() =>
                  onPressDeleteItemDetail(rowMap, data.item, data.index)
                }
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          rightOpenValue={-72}
          stopRightSwipe={-72}
          disableRightSwipe={true}
          closeOnRowBeginSwipe={true}
        />
        <View
          style={{ ...styles.recoveryContainer, top: itemLength * 50 + 30 }}
        >
          <Text style={styles.recoveryText}>リカバリー</Text>
        </View>
        <FloatingActionButton
          iconName="plus"
          onPress={() => onPressInsertItemDetail(initItemDetail, itemLength)}
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
  recoveryContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    height: 50,
  },
  recoveryText: {
    marginLeft: "3%",
    fontSize: 16,
  },
});
