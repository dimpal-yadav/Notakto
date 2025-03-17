import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      padding: 20,
      borderRadius: 10,
      width: '90%',
      maxWidth: 400,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      padding: 15,
      borderRadius: 8,
      marginVertical: 5,
      backgroundColor: '#c4a2d4',
    },
    difficultyButton: {
      backgroundColor: '#e1e1e1', // Base color will be overridden
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    cancelText:{
      color: '#c4a2d4',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    cancelButton: {
      marginTop: 15,
      backgroundColor: 'white',
      padding: 12,
      borderRadius: 8,
      color: 'black'
    },
    difficultyText: {
      color: '#333',
      fontSize: 14,
    },
  });
  