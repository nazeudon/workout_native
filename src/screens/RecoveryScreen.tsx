import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
import { UpdateRecovery } from "../lib/sqlite";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { RecoverySegment } from "../component/SegmentedControl";
import { Decision } from "../component/DecisionButton";
import { IconButton } from "../component/IconButton";
import { DisplayRecovery } from "../component/DisplayRecovery";
/* screen */
import { NumberInputScreen } from "../screens/NumberInputScreen";
/* context */
import { recoveryContext } from "../context/recoveryContext";
import { SegmentContext } from "../context/segmentContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Recovery">;
  route: RouteProp<RootStackParamList, "Recovery">;
};

export const RecoveryScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  //   const { recovery } = route.params;
  const { recovery, setRecovery } = useContext(recoveryContext);
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
    // const { recovery } = route.params;
    // const min = String(recovery.min);
    setRecovery(String(route.params.recovery.min));
    setSegment("recovery");
  }, []);

  const onPressDecision = async () => {
    const id = route.params.recovery.id;
    fetchUpdateRecovery(id, Number(recovery));
    navigation.goBack();
    setRecovery("0");
  };

  const fetchUpdateRecovery = async (id: number, min: number) => {
    const res = await UpdateRecovery(id, min);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DisplayRecovery data={recovery} />
      <RecoverySegment />
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
