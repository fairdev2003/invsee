package com.inv.invsee.inventories.ae2;



// ae2 network
import appeng.api.networking.GridHelper;
import appeng.api.networking.IGridNode;

// ae2 keys
import appeng.api.networking.crafting.ICraftingPlan;
import appeng.api.stacks.AEFluidKey;
import appeng.api.stacks.AEItemKey;

// data save
import com.google.gson.JsonArray;

// main class
import com.inv.invsee.InvSee;

// server
import com.inv.invsee.inventories.mc.PlayerHandler;
import io.socket.client.Socket;
import com.inv.invsee.socket.SocketIOClient;

// generics
import net.minecraft.core.BlockPos;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.Items;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraftforge.event.entity.player.PlayerInteractEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

// java methods
import java.util.EventListener;

@Mod.EventBusSubscriber(modid = InvSee.MODID)
public class Ae2NetworkHandler implements EventListener {


    private static JsonArray ae2_inevntory;
    private static String network_author;


    @SubscribeEvent()
    public static void onRightClickBlock(PlayerInteractEvent.RightClickBlock event) {
        if (event.getSide().isServer()) {
            Player player = event.getEntity();
            Level world = event.getLevel();
            BlockPos pos = event.getPos();

            BlockEntity tileEntity = world.getBlockEntity(pos);
            Socket socket = SocketIOClient.Socket();


            if (player.isHolding(Items.STICK)) {
                if (tileEntity.getBlockState().getBlock().getDescriptionId().equals("block.ae2.controller")) {
                    IGridNode gridnode = GridHelper.getExposedNode(event.getLevel(), event.getPos(), event.getEntity().getDirection());
                    JsonArray array = new JsonArray();

                    for (var entry : gridnode.getGrid().getStorageService().getInventory().getAvailableStacks()) {
                        var resource = entry.getKey();
                        var amount = entry.getLongValue();

                        if (resource instanceof AEItemKey itemKey) {
                            String item_key_name_format = amount + "x " + itemKey.getDisplayName().getString();
                            event.getEntity().sendSystemMessage(Component.literal(item_key_name_format));
                            array.add(item_key_name_format);


                        }
                        if (resource instanceof AEFluidKey fluidKey) {
                            String fluid_key_name_format = amount + "ml " + fluidKey.getDisplayName().getString();
                            event.getEntity().sendSystemMessage(Component.literal(fluid_key_name_format));
                            array.add(fluid_key_name_format);

                        }
                    }

                        network_author = player.getDisplayName().getString();
                        ae2_inevntory = array;

                        JsonArray array_to_send = new JsonArray();

                        PlayerHandler.getPlayerCuriosSlots(player);

                        array_to_send.add(Ae2NetworkHandler.network_author);
                        array_to_send.add(Ae2NetworkHandler.ae2_inevntory);

                        socket.emit("send", PlayerHandler.getPlayerInventory(player));
                        event.getEntity().sendSystemMessage(Component.literal("==============================="));
                    }
                }



        }
    }


    }
