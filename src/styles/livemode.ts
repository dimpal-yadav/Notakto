import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    waitingContainer: {
        alignItems: "center",
        gap: 20,
    },
    waitingText: {
        fontSize: 18,
        color: "#333",
    },
    turnText: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
    },
    boardsContainer: {
        gap: 20,
    },
    board: {
        width: 300,
        height: 100,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
    },
    blockedBoard: {
        opacity: 0.5,
    },
    cell: {
        width: "33.333%",
        height: "33.333%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f8f8f8",
    },
    cellText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#444",
    },
    footer: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    footerText: {
        fontSize: 18,
        color: 'white'
    },
});