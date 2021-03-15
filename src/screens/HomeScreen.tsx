import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  SectionList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* component */
import { Event } from "../component/Event";
import { FloatingActionButton } from "../component/FloatingActionButton";
import { EventSegmentedControl } from "../component/SegmentedControl";
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
import { EventIdsContext } from "../context/eventContext";
import { IsNewEventContext } from "../context/isNew";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({ navigation }: Props) => {
  // const [events, setEvents] = useState<EventType[]>([]);
  const { events, setEvents } = useContext(EventContext);
  const { setAddEvent } = useContext(addEventContext);
  const { eventIds } = useContext(EventIdsContext);
  const { setPart } = useContext(partContext);
  const { setPartDetails } = useContext(partDetailsContext);
  const { setPartDetail } = useContext(partDetailContext);
  const { setTrainingType } = useContext(TrainingTypeContext);
  const { setIsNewEvent } = useContext(IsNewEventContext);

  const sections = [
    {
      id: 1,
      title: "肩",
      data: events.filter((event) => event.part === "sholder"),
      // colorHeader: "#3CB371",
      colorHeader: "#2980B9",
    },
    {
      id: 2,
      title: "胸",
      data: events.filter((event) => event.part === "chest"),
      colorHeader: "#2980B9",
    },
    {
      id: 3,
      title: "背中",
      data: events.filter((event) => event.part === "back"),
      // colorHeader: "#7B68EE",
      colorHeader: "#2980B9",
    },
    {
      id: 4,
      title: "腕",
      data: events.filter((event) => event.part === "arm"),
      // colorHeader: "#001E43",
      colorHeader: "#2980B9",
    },
    {
      id: 5,
      title: "腹",
      data: events.filter((event) => event.part === "ab"),
      // colorHeader: "#FF8C00",
      colorHeader: "#2980B9",
    },
    {
      id: 6,
      title: "尻",
      data: events.filter((event) => event.part === "hip"),
      // colorHeader: "#FF7518",
      colorHeader: "#2980B9",
    },
    {
      id: 7,
      title: "脚",
      data: events.filter((event) => event.part === "leg"),
      // colorHeader: "#950000",
      colorHeader: "#2980B9",
    },
  ];

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
      <SafeAreaView style={styles.tab}>
        <EventSegmentedControl />
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.separateStyle}>
          <Text style={styles.textStyle}>肩 Sholder</Text>
        </View> */}
        {/* <FlatList
          style={styles.list}
          data={events}
          renderItem={({ item }: { item: EventType }) => (
            <Event
              data={item}
              onPress={() => onPressEvent(item)}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          // numColumns={2}
        /> */}
        <SectionList
          style={styles.list}
          sections={sections}
          renderItem={({ section: { id, data }, index }) => {
            if (eventIds.includes(0) || eventIds.includes(id)) {
              return (
                <Event
                  data={data[index]}
                  onPress={() => onPressEvent(data[index])}
                  navigation={navigation}
                />
              );
            } else {
              return null;
            }
          }}
          renderSectionHeader={({
            section: { id, title, data, colorHeader },
          }) => {
            if (data.length !== 0) {
              if (eventIds.includes(0) || eventIds.includes(id)) {
                return (
                  <View
                    style={{
                      ...styles.separateStyle,
                      backgroundColor: colorHeader,
                    }}
                  >
                    <Text style={styles.textStyle}>{title}</Text>
                  </View>
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
      <FloatingActionButton
        iconName="plus"
        onPress={async () => await onPressInsertEvent()}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    // flexWrap: "wrap",
    // flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  tab: {
    backgroundColor: "#fff",
  },
  separateStyle: {
    height: 20,
    // marginTop: 5,
    // backgroundColor: "#0076FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 18,
    color: "white",
  },
});
