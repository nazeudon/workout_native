import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Event } from "./Event";
/* lib */
import { loadFromStorage } from "../lib/nativeStorage";
/* types */
import { EventData, EventKey } from "../types/event";

export const EventsList: React.FC = () => {
  const [datas, setDatas] = useState<EventData[]>([]);
  // const KEYS = ["ベンチプレス", "デッドリフト", "スクワット"];

  useEffect(() => {
    loadDatas();
  }, []);

  const loadDatas = async () => {
    const reses = await loadFromStorage();
    setDatas(reses);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={datas}
        renderItem={({ item }: { item: EventData }) => <Event data={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // flexWrap: "wrap",
    // flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
});
