import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalSelector from "react-native-modal-selector";
/* types */
import { RootStackParamList } from "../types/navigation";
import { EventType } from "../types/event";
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

type Props = {
  event: EventType;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const ModalSelection = (props: Props) => {
  const data = [
    { key: 1, section: true, label: "アクションを選択" },
    { key: 2, label: "トレーニング管理" },
    { key: 3, label: "編集" },
    { key: 4, label: "削除" },
  ];

  const { setAddEvent } = useContext(addEventContext);
  const { setPart } = useContext(partContext);
  const { setPartDetails } = useContext(partDetailsContext);
  const { setPartDetail } = useContext(partDetailContext);
  const { setTrainingType } = useContext(TrainingTypeContext);

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

  const onPressEvent = (key: number, event: EventType) => {
    if (key === 2) {
      props.navigation.navigate("Event", { event });
    } else if (key === 3) {
      setAddEvent(event.event);
      setPart(event.part);
      handleChangePartDetails(event.part);
      setPartDetail(event.partDetail);
      setTrainingType(event.trainingType);
      props.navigation.navigate("AddEvent");
    }
  };

  return (
    <View style={styles.container}>
      <ModalSelector
        data={data}
        // initValue={props.eventName}
        // initValue={props.event.event}
        // initValueTextStyle={styles.TextStyle}
        // touchableStyle={styles.touchableStyle}
        // selectStyle={styles.selectStyle}
        overlayStyle={styles.overlayStyle}
        // sectionStyle={styles.sectionStyle}
        optionStyle={styles.optionStyle}
        optionContainerStyle={styles.optionContainerStyle}
        cancelStyle={styles.cancelStyle}
        animationType={"fade"}
        onChange={(key) => onPressEvent(key.key, props.event)}
      >
        <Text style={styles.TextStyle}>{props.event.event}</Text>
      </ModalSelector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // padding: 50,
  },
  TextStyle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  touchableStyle: {
    // minWidth: "100%",
    // marginHorizontal: 0,
    // paddingHorizontal: 0,
  },
  // 囲み枠のスタイル
  selectStyle: {
    // borderWidth: 10,
    // borderColor: "#555",
  },
  overlayStyle: {
    flex: 1, // default
    padding: "2.5%", // default
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0,0,0,0.7)", // default
    alignSelf: "center",
    position: "absolute",
    bottom: "10%",
    width: "100%",
    height: "100%",
    // justifyContent: "center", // default
    backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor: "rgba(255,255,255,0)",
  },
  sectionStyle: {
    // 一番うえの箇所
    // backgroundColor:"#333"
  },
  optionStyle: {
    justifyContent: "center",
    height: 40,
  },
  optionContainerStyle: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 0,
  },
  cancelStyle: {
    backgroundColor: "#fff",
    justifyContent: "center",
    height: 40,
  },
});
