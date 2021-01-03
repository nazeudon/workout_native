import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* component */
import { Event } from "../component/Event";
/* lib */
import { initDB, insertToDB, getEvents, deleteDB } from "../lib/sqlite";
/* types */
import { EventType } from "../types/event";
import { RootStackParamList } from "../types/navigation";
/* context */
import { EventContext } from "../context/eventContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const { setEvent } = useContext(EventContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res);
  };

  const onPressEvent = (event: EventType) => {
    setEvent(event.event);
    navigation.navigate("Event", { event });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }: { item: EventType }) => (
          <Event data={item} onPress={() => onPressEvent(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
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
