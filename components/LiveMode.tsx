import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { io } from "socket.io-client";
import LinearGradient from 'react-native-linear-gradient';

const socket = io("https://deciduous-incongruous-herring.glitch.me/");

type LiveProps = {
    onClose: () => void;
};

const LiveMode = ({ onClose }: LiveProps) => {
    const [boards, setBoards] = useState(Array(3).fill('').map(() => ({ grid: Array(9).fill(""), blocked: false })));
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [gameState, setGameState] = useState<"searching" | "playing">("searching");

    useEffect(() => {
        socket.connect();
        socket.emit("joinGame");

        socket.on("gameStart", (data: { roomId: string; firstTurn: string }) => {
            setRoomId(data.roomId);
            setGameState("playing");
            setIsMyTurn(socket.id === data.firstTurn);
        });

        socket.on("updateBoards", (data: { boards: any[]; nextTurn: string }) => {
            setBoards(data.boards);
            setIsMyTurn(socket.id === data.nextTurn);
        });

        socket.on("gameOver", (data: { loser: string }) => {
            Alert.alert(data.loser === socket.id ? "You Lost!" : "You Won!");
            resetGame();
        });

        socket.on("opponentDisconnected", () => {
            Alert.alert("Opponent Disconnected!", "Searching for new match...");
            resetGame();
        });

        return () => { socket.disconnect(); };
    }, []);

    const handleMove = (boardIndex: number, cellIndex: number) => {
        if (!isMyTurn || boards[boardIndex].blocked || boards[boardIndex].grid[cellIndex] !== "" || !roomId) return;
        socket.emit("makeMove", { roomId, boardIndex, cellIndex });
    };

    const resetGame = () => {
        setBoards(Array(3).fill('').map(() => ({ grid: Array(9).fill(""), blocked: false })));
        setGameState("searching");
        socket.emit("joinGame");
    };

    return (
        <View style={styles.container}>
            {gameState === "playing" ? (
                <>
                    <Text style={styles.turnText}>{isMyTurn ? "Your Turn" : "Opponent's Turn"}</Text>
                    <View style={styles.boardsContainer}>
                        {boards.map((board, boardIndex) => (
                            <View key={boardIndex} style={[styles.board, board.blocked && styles.blockedBoard]}>
                                {board.grid.map((cell, cellIndex) => (
                                    <TouchableOpacity
                                        key={cellIndex}
                                        style={styles.cell}
                                        onPress={() => handleMove(boardIndex, cellIndex)}
                                        disabled={!isMyTurn || board.blocked || cell !== ""}
                                    >
                                        <Text style={styles.cellText}>{cell}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </>
            ) : (
                <View style={styles.waitingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.waitingText}>Searching for opponent...</Text>
                </View>
            )}
            <LinearGradient colors={['#8E44AD', '#9B59B6']} style={styles.footer}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.footerText}>Leave</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default LiveMode;