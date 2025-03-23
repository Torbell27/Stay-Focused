import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { View, TextInput, StyleSheet, Text, Pressable, 
    KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility, passwordInputStyles } from "@/hook/PasswordVisibility";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
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

    const getInputStyle = (field: string) => {
        return [
            styles.input,
            (errors[field] && styles.inputError), 
            (focusedInput === field && styles.focusedInput) 
        ];
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
                    <TextInput
                        style={getInputStyle("username")}
                        placeholder="Логин"
                        onFocus={() => setFocusedInput('username')}
                        onBlur={() => setFocusedInput(null)}
                        onChangeText={(text) => setAuthorizationData((prev) => ({ ...prev, username: filterUsernameText(text) }))} 
                        value={authorizationData.username}
                    />
                    {formErrors.username && <Text style={styles.errorText}>{formErrors.username}</Text>}
                
                    <View style={passwordInputStyles.passwordContainer}>
                        <TextInput
                            style={getInputStyle("password")}
                            placeholder="Пароль"
                            secureTextEntry={passwordVisibility}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                            onChangeText={(text) => setAuthorizationData({ ...authorizationData, password: filterPasswordText(text) })}
                            value={authorizationData.password}
                        />
                        <Pressable onPress={handlePasswordVisibility} style={passwordInputStyles.iconButton}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                        </Pressable>
                    </View>
                    {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
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
    input: {
        backgroundColor: Colors.primary,
        borderColor: Colors.border,
        color: Colors.inputInactiveText,
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    focusedInput: {
        borderColor: Colors.main,
        color: "#2A2A2A",
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
        paddingHorizontal: 5,
        position: 'relative',
    },
});

export default AuthorizationForm;
