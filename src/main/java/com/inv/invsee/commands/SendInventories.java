package com.inv.invsee.commands;

import com.google.common.base.Splitter;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.inv.invsee.InvSee;
import com.inv.invsee.socket.SocketIOClient;

import io.socket.client.IO;
import io.socket.client.Socket;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.client.event.ClientChatEvent;
import net.minecraftforge.client.event.ClientChatReceivedEvent;
import net.minecraftforge.event.ServerChatEvent;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.loading.FMLServiceProvider;

import java.net.URI;
import java.util.List;

@Mod.EventBusSubscriber(modid = InvSee.MODID)
public class SendInventories {

    private static SocketIOClient socket;

    @SubscribeEvent()
    public static void onPlayerJoin(PlayerEvent.PlayerLoggedInEvent event) {

        Socket socket = SocketIOClient.Socket();

        SocketIOClient.Connect("http://localhost:3005");

        socket.emit("send", event.getEntity().getName().getString() + " joined the game");

        var player_data = getData(event);

        BruhCommand.sendAsyncData(String.valueOf(player_data));

    }

    @SubscribeEvent()
    public static void onPlayerLeave(PlayerEvent.PlayerLoggedOutEvent event) {

        Socket socket = SocketIOClient.Socket();

        socket.emit("send", event.getEntity().getName().getString() + " left the game");

        var player_data = getData(event);

        BruhCommand.sendAsyncData(String.valueOf(player_data));

    }

    private static int ticksElapsed = 0;
    private static final int TICKS_PER_MINUTE = 10;
    @SubscribeEvent()
    public static void chatService(ServerChatEvent.Submitted event) {
        System.out.println(event.getMessage());

        if (socket == null) {
            String formatted_text = "<" + event.getPlayer().getName().getString() + "> " + event.getRawText();

            SocketIOClient.MessageToSocket(formatted_text);
        }
    }

    @SubscribeEvent()
    public void onServerTick(TickEvent.ServerTickEvent event) {
        if (event.phase == TickEvent.Phase.START) {
            ticksElapsed++;

            // Check if 10 minutes (6000 ticks) have passed
            if (ticksElapsed >= 10 * TICKS_PER_MINUTE) {
                // Reset the counter
                ticksElapsed = 0;

                // Your code to be executed every 10 minutes goes here
                // For example, you can call a method or trigger an event

                
            }
        }
    }

    /// function i will use
    private static String getData(PlayerEvent event) {
        if (event.getEntity() instanceof Player) {
            Player player = (Player) event.getEntity();
            JsonArray array = new JsonArray();

            JsonObject player_data = new JsonObject();

            JsonArray inventory = new JsonArray();

            for (ItemStack stack : player.getInventory().items) {
                if (!stack.isEmpty()) {


                    JsonObject one_item = new JsonObject();

                    List<String> pieces = Splitter.on(".").splitToList(stack.getDescriptionId());

                    one_item.addProperty("tag_name", (pieces.get(1) + ":" + pieces.get(2)));
                    one_item.addProperty("count", stack.getCount());
                    one_item.addProperty("Name", stack.getDisplayName().getString());
                    if (stack.isDamageableItem()) {
                        one_item.addProperty("durability", stack.getMaxDamage() - stack.getDamageValue());
                        one_item.addProperty("max_durability", stack.getMaxDamage());
                    }

                    inventory.add(one_item);
                }

                player_data.addProperty("player_name", player.getName().getString());
                player_data.addProperty("uuid", player.getUUID().toString());
                player_data.addProperty("health", player.getHealth());
                player_data.add("inventory", inventory);


            }
            player.sendSystemMessage(Component.literal("Wysłano dane o graczu do serwera"));

            return player_data.toString();
    }
        return null;
    }

    /// klamra sie tu konczy
}
