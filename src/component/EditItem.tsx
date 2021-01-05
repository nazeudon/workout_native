import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  TabView,
  SceneMap,
  ScrollPager,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view";
/* screen */
import { WeightsEditScreen } from "../screens/WeightsEditScreen";
import { TimesEditScreen } from "../screens/TimesEditScreen";
/* type */
import { ItemDetailType } from "../types/item";

type Props = {
  data: ItemDetailType;
  // onPress: () => void;
};

export const EditItem: React.FC<Props> = ({ data }: Props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Weights" },
    { key: "second", title: "Times" },
  ]);

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    first: WeightsEditScreen,
    second: TimesEditScreen,
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#e91e63" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ color: "black" }}
      scrollEnabled={true}
      tabStyle={{ width: initialLayout.width / 2 }}
    />
  );

  return (
    <TabView
      style={styles.container}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      //   renderPager={(props) => <ScrollPager {...props} />}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
