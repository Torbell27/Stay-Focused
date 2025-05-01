import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "@/components/Header";
import TimeSelector from "@/components/TaskSettings/TimeSelector";
import CounterSection from "@/components/TaskSettings/CounterSection";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import { Colors } from "@/constants/Colors";
import { useRouter, useLocalSearchParams } from "expo-router";
import Selector from "@/components/Selector";
import api from "@/scripts/api";
import LoadingModal from "@/components/LoadingModal";

const TaskSettings = () => {
  const router = useRouter();
  const {
    firstname = "",
    surname = "",
    lastname = "",
    patientId = "",
  } = useLocalSearchParams<{
    firstname: string;
    surname: string;
    lastname: string;
    patientId: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>();

  const lastnameStr = lastname ? `${lastname[0]}.` : ``;
  const formattedFirstName = `${surname} ${firstname[0]}. ${lastnameStr}`;

  useEffect(() => {
    api
      .getPatientActivity(patientId)
      .then((response) => {
        if (response?.activity) loadData(response.activity);
        else
          loadData({
            level: 1,
            tap_count: [10, 12],
            selected_time: [],
          });
      })
      .catch(() => {
        setIsLoading(false);
        setErrMsg("Не удалось загрузить задания");
      });
  }, []);

  const loadData = (activity: Record<string, any>) => {
    if (activity.level) {
      setLevel(activity.level.toString());
      setSelectedTimes(activity.selected_time.map(Number));
      setFirstSeriesCount(
        Array.isArray(activity.tap_count)
          ? activity.tap_count[0]
          : activity.tap_count
      );
      if (Array.isArray(activity.tap_count))
        setSecondSeriesCount(activity.tap_count[1]);
    } else setErrMsg("Не удалось загрузить задания");
    setIsLoading(false);
  };

  const [level, setLevel] = useState<string>();
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [firstSeriesCount, setFirstSeriesCount] = useState<number>();
  const [secondSeriesCount, setSecondSeriesCount] = useState<number>(12);

  const handleSave = () => {
    if (level) {
      setIsLoading(true);
      api
        .putPatientActivity(patientId, {
          level: parseInt(level),
          tap_count:
            level === "1"
              ? firstSeriesCount
              : [firstSeriesCount, secondSeriesCount],
          selected_time: selectedTimes.sort((a, b) => a - b).map(String),
        })
        .then(() => router.back())
        .catch(() => {
          setIsLoading(false);
          setErrMsg("Не удалось сохранить задания");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Header title={formattedFirstName} />
      <LoadingModal visible={isLoading} />

      {errMsg && (
        <View style={styles.message}>
          <Text style={styles.messageText}>{errMsg}</Text>
        </View>
      )}

      {!isLoading && !errMsg && (
        <>
          <View style={styles.content}>
            {level && (
              <Selector
                selected={level}
                onSelect={setLevel}
                mainLabel="Уровень сложности"
                keys={{ "1": "Простой", "2": "Сложный" }}
              />
            )}

            <TimeSelector
              selectedTimes={selectedTimes}
              onSelectTime={(time) => {
                if (selectedTimes.includes(time)) {
                  setSelectedTimes(selectedTimes.filter((t) => t !== time));
                } else {
                  setSelectedTimes([...selectedTimes, time]);
                }
              }}
            />

            {level && firstSeriesCount !== undefined && (
              <CounterSection
                firstSeriesCount={firstSeriesCount}
                secondSeriesCount={secondSeriesCount}
                onFirstSeriesChange={setFirstSeriesCount}
                onSecondSeriesChange={setSecondSeriesCount}
                level={level}
              />
            )}
          </View>
          <Footer
            components={[
              <FooterButton onPress={handleSave} label="Сохранить" key="1" />,
            ]}
          ></Footer>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingTop: 20,
    alignItems: "center",
  },
  messageText: {
    color: Colors.headerText,
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.backgroundScreen,
    flex: 1,
    fontFamily: "Montserrat-Regular",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 16,
    gap: 24,
  },
});

export default TaskSettings;
