import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type PART_DETAILS = {
  label: string;
  value: string;
};

export const AddEvent = () => {
  const [eventName, setEventName] = useState<string>();
  const [part, setPart] = useState<string>("");
  const [partDetail, setPartDetail] = useState<string>("");
  const [partDetails, setPartDetails] = useState<PART_DETAILS[]>([]);
  const handleChangePartDetails = (part: string) => {
    if (part === "sholder") {
      setPartDetails(partsDetailSholders);
    }
  };

  const parts = [
    { label: "肩", value: "sholder" },
    { label: "胸", value: "chest" },
    { label: "背中", value: "back" },
    { label: "腕", value: "arm" },
    { label: "腹", value: "stomach" },
    { label: "尻", value: "hip" },
    { label: "足", value: "leg" },
  ];
  const partsDetailSholders = [
    { label: "僧帽筋上部", value: "trapeziusUpper" },
    { label: "三角筋前部", value: "deltoidFront" },
    { label: "三角筋中部", value: "deltoidMiddle" },
    { label: "三角筋後部", value: "deltoidRear" },
  ];
  const partsDetailChests = [
    { label: "大胸筋上部", value: "greaterPectoralsUpper" },
    { label: "大胸筋中部", value: "greaterPectoralsMiddle" },
    { label: "大胸筋下部", value: "greaterPectoralsLower" },
  ];
  const partsDetailBacks = [
    { label: "僧帽筋中下部", value: "trapeziusMiddle" },
    { label: "広背筋上部", value: "latissimusDorsiUpper" },
    { label: "広背筋下部", value: "latissimusDorsiLower" },
    { label: "脊柱起立筋", value: "erectorSpinae" },
  ];
  const partsDetailArms = [
    { label: "上腕二頭筋", value: "biceps" },
    { label: "上腕三頭筋", value: "triceps" },
  ];
  const partsDetailAbs = [
    { label: "腹直筋", value: "rectusAbs" },
    { label: "腹斜筋", value: "obliquesAbs" },
  ];
  const partsDetailHips = [
    { label: "大臀筋", value: "gluteusMaximus" },
    { label: "中臀筋", value: "gluteusMedius" },
  ];
  const partsDetailLegs = [
    { label: "大腿二頭筋(ハムストリングス)", value: "hamstring" },
    { label: "大腿四頭筋", value: "quadriceps" },
    { label: "ヒラメ筋", value: "soleus" },
  ];
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>種目名 (必須)</Text>
      <TextInput
        placeholder={"種目名を入力"}
        style={styles.eventNameInput}
        value={eventName}
        onChangeText={(text) => setEventName(text)}
        keyboardType="default"
        autoCapitalize="none"
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
  },
  eventNameInput: {
    height: 40,
    fontSize: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#0076FF",
    color: "#555",
    backgroundColor: "#fff",
    // paddingVertical: "2%",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    fontSize: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#0076FF",
    borderRadius: 5,
    color: "#555",
    backgroundColor: "#fff",
  },
  inputAndroid: {
    height: 40,
    fontSize: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#0076FF",
    borderRadius: 5,
    color: "#555",
    backgroundColor: "#fff",
  },
});
