import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import Header from "@/components/Header";
import RegistrationForm from "@/components/DoctorMain/RegistrationForm";
import PatientList from "@/components/DoctorMain/PatientList";
import Selector from "@/components/Selector";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { validateForm } from "@/components/ValidateInputs";
import api from "@/scripts/api";
import { storeTokens, getIdFromToken } from '@/scripts/jwt';
import { checkCode } from "@/components/CheckErrorCode";
import ModalWindow from "@/components/ModalWindow";

type RegistrationData = {
  firstName: string;
  secondName: string;
  patronymic: string;
  username: string;
  password: string;
  email: string;
};

const DoctorMain: React.FC = () => {
  const router = useRouter();
  const [headerUserName, setHeaderUserName] = useState<string>("Имя Ф. О.");
  const [selc, setSelc] = useState<string>("patient_list");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false); 
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); 
  const [error, setError] = useState<string>();
  const [modalType, setModalType] = useState<"logout" | "register" | "confirmed" | "error" | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: "",
    secondName: "",
    patronymic: "",
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    getIdFromToken()
      .then((userId) => {
        if (userId) {
          setDoctorId(userId); 
          api
            .doctorName(userId)
            .then((response) => {
              const formattedFirstName = `${response.surname} ${response.firstname[0]}. ${response.lastname[0]}.`;
              setHeaderUserName(formattedFirstName);
            })
            .catch((error) => {
              const err = checkCode(error.message);
              setError(err);
            });
        } else {
          console.log('Failed to get user Role.');
        }
      })
      .catch((error) => {
        console.error('Error getting user role:', error);
      });
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleFormChange = (data: RegistrationData) => {
    setRegistrationData(data);
  };

  const handleRegister = () => {
    const errors = validateForm(registrationData, true);
    const filteredErrors = Object.fromEntries(
      Object.entries(errors).map(([key, value]) => [key, value || ""])
    );
    setFormErrors(filteredErrors);
  
    if (Object.keys(filteredErrors).length === 0) {
      setModalType("register");
      console.log(registrationData);
    }
  };
  
  const showModal = (type: "logout" | "register" | "confirmed" | "error" | null) => setModalType(type);
  const handleRegistrationConfirm = async () => {
    try {
      if (doctorId && registrationData) {
        console.log("Данные регистрации:", { doctorId, ...registrationData }); 
        const response = await api.registerPatient({
          doctorId: doctorId,
          ...registrationData,
        })

        if (response.status === "success") {
          console.log("Успешная регистрация:", response);
          showModal("confirmed");
        } else {
          setError("Ошибка при регистрации пациента");
          showModal("error");
        }
      }
    } catch (error) {
      setError("Ошибка при регистрации пациента");
      showModal("error");
    }
  };
  const handleLogout = () => showModal("logout");
  const handleLogoutConfirm = () => {
    showModal(null);
    router.back();
  };

  return (
    <View style={styles.container}>
       {["logout", "register", "confirmed", "error"].map((type) => (
      <ModalWindow
        key={type}
        visible={modalType === type}
        type={type === "confirmed" || type === "error" ? "information" : "confirmation"}
        message={
          type === "logout" ? "Вы действительно хотите выйти?" :
          type === "register" ? "Вы действительно хотите зарегистрировать?" :
          type === "confirmed" ? "Пользователь успешно зарегистрирован" :
          type === "error" ? "Ошибка при регистрации пациента":
          "Ошибка при регистрации пациента"
        }
        onConfirm={type === "logout" ? handleLogoutConfirm : type === "register" ? handleRegistrationConfirm : () => showModal(null)}
        onCancel={() => showModal(null)}
        confirmText={type === "register" ? "Зарегистрировать" : type === "logout" ? "Выйти" : "Ок"}
        cancelText={type === "logout" || type === "register" ? "Отмена" : ""}
      />
    ))}

      <Header
        title={headerUserName}
        createBackButton={false}
        logoutFunc={handleLogout}
      />

      <View style={styles.content}>
        <Selector
          selected={selc}
          onSelect={setSelc}
          keys={{
            patient_list: "Список пациентов",
            patient_registration: "Регистрация пациента",
          }}
          buttonHeight={50}
        />
      </View>

      {selc === "patient_list" && doctorId &&  (
        <View style={styles.list}>
          <PatientList doctorId={doctorId}/>
        </View>
      )}

      {selc === "patient_registration" && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <RegistrationForm
                  onFormChange={handleFormChange}
                  errors={formErrors}
              />
               {!isKeyboardVisible && ( 
                <Footer
                  components={[
                    <FooterButton
                      onPress={handleRegister}
                      label="Зарегистрировать"
                      key="1"
                    />,
                  ]}
                />
              )}
          </ScrollView>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  successMessageContainer: {
    position: "absolute",
    top: "50%", 
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, 
  },
  successMessage: {
    color: Colors.headerText,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.backgroundScreen,
    flex: 1,
    fontFamily: "Montserrat-Regular",
  },
  content: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

export default DoctorMain;
