import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";

const StatisticsScreen: React.FC = () => {
  const [dates, setDates] = useState({ start: "2025-01-01", end: "2025-12-31" });
  const [showCalendar, setShowCalendar] = useState<"start" | "end" | null>(null);
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");

  const handleDateSelect = (date: string, type: "start" | "end") => {
    setDates((prev) => ({ ...prev, [type]: date }));
    setShowCalendar(null);
  };

  const statisticsData = [
    { date: "12.02.2025", time_stat: { "9": { tap_count: [10, 18], success: true, in_time: false }, "14": { tap_count: [10, 18], success: true, in_time: false }, "19": { tap_count: [10, 8], success: false, in_time: true } } },
    { date: "11.02.2025", time_stat: { "10": { tap_count: [15, 20], success: true, in_time: true }, "14": { tap_count: [25, 22], success: false, in_time: false } } }
  ];

  return (
    <View style={styles.container}>
      <Header title="Смирнова Н. В." createBackButton />
      <View style={styles.content}>
        <View style={styles.dateSelection}>
          {(["start", "end"] as const).map((type) => (
            <View key={type} style={styles.dateButtonContainer}>
              <Text style={styles.dateLabel}>{type === "start" ? "Дата начала" : "Дата окончания"}</Text>
              <TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendar(type)}>
                <Text style={styles.dateValue}>{dates[type]}</Text>
                <AntDesign name="calendar" size={20} color={Colors.main} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <ScrollView style={styles.statistics}>
          {statisticsData.map(({ date, time_stat }) => (
            <View key={date}>
              <TouchableOpacity style={styles.dateHeader} onPress={() => setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }))}>
                <Text style={styles.dateTitle}>{date}</Text>
                <AntDesign name={expandedDates[date] ? "up" : "down"} size={20} color={Colors.main} />
              </TouchableOpacity>
              {expandedDates[date] && Object.entries(time_stat).map(([time, stat]) => (
                <View key={time} style={styles.timeItem}>
                  <Text style={styles.timeText}>{time}:00 | {stat.tap_count.join(" / ")} нажатий | {stat.success ? "Успешно" : "Неуспешно"} | {stat.in_time ? "Вовремя" : "Не вовремя"}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.emailContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="doctor@mail.com"
            placeholderTextColor={Colors.inputInactiveText}
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Feather name="send" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>Скачать статистику</Text>
          <AntDesign name="download" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {showCalendar && (
        <Modal transparent animationType="slide" onRequestClose={() => setShowCalendar(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={(day) => handleDateSelect(day.dateString, showCalendar)}
                markedDates={{ [dates[showCalendar]]: { selected: true, selectedColor: Colors.main } }}
                theme={{
                  calendarBackground: Colors.primary,
                  selectedDayBackgroundColor: Colors.main,
                  selectedDayTextColor: Colors.primary,
                  todayTextColor: Colors.main,
                  dayTextColor: Colors.headerText,
                  arrowColor: Colors.main,
                }}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(null)}>
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundScreen },
  content: { padding: 20, flex: 1 },
  dateSelection: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  dateButtonContainer: { width: "48%" },
  dateButton: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, backgroundColor: Colors.primary, borderRadius: 8, marginTop: 5 },
  dateValue: { fontSize: 16, color: Colors.headerText },
  dateLabel: { fontSize: 14, color: Colors.headerText, marginBottom: 5 },
  statistics: { flex: 1 },
  dateHeader: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: Colors.primary, borderRadius: 8, marginBottom: 16 },
  dateTitle: { fontSize: 24, fontWeight: "bold", color: Colors.main },
  timeItem: { padding: 10, backgroundColor: Colors.primary, borderRadius: 8, marginBottom: 8 },
  timeText: { fontSize: 14, fontWeight: "bold", color: Colors.headerText },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "90%", backgroundColor: Colors.primary, borderRadius: 8, padding: 16 },
  closeButton: { marginTop: 16, padding: 10, backgroundColor: Colors.main, borderRadius: 8, alignItems: "center" },
  closeButtonText: { color: Colors.primary, fontSize: 16 },
  footer: { padding: 20, backgroundColor: Colors.primary, borderTopWidth: 1, borderTopColor: Colors.border },
  emailContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  emailInput: { flex: 1, padding: 10, backgroundColor: Colors.backgroundScreen, borderRadius: 8, marginRight: 10, color: Colors.headerText },
  sendButton: { padding: 10, backgroundColor: Colors.main, borderRadius: 8 },
  downloadButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10, backgroundColor: Colors.main, borderRadius: 8 },
  downloadText: { color: Colors.primary, fontSize: 16, marginRight: 10 },
});

export default StatisticsScreen;