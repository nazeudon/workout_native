import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

export const SegmentedControl = () => {
  const [state, setState] = useState({ selectedIndex: 0 });
  const handleIndexChange = (index: number) => {
    setState({
      ...state,
      selectedIndex: index,
    });
  };
  return (
    <SegmentedControlTab
      values={["重量", "回数"]}
      selectedIndex={state.selectedIndex}
      onTabPress={handleIndexChange}
      borderRadius={5}
      tabsContainerStyle={styles.tabsContainerStyle}
      tabStyle={styles.tabStyle}
    />
  );
};

const styles = StyleSheet.create({
  tabsContainerStyle: {
    alignSelf: "center",
    maxWidth: "95%",
  },
  tabStyle: {
    backgroundColor: "#fff",
  },
});
