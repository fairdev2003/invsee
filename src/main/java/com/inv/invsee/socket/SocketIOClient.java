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

            socket.on(Socket.EVENT_CONNECT, args -> {
                System.out.println("Connected to the Socket.IO server");

                socket.emit("send_message", "Hello, server!");
            });

            socket.connect();

            socket.on("hello", args -> {
                Player player = ServerLifecycleHooks.getCurrentServer().getPlayerList().getPlayers().get(0);
                String chat_message = args[0].toString();
                player.sendSystemMessage(Component.literal(chat_message));
            });
            socket.on("get_server_info", args -> {
                int server = ServerLifecycleHooks.getCurrentServer().getPlayerList().getPlayerCount();
                System.out.println(server);
                socket.emit("send_server_data", server);


            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Socket Socket() {
        return socket;
    }
}
