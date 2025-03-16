import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import RegistrationForm from "@/components/DoctorMain/RegistrationForm";
import PatientList from "@/components/DoctorMain/PatientList";
import Selector from "@/components/Selector";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

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
    const [headerUserName, setHeaderUserName] = useState("Иванова И. И."); 
    const [selc, setSelc] = useState<0 | 1>(0);
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        firstName: '',
        secondName: '',
        patronymic: '',
        username: '',
        password: '',
        email: ''
    });

    const handleRegister = () => {
        console.log(registrationData); 
    };

    const handleFormChange = (data: RegistrationData) => {
        setRegistrationData(data); 
    };

    const handleLogout = () => {
        router.back(); 
    };

    return (
        <View style={styles.container}>
            <Header title={headerUserName} createBackButton={false} logoutFunc={handleLogout} />

            <View style={styles.content}>
                <Selector 
                    selected={selc}
                    onSelect={setSelc}
                    firstLabel = "Список пациентов"
                    secondLabel = "Регистрация пациента"
                    showLabel = {false}
                    buttonHeight={50}
                />
            </View>

            {selc === 0 && (
               <View style={styles.list}>
                    <PatientList/>
               </View> 
            )}

            {selc === 1 && (
                <> 
                 <RegistrationForm onFormChange={handleFormChange} />
                    <Footer
                        components={[
                        <FooterButton onPress={handleRegister} label="Зарегистрировать" key="1" />,
                        ]}>
                   </Footer> 
                </>
            )}
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
  content:{
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  list:{
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }
});

export default DoctorMain;