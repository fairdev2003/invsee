package com.inv.invsee.inventories.ae2;

import appeng.api.networking.GridHelper;
import appeng.api.networking.IGridNode;
import appeng.api.stacks.AEItemKey;
import com.inv.invsee.InvSee;
import com.inv.invsee.socket.SocketIOClient;
import net.minecraft.core.BlockPos;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.Items;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraftforge.event.entity.player.PlayerInteractEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

import java.util.EventListener;

@Mod.EventBusSubscriber(modid = InvSee.MODID)
public class Ae2NetworkHandler implements EventListener {

    @SubscribeEvent()
    public static void onRightClickBlock(PlayerInteractEvent.RightClickBlock event) {
        if (event.getSide().isServer()) {
            Player player = event.getEntity();
            Level world = event.getLevel();
            BlockPos pos = event.getPos();

            BlockEntity tileEntity = world.getBlockEntity(pos);



            if (player.isHolding(Items.STICK)) {
                if (tileEntity.getBlockState().getBlock().getDescriptionId().equals("block.ae2.controller")) {
                IGridNode gridnode = GridHelper.getExposedNode(event.getLevel(), event.getPos(), event.getEntity().getDirection());
                for (var entry : gridnode.getGrid().getStorageService().getInventory().getAvailableStacks()) {
                    var resource = entry.getKey();
                    var amount = entry.getLongValue();

                    if (resource instanceof AEItemKey itemKey) {
                        String item_key_name_format = amount + "x " + itemKey.toStack().getDisplayName().getString();
                        event.getEntity().sendSystemMessage(Component.literal(item_key_name_format));
                        SocketIOClient.MessageToSocket(item_key_name_format);
                    }
                }


                event.getEntity().sendSystemMessage(Component.literal("==============================="));
            }
                }


            }
        }



    }
