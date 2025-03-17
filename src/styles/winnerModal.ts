import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 25,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',
    },
    winnerText: {
      fontSize: 20,
      color: 'black',
      fontWeight: '600',
      marginBottom: 25,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      backgroundColor: '#4a90e2',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      minWidth: 100,
      alignItems: 'center',
    },
    menuButton: {
      backgroundColor: '#666',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  