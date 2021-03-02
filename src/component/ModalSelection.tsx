import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalSelector from "react-native-modal-selector";
/* types */
import { RootStackParamList } from "../types/navigation";
import { EventType } from "../types/event";
/* context */
import { addEventContext, EventContext } from "../context/eventContext";
import {
  partContext,
  partDetailsContext,
  partDetailContext,
  TrainingTypeContext,
} from "../context/partContext";
/* lib */
import {
  partsDetailSholders,
  partsDetailChests,
  partsDetailBacks,
  partsDetailArms,
  partsDetailAbs,
  partsDetailHips,
  partsDetailLegs,
} from "../lib/parts";
import { DeleteEvent, getEvents } from "../lib/sqlite";

type Props = {
  event: EventType;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const ModalSelection = (props: Props) => {
  const data = [
    { key: 1, section: true, label: "アクションを選択" },
    { key: 2, label: "トレーニング管理" },
    { key: 3, label: "編集" },
    {
      key: 4,
      label: "削除",
    },
  ];

  const { events, setEvents } = useContext(EventContext);
  const { setAddEvent } = useContext(addEventContext);
  const { setPart } = useContext(partContext);
  const { setPartDetails } = useContext(partDetailsContext);
  const { setPartDetail } = useContext(partDetailContext);
  const { setTrainingType } = useContext(TrainingTypeContext);
  let calledCount = 0;

  const fetchGetEvents = async () => {
    const res = await getEvents();
    setEvents(res);
  };

  const deleteEventById = async (id: number) => {
    await DeleteEvent(id);
  };

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
      const id = event.id;
      setAddEvent(event.event);
      setPart(event.part);
      handleChangePartDetails(event.part);
      setPartDetail(event.partDetail);
      setTrainingType(event.trainingType);
      props.navigation.navigate("AddEvent", { id });
    } else if (key === 4) {
      if (calledCount === 0) {
        console.log("delete");
        const id = event.id;
        setTimeout(() => {
          Alert.alert(
            "削除しますか？",
            "この操作は取り消せません",
            [
              {
                text: "削除",
                onPress: async () => {
                  // これしないとalertが削除後にもう一度呼ばれると言う謎挙動
                  calledCount += 1;
                  await deleteEventById(id);
                  await fetchGetEvents();
                },
                style: "destructive",
              },
              {
                text: "キャンセル",
                onPress: () => {},
                style: "cancel",
              },
            ],
            { cancelable: true }
          );
        }, 600);
      } else {
        null;
      }
      // setTimeout(deleteAlert, 600);
      console.log("end");
    }
  };

  return (
    <View style={styles.container}>
      <ModalSelector
        data={data}
        cancelText={"キャンセル"}
        // initValue={props.eventName}
        // initValue={props.event.event}
        // initValueTextStyle={styles.TextStyle}
        // touchableStyle={styles.touchableStyle}
        // selectStyle={styles.selectStyle}
        // sectionStyle={styles.sectionStyle}
        overlayStyle={styles.overlayStyle}
        optionStyle={styles.optionStyle}
        optionContainerStyle={styles.optionContainerStyle}
        optionTextStyle={styles.optionTextStyle}
        cancelStyle={styles.cancelStyle}
        cancelTextStyle={styles.cancelTextStyle}
        animationType={"fade"}
        onChange={(key) => {
          onPressEvent(key.key, props.event);
        }}
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
    paddingVertical: 0,
    marginVertical: 0,
  },
  optionContainerStyle: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 0,
    marginVertical: 0,
  },
  optionTextStyle: {
    fontSize: 18,
    color: "#0076FF",
  },
  cancelStyle: {
    backgroundColor: "#fff",
    justifyContent: "center",
    height: 40,
  },
  cancelTextStyle: {
    fontWeight: "500",
    fontSize: 18,
  },
  buttonStyle: {
    height: 40,
  },
});
