import React, { useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
/* context */
import { addEventContext } from "../context/eventContext";
import {
  partContext,
  partDetailsContext,
  partDetailContext,
  TrainingTypeContext,
} from "../context/partContext";
/* lib */
import {
  parts,
  partsDetailSholders,
  partsDetailChests,
  partsDetailBacks,
  partsDetailArms,
  partsDetailAbs,
  partsDetailHips,
  partsDetailLegs,
} from "../lib/parts";

export const AddEvent = () => {
  const { addEvent, setAddEvent } = useContext(addEventContext);
  const { part, setPart } = useContext(partContext);
  const { partDetail, setPartDetail } = useContext(partDetailContext);
  const { partDetails, setPartDetails } = useContext(partDetailsContext);
  const { trainingType, setTrainingType } = useContext(TrainingTypeContext);

  const handleChangePartDetails = (part: string) => {
    if (part === "sholder") {
      setPartDetails(partsDetailSholders);
    } else if (part === "chest") {
      setPartDetails(partsDetailChests);
    } else if (part === "back") {
      setPartDetails(partsDetailBacks);
    } else if (part === "arm") {
      setPartDetails(partsDetailArms);
    } else if (part === "ab") {
      setPartDetails(partsDetailAbs);
    } else if (part === "hip") {
      setPartDetails(partsDetailHips);
    } else if (part === "leg") {
      setPartDetails(partsDetailLegs);
    }
  };

  const placeholderParts = {
    label: "部位を選択",
    value: null,
    color: "#9EA0A4",
  };
  const placeholderPartsDetail = {
    label: "部位詳細を選択",
    value: null,
    color: "#9EA0A4",
  };
  const placeholderTrainingTypes = {
    label: "種目タイプを選択",
    value: null,
    color: "#9EA0A4",
  };

  const trainingTypes = [
    { label: "フリーウエイト", value: "freeWeight" },
    { label: "マシン", value: "machine" },
    { label: "自重", value: "ownWeight" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>種目名 (必須)</Text>
      <TextInput
        placeholder={"種目名を入力"}
        style={styles.eventNameInput}
        value={addEvent}
        onChangeText={(text) => setAddEvent(text)}
        keyboardType="default"
        autoCapitalize="none"
      />
      <Text style={styles.text}>種目タイプ (必須)</Text>
      <RNPickerSelect
        placeholder={placeholderTrainingTypes}
        items={trainingTypes}
        onValueChange={(value) => {
          setTrainingType(value);
        }}
        style={pickerSelectStyles}
        value={trainingType}
        useNativeAndroidPickerStyle={false}
      />
      <Text style={styles.text}>部位 (必須)</Text>
      <RNPickerSelect
        placeholder={placeholderParts}
        items={parts}
        onValueChange={(value) => {
          setPart(value);
          handleChangePartDetails(value);
        }}
        style={pickerSelectStyles}
        value={part}
        useNativeAndroidPickerStyle={false}
      />
      <Text style={styles.text}>部位詳細 (オプション)</Text>
      <RNPickerSelect
        placeholder={placeholderPartsDetail}
        items={partDetails}
        onValueChange={(value) => {
          setPartDetail(value);
        }}
        style={pickerSelectStyles}
        value={partDetail}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "3%",
  },
  text: {
    color: "#333",
    marginTop: "5%",
    marginBottom: "1%",
    fontSize: 16,
  },
  eventNameInput: {
    height: 50,
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#0076FF",
    color: "#555",
    backgroundColor: "#fff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#0076FF",
    borderRadius: 5,
    color: "#555",
    backgroundColor: "#fff",
  },
  inputAndroid: {
    height: 50,
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#0076FF",
    borderRadius: 5,
    color: "#555",
    backgroundColor: "#fff",
  },
});
