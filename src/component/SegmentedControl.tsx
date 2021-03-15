import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
/* context */
import { SegmentContext } from "../context/segmentContext";
import { EventIdsContext } from "../context/eventContext";

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

export const EventSegmentedControl = () => {
  const { eventIds, setEventIds } = useContext(EventIdsContext);

  const handleMultipleIndexSelect = (index: number) => {
    if (eventIds.includes(0)) {
      // Allが選択されている時
      setEventIds([...eventIds.filter((i) => i !== 0), index]);
      console.log("select");
    } else {
      // それ以外の時
      if (index === 0) {
        setEventIds([0]);
        console.log("reset");
      } else if (eventIds.includes(index)) {
        setEventIds(eventIds.filter((i) => i !== index));
        console.log("delete");
      } else {
        setEventIds([...eventIds, index]);
        console.log("add");
      }
    }
  };
  return (
    <SegmentedControlTab
      multiple
      values={["全て", "肩", "胸", "背中", "腕", "腹", "尻", "脚"]}
      // selectedIndex={state.selectedIndex}
      selectedIndices={eventIds}
      onTabPress={handleMultipleIndexSelect}
      borderRadius={2}
      tabsContainerStyle={styles.tabsContainerStyle}
      tabStyle={styles.eventTabStyle}
      tabTextStyle={styles.tabTextStyle}
      activeTabStyle={styles.activeTabStyle}
    />
  );
};

const styles = StyleSheet.create({
  tabsContainerStyle: {
    alignSelf: "center",
    maxWidth: "95%",
    color: "#0076FF",
  },
  tabStyle: {
    backgroundColor: "#fff",
    marginBottom: "5%",
    color: "#0076FF",
  },
  eventTabStyle: {
    backgroundColor: "#fff",
    marginTop: "10%",
    marginBottom: "2%",
    color: "#ecf0f1",
  },
  tabTextStyle: {
    fontSize: 20,
    color: "#0076FF",
  },
  activeTabStyle: {
    backgroundColor: "#0076FF",
  },
});
