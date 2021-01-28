import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
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

const WIDTH = Dimensions.get("window").width;

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
  const [state, setState] = useState({
    listViewData: Array(20)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
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

  const onPressDeleteItemDetail = (itemDetail: ItemDetailType) => {
    DeleteItemDetail(itemDetail.id);
    fetchItemDetails();
  };

  const onSwipeValueChange = (swipeData: any) => {
    const { key, value } = swipeData;
    let rowTranslateAnimatedValues: any = {};
    Array(20)
      .fill("")
      .forEach((_, i) => {
        rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
      });
    let animationIsRunning = false;
    if (value < -375 && !animationIsRunning) {
      animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        const newData = [...state.listViewData];
        const prevIndex = state.listViewData.findIndex(
          (item: any) => item.key === key
        );
        newData.splice(prevIndex, 1);
        setState({ listViewData: newData });
        animationIsRunning = false;
      });
    }
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
          renderHiddenItem={({ item }: { item: ItemDetailType }) => (
            <View style={styles.delete}>
              <IconButton
                name="delete"
                color={"#fff"}
                onPress={() => onPressDeleteItemDetail(item)}
              />
            </View>
          )}
          onRowClose={(rowKey, rowMap) => {}}
          keyExtractor={(item, index) => index.toString()}
          // rightOpenValue={-WIDTH * 0.2}
          rightOpenValue={-72}
          stopRightSwipe={-72}
          disableRightSwipe={true}
          closeOnRowBeginSwipe={true}
          onSwipeValueChange={() => {}}
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
