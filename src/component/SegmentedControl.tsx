import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
/* context */
import { SegmentContext } from "../context/segmentContext";

export const SegmentedControl = () => {
  const [state, setState] = useState({ selectedIndex: 0 });
  const { setSegment } = useContext(SegmentContext);
  const segments = {
    0: "weights",
    1: "times",
  };

  const handleIndexChange = (index: number) => {
    setState({
      ...state,
      selectedIndex: index,
    });
    index === 0 ? setSegment(segments[0]) : setSegment(segments[1]);
  };
  return (
    <SegmentedControlTab
      values={["重量", "回数"]}
      selectedIndex={state.selectedIndex}
      onTabPress={handleIndexChange}
      borderRadius={5}
      tabsContainerStyle={styles.tabsContainerStyle}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabTextStyle}
    />
  );
};

export const RecoverySegment = () => {
  return (
    <SegmentedControlTab
      values={["リカバリー"]}
      selectedIndex={0}
      borderRadius={5}
      tabsContainerStyle={styles.tabsContainerStyle}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabTextStyle}
    />
  );
};

export const TrialSegment = () => {
  return (
    <SegmentedControlTab
      values={["種目目"]}
      selectedIndex={0}
      borderRadius={5}
      tabsContainerStyle={styles.tabsContainerStyle}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabTextStyle}
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
    marginBottom: "5%",
  },
  tabTextStyle: {
    fontSize: 20,
  },
});
