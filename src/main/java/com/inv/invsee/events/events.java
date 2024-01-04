package com.inv.invsee.events;

import appeng.api.networking.GridHelper;
import appeng.api.networking.GridServices;
import appeng.api.networking.IGridNode;
import com.google.common.base.Splitter;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.inv.invsee.InvSee;
import com.inv.invsee.socket.SocketIOClient;
import com.mojang.blaze3d.platform.InputConstants;
import com.mojang.logging.LogUtils;
import net.minecraft.client.KeyMapping;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.network.chat.Component;
import net.minecraft.world.Container;
import net.minecraft.world.entity.animal.Sheep;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.entity.ChestBlockEntity;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.event.entity.living.LivingHurtEvent;
import net.minecraftforge.event.entity.player.PlayerInteractEvent;
import net.minecraftforge.eventbus.api.EventPriority;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import org.lwjgl.glfw.GLFW;



import javax.security.auth.login.LoginException;
import java.util.EventListener;
import java.util.List;
import org.slf4j.Logger;


@Mod.EventBusSubscriber(modid = InvSee.MODID)
public class events implements EventListener {


    @SubscribeEvent
    public static void LivingHurtEvent(LivingHurtEvent event) {
        if (event.getEntity() instanceof Sheep) {
            if (event.getSource().getEntity() instanceof Player player) {

                JsonArray array = new JsonArray();

                JsonObject player_data = new JsonObject();

                JsonArray inventory = new JsonArray();

                for (ItemStack stack : player.getInventory().items) {
                    if (!stack.isEmpty()) {


                        JsonObject one_item = new JsonObject();

                        List<String> pieces_tag = Splitter.on(".").splitToList(stack.getDescriptionId());
                        List<String> pieces_name1 = Splitter.on("[").splitToList(stack.getDisplayName().getString());
                        List<String> pieces_name2 = Splitter.on("]").splitToList(pieces_name1.get(1));


                        one_item.addProperty("tag_name", (pieces_tag.get(1) + ":" + pieces_tag.get(2)));
                        one_item.addProperty("count", stack.getCount());
                        one_item.addProperty("Name", pieces_name2.get(0));
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
                player.sendSystemMessage(Component.literal(player_data.toString()));
            }

}}
    private static final Logger LOGGER = LogUtils.getLogger();

    public static int number_of_items_in_inventory = 0;

    @SubscribeEvent(priority = EventPriority.HIGHEST)
    public static void onRightClickBlock(PlayerInteractEvent.RightClickBlock event) {
        if (event.getSide().isServer()) {
            number_of_items_in_inventory = 0;
            Player player = event.getEntity();
            Level world = event.getLevel();
            BlockPos pos = event.getPos();

            BlockEntity tileEntity = world.getBlockEntity(pos);

            SocketIOClient.MessageToSocket("chuj");


            if (player.isHolding(Items.STICK)) {

                if (tileEntity instanceof Container container && tileEntity != null) {
                    player.sendSystemMessage(Component.literal(tileEntity.getBlockState().getBlock().getName().getString()));

                    System.out.println(container.getItem(0));
                    int container_size = container.getContainerSize();

                    for (int i = 0; i < container.getContainerSize(); i++) {



                        ItemStack stack = container.getItem(i);

                        number_of_items_in_inventory = number_of_items_in_inventory + stack.getCount();
                        String itemName = stack.isEmpty() ? "Empty" : stack.getDisplayName().getString();
                        int count = stack.getCount();
                        if (event.getSide().isServer()) {
                            if (!stack.isEmpty()) {
                                player.sendSystemMessage(Component.literal("Slot " + i + ": " + itemName + " x" + count));
                            }

                        }
                    }
                    player.sendSystemMessage(Component.literal(number_of_items_in_inventory + "/" + container_size * 64));
                } if (tileEntity.getBlockState().getBlock().getDescriptionId().equals("block.ae2.controller")) {
                    IGridNode gridnode = GridHelper.getExposedNode(event.getLevel(), event.getPos(), event.getEntity().getDirection());
                    gridnode.getGrid().getStorageService().getInventory().getAvailableStacks().forEach((item) -> {
                        event.getEntity().sendSystemMessage(Component.literal(item.toString()));
                    });
                    event.getEntity().sendSystemMessage(Component.literal("==============================="));

                }
                if (player.isHolding(Items.WOODEN_HOE)) {
                    player.sendSystemMessage(Component.literal("siuras"));
                }

            }
        }



    }



}



