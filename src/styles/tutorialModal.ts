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
      width: '80%',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: 'black',
    },
    modalText: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 20,
      color: 'black',
    },
    modalButton: {
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
    },
    modalButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });