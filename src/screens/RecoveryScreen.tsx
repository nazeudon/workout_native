import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* lib */
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { RecoverySegment } from "../component/SegmentedControl";
import { Decision } from "../component/Decision";
import { IconButton } from "../component/IconButton";
import { DisplayRecovery } from "../component/DisplayRecovery";
/* screen */
import { NumberInputScreen } from "../screens/NumberInputScreen";
/* context */

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Recovery">;
  route: RouteProp<RootStackParamList, "Recovery">;
};

export const RecoveryScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { recovery } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <IconButton name="closecircleo" onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  useEffect(() => {}, []);

  const onPressDecision = async () => {};

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
