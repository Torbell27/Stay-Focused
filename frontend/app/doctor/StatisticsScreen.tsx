import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import ModalWindow from "@/components/ModalWindow";

const StatisticsScreen: React.FC = () => {
  const [dates, setDates] = useState({ start: "2025-01-01", end: "2025-12-31" });
  const [showCalendar, setShowCalendar] = useState<"start" | "end" | null>(null);
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"confirmation" | "information">("confirmation");
  const [modalMessage, setModalMessage] = useState("");

  const handleDateSelect = (date: string, type: "start" | "end") => {
    setDates((prev) => ({ ...prev, [type]: date }));
    setShowCalendar(null);
  };

  const statisticsData = [
    { date: "05.01.2025", time_stat: { "10": { timestamp_start: 36000, success: true, in_time: true, tap_count: [12, 15] } } },
    { date: "08.01.2025", time_stat: { "14": { timestamp_start: 50400, success: false, in_time: false, tap_count: [8, 10] } } },
    {
      "date": "12.02.2025",
      "time_stat":{
         "9":  {
           "timestamp_start": 32400,
           "success": true,
           "in_time": false,
           "tap_count": [10,18]
         },
         "14":  {
           "timestamp_start": 50400,
           "success": true,
           "in_time": false,
           "tap_count": [10,18]
         }
        ,
         "19":  {
           "timestamp_start": 72000,
           "success": false,
           "in_time": true,
           "tap_count": [10,8]
         }
      }
        
   },
    { date: "15.01.2025", time_stat: { "16": { timestamp_start: 57600, success: true, in_time: true, tap_count: [20, 22] } } },
    { date: "19.01.2025", time_stat: { "18": { timestamp_start: 64800, success: false, in_time: true, tap_count: [10, 12] } } },
    { date: "23.01.2025", time_stat: { "11": { timestamp_start: 39600, success: true, in_time: false, tap_count: [18, 20] } } },
    { date: "27.01.2025", time_stat: { "20": { timestamp_start: 72000, success: false, in_time: true, tap_count: [16, 18] } } },
    { date: "31.01.2025", time_stat: { "13": { timestamp_start: 46800, success: true, in_time: true, tap_count: [22, 24] } } },
    { date: "02.02.2025", time_stat: { "10": { timestamp_start: 36000, success: true, in_time: false, tap_count: [10, 12] } } },
    { date: "05.02.2025", time_stat: { "15": { timestamp_start: 54000, success: false, in_time: false, tap_count: [14, 16] } } },
    { date: "09.02.2025", time_stat: { "12": { timestamp_start: 43200, success: true, in_time: true, tap_count: [18, 20] } } },
    { date: "12.02.2025", time_stat: { "9": { timestamp_start: 32400, success: true, in_time: false, tap_count: [10, 18] }, "14": { timestamp_start: 50400, success: true, in_time: false, tap_count: [10, 18] }, "19": { timestamp_start: 72000, success: false, in_time: true, tap_count: [10, 8] } } },
    { date: "16.02.2025", time_stat: { "8": { timestamp_start: 28800, success: false, in_time: true, tap_count: [12, 14] } } },
    { date: "20.02.2025", time_stat: { "17": { timestamp_start: 61200, success: true, in_time: false, tap_count: [20, 25] } } },
    { date: "24.02.2025", time_stat: { "19": { timestamp_start: 68400, success: false, in_time: true, tap_count: [15, 18] } } },
    { date: "28.02.2025", time_stat: { "11": { timestamp_start: 39600, success: true, in_time: false, tap_count: [22, 26] } } },
    { date: "03.03.2025", time_stat: { "14": { timestamp_start: 50400, success: false, in_time: true, tap_count: [18, 20] } } },
    { date: "07.03.2025", time_stat: { "16": { timestamp_start: 57600, success: true, in_time: false, tap_count: [25, 28] } } },
    { date: "11.03.2025", time_stat: { "13": { timestamp_start: 46800, success: false, in_time: true, tap_count: [12, 15] } } },
    { date: "15.03.2025", time_stat: { "9": { timestamp_start: 32400, success: true, in_time: true, tap_count: [16, 18] } } },
    { date: "19.03.2025", time_stat: { "20": { timestamp_start: 72000, success: false, in_time: false, tap_count: [14, 16] } } },
    { date: "23.03.2025", time_stat: { "10": { timestamp_start: 36000, success: true, in_time: false, tap_count: [20, 22] } } },
    { date: "27.03.2025", time_stat: { "15": { timestamp_start: 54000, success: false, in_time: true, tap_count: [10, 12] } } },
    { date: "30.03.2025", time_stat: { "18": { timestamp_start: 64800, success: true, in_time: true, tap_count: [22, 24] } } }
  ];
  

  const formatDateToISO = (date: string) => {
    const [day, month, year] = date.split(".");
    return `${year}-${month}-${day}`;
  };

  const filteredStatistics = statisticsData.filter(({ date }) => {
    const isoDate = formatDateToISO(date);
    return isoDate >= dates.start && isoDate <= dates.end;
  });

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSendPress = () => {
    setModalMessage(`Вы действительно хотите отправить на ${email}?`);
    setModalType("confirmation");
    setModalVisible(true);
  };

  const handleConfirmSend = () => {
    setModalMessage(`Отправлено на почту ${email}`);
    setModalType("information");
    // Здесь можно добавить реальную логику отправки
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };


  return (
      <View style={styles.container}>
        <Header title="Слендермен Н. В." createBackButton />
        <View style={styles.content}>
          <View style={styles.dateSelection}>
            <View style={styles.dateWrapper}>
              <Text style={styles.dateLabel}>Дата начала</Text>
              <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => setShowCalendar("start")}
              >
                <Text style={styles.dateValue}>{dates.start}</Text>
                <AntDesign name="calendar" size={20} color={Colors.headerText} />
              </TouchableOpacity>
            </View>
  
            <View style={styles.dateWrapper}>
              <Text style={styles.dateLabel}>Дата окончания</Text>
              <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => setShowCalendar("end")}
              >
                <Text style={styles.dateValue}>{dates.end}</Text>
                <AntDesign name="calendar" size={20} color={Colors.headerText} />
              </TouchableOpacity>
            </View>
          </View>
  
        <ScrollView style={styles.statistics}>
          {filteredStatistics.length === 0 ? (
            <Text style={styles.noDataText}>Нет данных за выбранный период</Text>
          ) : (
            filteredStatistics.map(({ date, time_stat }) => (
              <View key={date} style={styles.dateContainer}>
                <TouchableOpacity
                  style={styles.dateHeader}
                  onPress={() => setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }))}
                >
                  <Text style={styles.dateTitle}>{date}</Text>
                  <AntDesign name={expandedDates[date] ? "up" : "down"} size={20} color={Colors.secondary} />
                </TouchableOpacity>

                {expandedDates[date] &&
                  Object.entries(time_stat).map(([time, stat]) => (
                    <View key={time} style={styles.timeItem}>
                      <View style={styles.timeHeader}>
                        <Text style={styles.timeText}>{formatTime(stat.timestamp_start)}</Text>
                        <AntDesign
                          name={stat.success ? "checkcircleo" : "closecircleo"}
                          size={20}
                          color={stat.success ? "#1BCD1B" : "#F47272"}
                          style={styles.icon} 
                          />
                          <AntDesign                       
                          name="clockcircleo"
                          size={20}
                          color={stat.in_time ? "#1BCD1B" : "#F47272"}
                        />
                      </View>
                      <Text style={styles.seriesText}>1-ая серия: {stat.tap_count[0]} нажатий</Text>
                      <Text style={styles.seriesText}>2-ая серия: {stat.tap_count[1]} нажатий</Text>
                    </View>
                  ))}
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.emailContainer}>
        <Text style={styles.label}>Отправить на почту</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="doctor@mail.com"
            placeholderTextColor={Colors.headerText}
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
            <Feather name="send" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>Скачать статистику</Text>
          <AntDesign name="download" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ModalWindow
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onConfirm={handleConfirmSend}
        onCancel={handleModalClose}
        confirmText="OK"
        cancelText="Отмена"
      />

      {showCalendar && (
        <Modal transparent animationType="slide" onRequestClose={() => setShowCalendar(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={(day: { dateString: string; }) => handleDateSelect(day.dateString, showCalendar)}
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
  dateSelection: {flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: 20,paddingHorizontal: 10},
  dateWrapper: {alignItems: 'center',justifyContent: 'center',width: '45%',},
  dateButton: {flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', width: '100%',  padding: 12, backgroundColor: Colors.primary, borderRadius: 8, marginTop: 5},
  dateLabel: {fontSize: 14,color: Colors.headerText,textAlign: 'center',fontFamily: 'Montserrat-SemiBold',},
  dateValue: {fontSize: 16,color: Colors.headerText,fontFamily: 'Montserrat-Regular',},
  statistics: { flex: 1 },
  dateContainer: { marginBottom: 16 },
  dateHeader: { flexDirection: "row", justifyContent: "space-between", padding: 10},
  dateTitle: { fontSize: 24, fontFamily: "Montserrat-Bold", color: Colors.main},
  timeItem: {padding: 10,backgroundColor: Colors.primary,borderRadius: 8,marginBottom: 8},
  timeHeader: {flexDirection: "row", alignItems: "center", marginBottom: 8},
  timeText: {fontSize: 16, fontFamily: "Montserrat-Bold", color: Colors.headerText, marginRight: 10},
  icon: {marginRight: 10},
  seriesText: {fontSize: 16, fontFamily: "Montserrat-Regular", color: Colors.headerText, marginBottom: 4,},
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "90%", backgroundColor: Colors.primary, borderRadius: 8, padding: 16 },
  closeButton: { marginTop: 16, padding: 10, backgroundColor: Colors.main, borderRadius: 8, alignItems: "center" },
  footer: {padding: 16, backgroundColor: Colors.primary, borderTopWidth: 1, borderTopColor: Colors.secondary, flexDirection: "column",  alignItems: "stretch",},
  emailContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: Colors.secondary, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: Colors.primary,position: "relative",},
  label: { position: "absolute", top: -9, left: 10, backgroundColor: Colors.primary, paddingHorizontal: 4, fontSize: 11, color: Colors.secondary },
  emailInput: { flex: 1, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: Colors.primary, borderRadius: 8, marginRight: 6, color: Colors.headerText },
  sendButton: { padding: 8, backgroundColor: Colors.main, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  downloadButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, backgroundColor: Colors.main, borderRadius: 8, marginTop: 16 },
  downloadText: { color: Colors.primary, fontSize: 16, marginRight: 8, fontWeight: "500" },
  closeButtonText: { color: Colors.primary, fontSize: 16 },
  noDataContainer: { alignItems: "center", justifyContent: "center", marginTop: 20 },
  noDataText: { fontSize: 16, color: Colors.headerText, fontFamily: "Montserrat-SemiBold" },
});

export default StatisticsScreen;