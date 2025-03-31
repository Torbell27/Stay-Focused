import React from "react";
import { View, Modal, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={Colors.main} />
          <Text style={styles.loadingText}>Загрузка...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.headerText,
  },
});

export default LoadingModal;
