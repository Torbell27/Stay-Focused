import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import DifficultySelector from "@/components/DifficultySelector";
import TimeSelector from "@/components/TimeSelector";
import CounterSection from "@/components/CounterSection";
import FooterButton from "@/components/FooterButton";
import { Colors } from "@/constants/Colors";

const TaskSettings = () => {
  const [difficulty, setDifficulty] = useState<"simple" | "complex">("simple");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [firstSeriesCount, setFirstSeriesCount] = useState(10);
  const [secondSeriesCount, setSecondSeriesCount] = useState(12);

  const handleSave = () => {
    // Handle save functionality
    console.log({
      difficulty,
      selectedTimes,
      firstSeriesCount,
      secondSeriesCount,
    });
  };

  return (
    <View style={styles.container}>
      <Header userName="Смирнова Н. В." isPatient={true} />

      <View style={styles.content}>
        <DifficultySelector
          selectedDifficulty={difficulty}
          onSelectDifficulty={setDifficulty}
        />

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

        <CounterSection
          firstSeriesCount={firstSeriesCount}
          secondSeriesCount={secondSeriesCount}
          onFirstSeriesChange={setFirstSeriesCount}
          onSecondSeriesChange={setSecondSeriesCount}
        />
      </View>

      <FooterButton onPress={handleSave} label="Сохранить" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.backgroundScreen,
    flex: 1,
    fontFamily: "Montserrat-Regular,sans-serif",
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
