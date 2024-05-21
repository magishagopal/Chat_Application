import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            // Listen for online users
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Listen for incoming video call
            socket.on("incomingCall", ({ senderId }) => {
                console.log("Incoming call from:", senderId);
                // Handle incoming call UI
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    const initiateVideoCall = (receiverId) => {
        if (socket) {
            socket.emit("initiateVideoCall", { receiverId });
        }
    };

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, initiateVideoCall }}>
            {children}
        </SocketContext.Provider>
    );
};



