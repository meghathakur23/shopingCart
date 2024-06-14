import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
  }
  const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style, textStyle }) => {
    return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      width:'40%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#F05152',
      backgroundColor: 'transparent', // Default transparent for outline style
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#F05152',
    },
  });


  export default CustomButton;