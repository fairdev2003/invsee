package com.inv.invsee.socket;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import net.minecraft.client.Minecraft;
import net.minecraft.network.chat.Component;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.players.PlayerList;
import net.minecraft.world.entity.player.Player;
import net.minecraftforge.event.server.ServerLifecycleEvent;
import net.minecraftforge.server.ServerLifecycleHooks;

public class SocketIOClient {

    private static Socket socket;

    public static void Connect(String serverUrl) {
        try {
            IO.Options options = new IO.Options();
            options.forceNew = true;
            socket = IO.socket(serverUrl, options);

            socket.on(Socket.EVENT_CONNECT_ERROR, args -> System.out.println("Connection error"));

            // Add more event listeners as needed

            socket.on(Socket.EVENT_CONNECT, args -> {
                System.out.println("Connected to the Socket.IO server");
                // Emit the initial message or perform any other actions upon connection
                // For example, you can emit a welcome message here
                socket.emit("send_message", "Hello, server!");
            });

            // Add the event listener for "hello"
            socket.on("hello", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Player player = ServerLifecycleHooks.getCurrentServer().getPlayerList().getPlayers().get(0);
                    player.sendSystemMessage(Component.literal(args[0].toString()));
                }
            });

            socket.connect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void MessageToSocket(String message) {
        if (socket != null && socket.connected()) {
            socket.emit("send", message);
        } else {
            System.out.println("Socket not connected. Message not sent: " + message);
        }
    }

    public void disconnect() {
        if (socket != null) {
            socket.disconnect();
        }
    }
}
