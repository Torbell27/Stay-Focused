import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'
import { Colors } from "@/constants/Colors";

type Props = React.ComponentProps<typeof TextInput> & {
  label: string
  errorText?: string | null
}

const TextField: React.FC<Props> = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    ...restOfProps
  } = props
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<TextInput>(null)
  const focusAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.1, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, value])

  let borderColor = isFocused ? Colors.main : Colors.border;
  let textColor = Colors.inputInactiveText;
  if (errorText) {
    borderColor = 'red';
    textColor = 'red';
  } else if (isFocused) {
    textColor = "black";
  }

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: borderColor,
            color: textColor, 
          },
          style,
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        onFocus={(event) => {
          setIsFocused(true)
          onFocus?.(event)
        }}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 2],
                    outputRange: [16, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 2],
                    outputRange: [10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                borderColor: borderColor,
                color: textColor, 
              },
            ]}
          >
            {label}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingLeft:20,
    borderWidth: 1,
    borderRadius: 4,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlignVertical:"bottom",
    height: 50,
    backgroundColor: Colors.primary,
    paddingBottom: 4
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: 100,
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: 'red',
    fontFamily: 'Montserrat-Regular',
  },
})

export default TextField