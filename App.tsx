import React, { useState } from "react";
import { StyleSheet } from "react-native";
/* types */
import { PART_DETAILS } from "./src/types/part";
import { EventType } from "./src/types/event";
/* context */
import { IsNewContext, IsNewEventContext } from "./src/context/isNew";
import { WeightsContext } from "./src/context/weightsContext";
import { TimesContext } from "./src/context/timesContext";
import { SegmentContext } from "./src/context/segmentContext";
import { recoveryContext } from "./src/context/recoveryContext";
import { trialContext } from "./src/context/trialContext";
import { addEventContext, EventContext } from "./src/context/eventContext";
import {
  partContext,
  partDetailsContext,
  partDetailContext,
  TrainingTypeContext,
} from "./src/context/partContext";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  const [weights, setWeights] = useState<string | undefined>("0");
  const [times, setTimes] = useState<number | undefined>(0);
  const [recovery, setRecovery] = useState<string>("0");
  const [trial, setTrial] = useState<string>("0");
  const [segment, setSegment] = useState<string | undefined>("weights");
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isNewEvent, setIsNewEvent] = useState<boolean>(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [addEvent, setAddEvent] = useState<string>("");
  const [part, setPart] = useState<string>("");
  const [partDetails, setPartDetails] = useState<PART_DETAILS[]>([]);
  const [partDetail, setPartDetail] = useState<string>("");
  const [trainingType, setTrainingType] = useState<string>("");

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      <IsNewEventContext.Provider value={{ isNewEvent, setIsNewEvent }}>
        <TrainingTypeContext.Provider value={{ trainingType, setTrainingType }}>
          <partDetailContext.Provider value={{ partDetail, setPartDetail }}>
            <partDetailsContext.Provider
              value={{ partDetails, setPartDetails }}
            >
              <partContext.Provider value={{ part, setPart }}>
                <addEventContext.Provider value={{ addEvent, setAddEvent }}>
                  <trialContext.Provider value={{ trial, setTrial }}>
                    <recoveryContext.Provider value={{ recovery, setRecovery }}>
                      <IsNewContext.Provider value={{ isNew, setIsNew }}>
                        <SegmentContext.Provider
                          value={{ segment, setSegment }}
                        >
                          <TimesContext.Provider value={{ times, setTimes }}>
                            <WeightsContext.Provider
                              value={{ weights, setWeights }}
                            >
                              <AppNavigator />
                            </WeightsContext.Provider>
                          </TimesContext.Provider>
                        </SegmentContext.Provider>
                      </IsNewContext.Provider>
                    </recoveryContext.Provider>
                  </trialContext.Provider>
                </addEventContext.Provider>
              </partContext.Provider>
            </partDetailsContext.Provider>
          </partDetailContext.Provider>
        </TrainingTypeContext.Provider>
      </IsNewEventContext.Provider>
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
