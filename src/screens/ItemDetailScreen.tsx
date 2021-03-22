import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import {
  UpdateItemDetails,
  UpdateItemSets,
  InsertItemDetails,
} from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { DisplayItemDetail } from "../component/DisplayItemDetail";
import { SegmentedControl } from "../component/SegmentedControl";
import { Decision } from "../component/DecisionButton";
import { IconButton } from "../component/IconButton";
/* screen */
import { NumberInputScreen } from "../screens/NumberInputScreen";
/* context */
import { WeightsContext } from "../context/weightsContext";
import { TimesContext } from "../context/timesContext";
import { SegmentContext } from "../context/segmentContext";
import { IsNewContext } from "../context/isNew";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "ItemDetail">;
  route: RouteProp<RootStackParamList, "ItemDetail">;
};

export const ItemDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { itemDetail, index, totalWeights, itemLength } = route.params;
  const { id, itemsId } = itemDetail;
  const { weights, setWeights } = useContext(WeightsContext);
  const { times, setTimes } = useContext(TimesContext);
  const { setSegment } = useContext(SegmentContext);
  const { isNew, setIsNew } = useContext(IsNewContext);

  useEffect(() => {
    navigation.setOptions({
      title: String(index + 1) + "セット目",
      headerLeft: () => (
        <IconButton
          name="closecircleo"
          marginLeftRatio={0.025}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  useEffect(() => {
    const weights = String(itemDetail.weights);
    const times = itemDetail.times;
    setWeights(weights);
    setTimes(times);
    setSegment("weights");
  }, []);

  const onPressDecision = async () => {
    if (isNew) {
      await fetchInsertItemDetails();
      await fetchUpdateItemSetsByNew();
    } else {
      await fetchUpdateItemDetails();
      await fetchUpdateItemSets();
    }
    navigation.goBack();
    setIsNew(false);
    setWeights("0");
    setTimes(0);
  };

  const fetchUpdateItemDetails = async () => {
    const res = await UpdateItemDetails(id, Number(weights), Number(times));
  };
  const fetchUpdateItemSetsByNew = async () => {
    const newTotalWeights = totalWeights + Number(weights) * Number(times);
    const res = await UpdateItemSets(itemsId, index + 1, newTotalWeights);
  };
  const fetchUpdateItemSets = async () => {
    const newTotalWeights =
      totalWeights -
      itemDetail.weights * itemDetail.times +
      Number(weights) * Number(times);
    const res = await UpdateItemSets(itemsId, itemLength, newTotalWeights);
  };

  const fetchInsertItemDetails = async () => {
    const res = await InsertItemDetails(
      itemsId,
      Number(weights),
      Number(times)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DisplayItemDetail data={itemDetail} />
      <SegmentedControl />
      <NumberInputScreen />
      <Decision onPress={onPressDecision} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
