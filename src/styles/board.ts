import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    board: {
      backgroundColor: '#fff',
      padding: 8,
      borderRadius: 8,
      margin: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    deadBoard: {
      opacity: 0.6,
      backgroundColor: '#f8f8f8',
    },
    row: {
      flexDirection: 'row',
    },
  });