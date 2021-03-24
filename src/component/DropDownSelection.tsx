import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
/* lib */
import { DropDownItemType } from "../lib/dropDownItems";

const WIDTH = Dimensions.get("window").width;

type Props = {
  items: DropDownItemType[];
};

export const DropDownSelection = ({ items }: Props) => {
  return (
    <DropDownPicker
      items={items}
      defaultValue={"all"}
      containerStyle={styles.containerStyle}
      style={styles.generalStyle}
      itemStyle={styles.itemStyle}
      dropDownStyle={styles.dropDownStyle}
      labelStyle={styles.labelStyle}
      selectedLabelStyle={styles.selectedLabelStyle}
      arrowStyle={styles.arrowStyle}
      arrowColor={"#0076FF"}
      // onChangeItem={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: "100%",
  },
  generalStyle: {
    backgroundColor: "#fff",
    borderWidth: 0,
    flexDirection: "row-reverse",
  },
  itemStyle: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropDownStyle: {
    backgroundColor: "#fff",
    borderWidth: 0,
    minHeight: 200,
  },
  labelStyle: {
    fontSize: 16,
    color: "#555",
  },
  selectedLabelStyle: {
    color: "#000",
    textAlign: "right",
  },
  arrowStyle: {},
});
