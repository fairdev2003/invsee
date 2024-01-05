package com.inv.invsee.inventories.mc;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import net.minecraft.core.Registry;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import top.theillusivec4.curios.api.CuriosApi;
import top.theillusivec4.curios.common.CuriosHelper;


import java.io.IOException;
import java.util.Optional;

public class PlayerHandler {
    public static JsonObject getPlayerInfo(Player player) {

        JsonObject player_info = new JsonObject();
        player_info.addProperty("name", player.getDisplayName().getString());
        player_info.addProperty("uuid", player.getUUID().toString());

        // player inventory method used
        player_info.add("inventory", getPlayerInventory(player));

        return player_info;
    }
    public static int getPlayerInfoCommand(Player player) {

        player.sendSystemMessage(Component.literal(getPlayerInfo(player).toString()));

        return 1;
    }


    public static JsonArray getPlayerInventory(Player player) {

        JsonArray inventory = new JsonArray();
        JsonArray enchants = new JsonArray();



        for (var entry : player.getInventory().items) {
            JsonObject single_item_data = new JsonObject();

            single_item_data.addProperty("display_name", new ItemStack(entry.getItem()).getDisplayName().getString());

            if (entry.isDamageableItem()) {
                single_item_data.addProperty("type", "damageable");
                single_item_data.addProperty("max_durability", entry.getMaxDamage());
                single_item_data.addProperty("durability_left", entry.getDamageValue() - entry.getDamageValue());
            } else {
                if (entry.isStackable()) {
                    single_item_data.addProperty("type", "block/item");
                } else {
                    single_item_data.addProperty("type", "other");
                }
            }

            if (entry.isEnchantable() && entry.isEnchanted()) {
                for (var enchanted_entry : entry.getEnchantmentTags()) {
                    enchants.add(enchanted_entry.toString());
                }
            }

            single_item_data.add("enchants", enchants);
            inventory.add(single_item_data);

        }

        return inventory;
    }

    public static JsonObject getPlayerCuriosSlots(Player player) {

        JsonObject curios = new JsonObject();

        var curios_equipped = CuriosApi.getCuriosHelper().getEquippedCurios(player);

        return curios;
    }

}
