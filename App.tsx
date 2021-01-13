import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { EventContext } from "./src/context/eventContext";
import { ItemContext } from "./src/context/itemContext";
import { WeightsContext } from "./src/context/weightsContext";
import { TimesContext } from "./src/context/timesContext";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  const [event, setEvent] = useState<string | undefined>("");
  const [item, setItem] = useState<string | undefined>("");
  const [weights, setWeights] = useState<number | undefined>(0);
  const [times, setTimes] = useState<number | undefined>(0);

  return (
    <TimesContext.Provider value={{ times, setTimes }}>
      <WeightsContext.Provider value={{ weights, setWeights }}>
        <ItemContext.Provider value={{ item, setItem }}>
          <EventContext.Provider value={{ event, setEvent }}>
            <AppNavigator />
          </EventContext.Provider>
        </ItemContext.Provider>
      </WeightsContext.Provider>
    </TimesContext.Provider>
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
