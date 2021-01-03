import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { EventContext } from "./src/context/eventContext";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";
// import { EventsList } from "./src/component/EventsList";

const App = () => {
  const [event, setEvent] = useState<string | undefined>("");
  return (
    <EventContext.Provider value={{ event, setEvent }}>
      <AppNavigator />
    </EventContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
