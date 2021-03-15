import React, { useEffect, useState } from "react";
import { StyleSheet, View, Animated, Alert, Dimensions } from "react-native";
import Constants from "expo-constants";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { IconButton } from "../component/IconButton";
import { TimerButton } from "../component/TimerButton";

const WIDTH = Dimensions.get("window").width;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CountDown">;
  route: RouteProp<RootStackParamList, "CountDown">;
};

export const CountDownScreen: React.FC<Props> = ({ navigation, route }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPicker, setIsPicker] = useState<boolean>(true);
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const [duration, setDuration] = useState<number>(Number(selectedValue) * 60);

  const sound_tmp = new Audio.Sound();
  const [sound, setSound] = useState<Audio.Sound>(sound_tmp);

  const loadSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../statics/sounds/Clock-Alarm01-2(Loop).mp3")
    );
    setSound(sound);
  };

  const playSound = async () => {
    console.log("Playing Sound");
    await sound.playAsync();
  };

  const unloadSound = async () => {
    console.log("unloaded sound");
    await sound.unloadAsync();
  };

  const recoveryAlert = () => {
    Alert.alert(
      "リカバリー終了",
      "",
      [
        {
          text: "OK",
          onPress: async () => {
            await unloadSound();
            // await stopSound();
          },
          // style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleOnComplete = async () => {
    await playSound();
    await setIsPicker(true);
    await setIsPlaying(false);
    await recoveryAlert();
  };

  useEffect(() => {
    navigation.setOptions({
      title: "タイマー",
      headerLeft: () => (
        <IconButton name="closecircleo" onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  return (
    <View>
      {isPicker && (
        <Picker
          style={styles.pickerContainer}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setDuration(Number(itemValue) * 60);
          }}
        >
          <Picker.Item label="1 分" value="1" />
          <Picker.Item label="2 分" value="2" />
          <Picker.Item label="3 分" value="3" />
          <Picker.Item label="4 分" value="4" />
          <Picker.Item label="5 分" value="5" />
          <Picker.Item label="6 分" value="6" />
          <Picker.Item label="7 分" value="7" />
          <Picker.Item label="8 分" value="8" />
          <Picker.Item label="9 分" value="9" />
          <Picker.Item label="10分" value="10" />
        </Picker>
      )}
      {isPicker || (
        <View style={styles.countDownContainer}>
          <CountdownCircleTimer
            size={(WIDTH / 10) * 9}
            isPlaying={isPlaying}
            duration={duration}
            colors="#004777"
            onComplete={() => {
              handleOnComplete();
            }}
          >
            {({ remainingTime, animatedColor }) => {
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;
              return (
                <Animated.Text
                  style={{ fontSize: WIDTH / 5, color: animatedColor }}
                >
                  {minutes}:{seconds >= 10 ? seconds : `0${seconds}`}
                </Animated.Text>
              );
            }}
          </CountdownCircleTimer>
        </View>
      )}
      <View style={styles.timerButtonContainer}>
        <TimerButton
          iconName="restart"
          onPress={async () => {
            setIsPicker(true);
            setIsPlaying(false);
            await unloadSound();
          }}
          disable={isPicker || isPlaying}
        />
        {isPlaying && (
          <TimerButton
            iconName="controller-stop"
            onPress={() => {
              setIsPlaying(false);
            }}
          />
        )}
        {isPlaying || (
          <TimerButton
            iconName="controller-jump-to-start"
            onPress={async () => {
              setIsPicker(false);
              setIsPlaying(true);
              await loadSound();
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countDownContainer: {
    height: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Constants.statusBarHeight / 2,
    // backgroundColor: "#ecf0f1",
  },
  pickerContainer: {
    height: WIDTH,
    justifyContent: "center",
    paddingVertical: Constants.statusBarHeight / 2,
  },
  timerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "3%",
  },
});
