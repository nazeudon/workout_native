import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { EventContext } from "./src/context/eventContext";
import { ItemContext } from "./src/context/itemContext";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  const [event, setEvent] = useState<string | undefined>("");
  const [item, setItem] = useState<string | undefined>("");
  return (
    <ItemContext.Provider value={{ item, setItem }}>
      <EventContext.Provider value={{ event, setEvent }}>
        <AppNavigator />
      </EventContext.Provider>
    </ItemContext.Provider>
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
