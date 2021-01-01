import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* component */
import { Event } from "../component/Event";
/* lib */
import {
  initSaveToStorage,
  loadData,
  saveToStorage,
} from "../lib/nativeStorage";
import { initDB, insertToDB, getEvents, deleteDB } from "../lib/sqlite";
/* types */
import { EventType } from "../types/event";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }: { item: EventType }) => <Event data={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <Button title="initData" onPress={initSaveToStorage} />
      <Button title="loadData" onPress={() => loadData("ベンチプレス2")} />
      <Button title="editData" onPress={saveToStorage} />
      <Button title="initDB" onPress={initDB} />
      <Button title="insertToDB" onPress={insertToDB} />
      {/* <Button title="getFromDB" onPress={getEvents} /> */}
      <Button title="getFromDB" onPress={fetchEvents} />
      {/* <Button title="changeDB" onPress={changeDB} /> */}
      <Button title="deleteDB" onPress={deleteDB} />
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
