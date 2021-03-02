import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* component */
import { Event } from "../component/Event";
import { FloatingActionButton } from "../component/FloatingActionButton";
/* lib */
import {
  getEvents,
  _initDB,
  _insertToDB,
  _deleteDB,
  _deleteItem,
  _deleteItems,
  _DropTable,
  _addColumnToDB,
} from "../lib/sqlite";
/* types */
import { EventType } from "../types/event";
import { RootStackParamList } from "../types/navigation";
/* context */
import { addEventContext, EventContext } from "../context/eventContext";
import {
  partContext,
  partDetailsContext,
  partDetailContext,
  TrainingTypeContext,
} from "../context/partContext";
import { IsNewEventContext } from "../context/isNew";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({ navigation }: Props) => {
  // const [events, setEvents] = useState<EventType[]>([]);
  const { events, setEvents } = useContext(EventContext);
  const { setAddEvent } = useContext(addEventContext);
  const { setPart } = useContext(partContext);
  const { setPartDetails } = useContext(partDetailsContext);
  const { setPartDetail } = useContext(partDetailContext);
  const { setTrainingType } = useContext(TrainingTypeContext);
  const { setIsNewEvent } = useContext(IsNewEventContext);

  useEffect(() => {
    // navigation.addListenerの役割は
    // nabigation.goBack()したときに再レンダーされるように
    const refresh = navigation.addListener("focus", () => {
      fetchGetEvents();
      setAddEvent("");
      setPart("");
      setPartDetails([]);
      setPartDetail("");
      setTrainingType("");
      setIsNewEvent(false);
    });
    return refresh;
  }, [navigation]);

  const fetchGetEvents = async () => {
    const res = await getEvents();
    setEvents(res);
  };

  const onPressEvent = (event: EventType) => {
    navigation.navigate("Event", { event });
  };

  const onPressInsertEvent = async () => {
    setIsNewEvent(true);
    const id = 0; // dummy input
    navigation.navigate("AddEvent", { id });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={({ item }: { item: EventType }) => (
            <Event
              data={item}
              onPress={() => onPressEvent(item)}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
        {/* <Button title="initDB" onPress={_initDB} />
        <Button title="insertToDB" onPress={_insertToDB} />
        <Button title="deleteDB" onPress={_deleteDB} />
        <Button title="deleteItem" onPress={_deleteItem} />
        <Button title="deleteItems" onPress={_deleteItems} />
        <Button title="DropTable" onPress={_DropTable} />
        <Button title="AddColumn" onPress={_addColumnToDB} /> */}
        {/* <Button title="getFromDB" onPress={fetchGetEvents} /> */}
        {/* <Button title="changeDB" onPress={changeDB} /> */}
      </SafeAreaView>
      <FloatingActionButton
        iconName="plus"
        onPress={async () => await onPressInsertEvent()}
      />
    </>
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
