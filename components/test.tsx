import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { io, Socket } from "socket.io-client";
import LinearGradient from 'react-native-linear-gradient';

const socket: Socket = io("https://deciduous-incongruous-herring.glitch.me/"); // Replace with your server IP

type LiveProps = {
    onClose: () => void;
};

const LiveMode = ({ onClose }: LiveProps) => {
    const [board, setBoard] = useState<string[]>(Array(9).fill(""));
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">();
    const [roomId, setRoomId] = useState<string>("");
    const [gameState, setGameState] = useState<"searching" | "playing">("searching");

    useEffect(() => {
        socket.connect(); // Connect to the server
        socket.emit("joinGame"); // Join the game queue

        // Handle game start event
        socket.on("gameStart", (data: { roomId: string; symbol: Record<string, "X" | "O">; firstTurn: string }) => {
            const currentSocketId = socket.id!;
            setPlayerSymbol(data.symbol[currentSocketId]); // Set player symbol (X or O)
            setRoomId(data.roomId); // Set room ID
            setGameState("playing"); // Update game state to "playing"
            setIsMyTurn(currentSocketId === data.firstTurn); // Set turn based on who starts
        });

        // Handle board updates
        socket.on("updateBoard", (data: { board: string[]; nextTurn: string }) => {
            setBoard(data.board); // Update the board
            setIsMyTurn(socket.id! === data.nextTurn); // Update turn
        });

        // Handle game over
        socket.on("gameOver", (data: { loser: string }) => {
            Alert.alert(data.loser === socket.id ? "You Lost!" : "You Won!"); // Show game result
            resetGame(); // Reset the game
        });

        // Handle opponent disconnection
        socket.on("opponentDisconnected", () => {
            Alert.alert("Opponent Disconnected!", "Searching for a new match...");
            resetGame(); // Reset the game
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect(); // Disconnect from the server
        };
    }, []);

    // Handle player move
    const handleMove = (index: number) => {
        if (!isMyTurn || !playerSymbol || board[index] !== "" || !roomId) return;

        const newBoard = [...board];
        newBoard[index] = playerSymbol; // Update the board
        setBoard(newBoard);
        setIsMyTurn(false); // End the player's turn

        socket.emit("makeMove", { roomId, index, symbol: playerSymbol }); // Send move to server
    };

    // Reset the game
    const resetGame = () => {
        setBoard(Array(9).fill("")); // Clear the board
        setPlayerSymbol(undefined); // Reset player symbol
        setRoomId(""); // Reset room ID
        setGameState("searching"); // Set game state to "searching"
        socket.emit("joinGame"); // Rejoin the game queue
    };

    return (
        <View style={styles.container}>
            {gameState === "playing" ? (
                <>
                    <Text style={styles.turnText}>{isMyTurn ? "Your Turn" : "Opponent's Turn"}</Text>
                    <View style={styles.board}>
                        {board.map((cell, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.cell}
                                onPress={() => handleMove(index)}
                            >
                                <Text style={styles.cellText}>{cell}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <LinearGradient colors={['#8E44AD', '#9B59B6']} style={styles.footer}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.footerText}>Leave Match</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </>
            ) : (
                <View style={styles.waitingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.waitingText}>Searching for opponent...</Text>
                </View>
            )}
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
    board: {
        width: 300,
        height: 300,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
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
        fontSize: 36,
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
      footerText:{
        fontSize: 18,
        color: 'white'
      },
});

export default LiveMode;