import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { View, TextInput, StyleSheet, Text, Pressable, 
    KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useTogglePasswordVisibility, passwordInputStyles } from "@/hook/PasswordVisibility";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import TextField from '@/components/TextInputCustom';
import { filterUsernameText, filterPasswordText, validateForm } from "@/components/ValidateInputs";

type AuthorizationData = {
    username: string;
    password: string;
}

interface RegistrationFieldsProps {
    errors: { [key: string]: string }; 
}

const AuthorizationForm: React.FC<RegistrationFieldsProps> = ({ errors = {} }) => {  
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});  
    const [authorizationData, setAuthorizationData] = useState<AuthorizationData>({
        username: "",
        password: "",
    });

    const handleChange = (field: keyof AuthorizationData) => (text: string) => {
        setAuthorizationData((prev) => ({ ...prev, [field]: text }));
    };

    const handleAuthorize = () => {
        const errors = validateForm(authorizationData, false);  
        
        const filteredErrors = Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value || ""]) 
        );
    
        setFormErrors(filteredErrors);  
    
        if (Object.keys(filteredErrors).length === 0) {
          console.log(authorizationData);
        }
        else {
            console.log('Validation errors:', filteredErrors); 
        }
    };

    return (
        <View style={styles.container}>
            <Header title={"Авторизация"} createBackButton={true} />
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.formContainer}>  
                <ScrollView contentContainerStyle={styles.formContent}>
                    <View style={styles.inputContainer}>
                        <TextField
                            label="Логин"
                            value={authorizationData.username}
                            onChangeText={handleChange('username')}
                            errorText={formErrors.username || errors.username || null}
                            onFocus={() => setFocusedInput('username')}
                            onBlur={() => setFocusedInput(null)}
                        />
                     </View>
                    <View style={styles.inputContainer}>
                        <TextField
                            label="Пароль"
                            value={authorizationData.password}
                            onChangeText={handleChange('password')}
                            errorText={formErrors.password || errors.password || null}
                            secureTextEntry={passwordVisibility}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <Pressable 
                            onPress={handlePasswordVisibility} 
                            style={passwordInputStyles.iconButton} 
                            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
                            <Ionicons name={rightIcon} size={24} color={Colors.secondary} />
                        </Pressable>
                    </View>
                   
            
                </ScrollView>
            </KeyboardAvoidingView>

            <Footer components={[<FooterButton onPress={handleAuthorize} label="Войти" key="1" />]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: Colors.backgroundScreen,
        flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",  
        paddingHorizontal: 20,
    },
    formContent: {
        flexGrow: 1,
        justifyContent: "center", 
    },
    inputContainer: {
        marginTop: 15, 
    },
});

export default AuthorizationForm;
