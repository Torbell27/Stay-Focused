import { useState } from 'react';
import { StyleSheet } from 'react-native';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState<'eye' | 'eye-off'>('eye');  

  const handlePasswordVisibility = () => {
    setPasswordVisibility(prevVisibility => !prevVisibility);
    setRightIcon(prevIcon => (prevIcon === 'eye' ? 'eye-off' : 'eye'));
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

export const passwordInputStyles = StyleSheet.create({
  iconButton: {
    position: 'absolute',
    right: 10,
    top: 26,
    transform: [{ translateY: -15 }],
  },
  passwordContainer: {
    position: 'relative',
  },
});