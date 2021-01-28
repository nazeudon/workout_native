import React, { useState } from "react";
import { StyleSheet } from "react-native";
/* context */
import { IsNewContext } from "./src/context/itemDetailContext";
import { WeightsContext } from "./src/context/weightsContext";
import { TimesContext } from "./src/context/timesContext";
import { SegmentContext } from "./src/context/segmentContext";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  const [weights, setWeights] = useState<string | undefined>("0");
  const [times, setTimes] = useState<number | undefined>(0);
  const [segment, setSegment] = useState<string | undefined>("weights");
  const [isNew, setIsNew] = useState<boolean>(false);

  return (
    <IsNewContext.Provider value={{ isNew, setIsNew }}>
      <SegmentContext.Provider value={{ segment, setSegment }}>
        <TimesContext.Provider value={{ times, setTimes }}>
          <WeightsContext.Provider value={{ weights, setWeights }}>
            <AppNavigator />
          </WeightsContext.Provider>
        </TimesContext.Provider>
      </SegmentContext.Provider>
    </IsNewContext.Provider>
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
