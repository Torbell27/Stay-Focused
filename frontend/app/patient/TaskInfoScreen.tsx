import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TaskScheduleItem from "@/components/TaskInfoScreen/TaskScheduleItem";
import Footer from "@/components/Footer";
import FooterButton from "@/components/FooterButton";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import axios from "axios";

const TaskInfoScreen: React.FC = () => {
  const [difficulty, setDifficulty] = useState<string>("notsimple");
  const [headerUserName, setHeaderUserName] = useState<string>("Иванова И. И.");
  const [taskData, setTaskData] = useState<any[]>([]);
  const [taskInstructionText, setTaskInstructionText] = useState<string>("");

  useEffect(() => {
    axios.get("https://api.example.com/tasks")
      .then(response => setTaskData(response.data))
      .catch((error) => {
        const defaultTasks = [
          { id: "1", time: "9:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "2", time: "11:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "3", time: "16:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "4", time: "20:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "5", time: "9:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "6", time: "11:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "7", time: "16:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "8", time: "20:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "9", time: "9:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "10", time: "11:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "11", time: "16:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
          { id: "12", time: "20:00", series1: "1-ая серия: 10 нажатий", series2: "2-ая серия: 12 нажатий" },
        ];
        setTaskData(defaultTasks);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const instruction = difficulty === "simple" ? "выполните одну серию" : "выполните две серии";
    setTaskInstructionText(`Задание: ${instruction} нажатий с перерывом в минуту`);
  }, [difficulty]);
  const router = useRouter();
  const handleStartTask = () => {
    console.log("Starting task...");
  };
  const handleLogout = () => {
    router.back();
  };
  return (
    <View style={styles.container}>
        <Header title={headerUserName} createBackButton={false} logoutFunc={handleLogout}/>
      <View style={styles.taskInstruction}>
        <Text style={styles.taskInstructionText}>{taskInstructionText}</Text>
      </View>
      <ScrollView style={styles.schedule}>
        {taskData.map((task) => (
          <TaskScheduleItem key={task.id} task={task} />
        ))}
      </ScrollView>
      <Footer components={[
        <FooterButton key="1" onPress={handleStartTask} label="Приступить к заданию" />
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#ffffff",
    flex: 1,
    fontFamily: "Montserrat-Regular",
  },
  taskInstruction: {
    marginTop: 24,
  },
  taskInstructionText: {
    color: Colors.headerText,
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    lineHeight: 23,
    textAlign: "center",
    marginHorizontal: 16,
  },
  schedule: {
    marginTop: 24,
  },
});

export default TaskInfoScreen;