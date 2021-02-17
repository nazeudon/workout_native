import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { UpdateTrial } from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { TrialSegment } from "../component/SegmentedControl";
import { Decision } from "../component/DecisionButton";
import { IconButton } from "../component/IconButton";
import { DisplayTrial } from "../component/DisplayTrial";
/* screen */
import { NumberInputScreen } from "../screens/NumberInputScreen";
/* context */
import { trialContext } from "../context/trialContext";
import { SegmentContext } from "../context/segmentContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Trial">;
  route: RouteProp<RootStackParamList, "Trial">;
};

export const TrialScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { trial, setTrial } = useContext(trialContext);
  const { setSegment } = useContext(SegmentContext);

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <IconButton name="closecircleo" onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  useEffect(() => {
    setTrial(String(route.params.trial.trialNum));
    setSegment("trial");
  }, []);

  const onPressDecision = async () => {
    const id = route.params.trial.id;
    fetchUpdateTrial(id, Number(trial));
    navigation.goBack();
    setTrial("0");
  };

  const fetchUpdateTrial = async (id: number, trialNum: number) => {
    const res = await UpdateTrial(id, trialNum);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DisplayTrial data={trial} />
      <TrialSegment />
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
