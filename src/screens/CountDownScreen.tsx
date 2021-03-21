import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Alert,
  Dimensions,
  SafeAreaView,
  Text,
  FlatList,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import Accordion from "react-native-collapsible/Accordion";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { IconButton } from "../component/IconButton";
import { TimerButton } from "../component/TimerButton";
import { Icon } from "../component/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CountDown">;
  route: RouteProp<RootStackParamList, "CountDown">;
};

export const CountDownScreen: React.FC<Props> = ({ navigation, route }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPicker, setIsPicker] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedSound, setSelectedSound] = useState<string[]>(["0"]); // [ToDo] 永続化する
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const [duration, setDuration] = useState<number>(Number(selectedValue) * 60);

  const sound_tmp = new Audio.Sound();

  const [activeSection, setActiveSection] = useState([]);

  const SECTIONS = [{}]; // dummy

  const DATA = [
    { id: "0", title: "なし" },
    { id: "1", title: "Sound1" },
    { id: "2", title: "Sound2" },
    { id: "3", title: "Sound3" },
  ];

  const renderHeader = (
    section: any,
    index: any,
    isActive: any,
    sections: any
  ) => {
    return (
      <TouchableOpacity style={styles.soundSelectStyle}>
        <Text style={styles.textStyle}>タイマー終了時</Text>
        <View style={styles.soundStyle}>
          <Text style={styles.soundTextStyle}>
            {selectedSound.includes("0") ? "なし" : `Sound${selectedSound[0]}`}
          </Text>
          <View style={styles.iconStyle}>
            {isActive ? (
              <Icon name="up" color="#004777" />
            ) : (
              <Icon name="down" color="#004777" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = (_: any) => {
    return (
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const updateSections = (activeSections: any) => {
    setIsActive(!isActive);
    setActiveSection(activeSections);
  };

  const SoundItem = ({ id, title }: any) => (
    <TouchableOpacity
      style={styles.accordionListStyle}
      onPress={() => onPressSoundItem(id)}
    >
      <Text style={styles.accordionTextStyle}>{title}</Text>
      {selectedSound.includes(id) ? (
        <View style={styles.accordionIconStyle}>
          <Icon name="check" color={"#004777"} />
        </View>
      ) : null}
    </TouchableOpacity>
  );

  const renderItem = ({ item }: any) => (
    <SoundItem id={item.id} title={item.title} />
  );

  const onPressSoundItem = (id: string) => {
    if (!selectedSound.includes(id)) {
      setSelectedSound([id]);
    }
  };

  const loadSound = async () => {
    console.log("Loading Sound");
    const { sound } = (await selectedSound.includes("1"))
      ? await Audio.Sound.createAsync(
          require("../statics/sounds/Clock-Alarm01-1(Loop).mp3")
        )
      : (await selectedSound.includes("2"))
      ? await Audio.Sound.createAsync(
          require("../statics/sounds/Clock-Alarm01-2(Loop).mp3")
        )
      : await Audio.Sound.createAsync(
          require("../statics/sounds/Clock-Alarm01-3(Loop).mp3")
        );

    return sound;
  };

  const playSound = async (sound: any) => {
    console.log("Playing Sound");
    await sound.playAsync();
  };

  const unloadSound = async (sound: any) => {
    console.log("unloaded sound");
    await sound.unloadAsync();
  };

  const recoveryAlert = (sound?: any) => {
    Alert.alert(
      "リカバリー終了",
      "",
      [
        {
          text: "OK",
          onPress: sound
            ? async () => {
                await unloadSound(sound);
              }
            : () => {},
        },
      ],
      { cancelable: true }
    );
  };

  const handleOnComplete = async () => {
    if (!selectedSound.includes("0")) {
      const sound = await loadSound();
      await playSound(sound);
      await setIsPicker(true);
      await setIsPlaying(false);
      await recoveryAlert(sound);
    } else {
      await setIsPicker(true);
      await setIsPlaying(false);
      await recoveryAlert();
    }
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
    <SafeAreaView>
      {isPicker && (
        <Picker
          style={styles.pickerContainer}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setDuration(Number(itemValue) * 60);
          }}
        >
          <Picker.Item label="3 秒" value="0.05" />
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
            size={(HEIGHT / 10) * 4}
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
            }}
          />
        )}
      </View>
      <Accordion
        underlayColor={"#f2f2f2"}
        sections={SECTIONS}
        activeSections={activeSection}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  countDownContainer: {
    height: (HEIGHT / 10) * 4.2,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: (HEIGHT / 10) * 0.5,
    // backgroundColor: "#ecf0f1",
    // backgroundColor: "#222",
  },
  pickerContainer: {
    height: (HEIGHT / 10) * 4.2,
    justifyContent: "center",
    // marginVertical: (HEIGHT / 10) * 0.5,
  },
  timerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "3%",
    marginBottom: "5%",
  },
  soundSelectStyle: {
    height: 50,
    borderRadius: 5,
    marginHorizontal: "2%",
    marginBottom: "2%",
    backgroundColor: "#e3e3e4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  soundStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "2%",
  },
  iconStyle: {
    marginRight: "0%",
  },
  soundTextStyle: {
    fontSize: 18,
    marginRight: "5%",
    color: "#004777",
  },
  textStyle: {
    fontSize: 18,
    marginLeft: "2%",
  },
  accordionListStyle: {
    height: 45,
    borderRadius: 5,
    marginRight: "2%",
    marginLeft: "2%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionIconStyle: {
    marginRight: "2%",
  },
  accordionTextStyle: {
    color: "#555",
    fontSize: 16,
    marginLeft: "2%",
  },
});
