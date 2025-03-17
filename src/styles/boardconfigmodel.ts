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
      padding: 20,
      borderRadius: 10,
      width: '90%',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: 'white'
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginVertical: 10,
      color: 'white'
    },
    buttonGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 15,
    },
    sizeButton: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#e0e0e0',
      minWidth: 60,
      alignItems: 'center',
    },
    selected: {
      backgroundColor: '#c4a2d4'
    },
    buttonText: {
      color: '#333',
      fontWeight: '500',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    cancelButton: {
      backgroundColor: '#c4a2d4',
      padding: 12,
      borderRadius: 8,
      flex: 1,
      marginRight: 8,
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: '#c4a2d4',
      padding: 12,
      borderRadius: 8,
      flex: 1,
      alignItems: 'center',
    },
  });
  