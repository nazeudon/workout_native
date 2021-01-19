import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { UpdateItemDetails } from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { DisplayItemDetail } from "../component/DisplayItemDetail";
import { SegmentedControl } from "../component/SegmentedControl";
import { Decision } from "../component/Decision";
/* screen */
import { NumberInputScreen } from "../screens/NumberInputScreen";
/* context */
import { WeightsContext } from "../context/weightsContext";
import { TimesContext } from "../context/timesContext";
import { SegmentContext } from "../context/segmentContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "ItemDetail">;
  route: RouteProp<RootStackParamList, "ItemDetail">;
};

export const ItemDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { itemDetail } = route.params;
  const itemDetailID = itemDetail.id;
  const { weights, setWeights } = useContext(WeightsContext);
  const { times, setTimes } = useContext(TimesContext);
  const { setSegment } = useContext(SegmentContext);

  useEffect(() => {
    const weights = String(itemDetail.weights);
    const times = itemDetail.times;
    setWeights(weights);
    setTimes(times);
    setSegment("weights");
  }, []);

  const onPressDecision = async () => {
    await fetchUpdateItemDetails();
    navigation.goBack();
    setWeights("0");
    setTimes(0);
  };

  const fetchUpdateItemDetails = async () => {
    const res = await UpdateItemDetails(
      itemDetailID,
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
