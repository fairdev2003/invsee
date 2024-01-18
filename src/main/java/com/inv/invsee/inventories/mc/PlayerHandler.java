package com.inv.invsee.inventories.mc;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;
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


    public static JsonObject getItemInMainHand(Player player) {
        JsonObject item_data = new JsonObject();
        var entry = player.getMainHandItem();
        JsonArray enchants = new JsonArray();

        var nbt_data = NBTHandler(entry, entry.getOrCreateTag().toString());

        String rarity = entry.getRarity().toString().toLowerCase();

        item_data.addProperty("display_name", entry.getHoverName().getString());
        item_data.addProperty("amount", entry.getCount());
        item_data.addProperty("nbt_data", entry.getOrCreateTag().toString());
        item_data.addProperty("rarity", rarity);
        item_data.addProperty("category", categoryHandler(entry));
        item_data.addProperty("creative_category", entry.getItem().getItemCategory().getDisplayName().getString());;



        item_data.addProperty("registry_name", entry.getItem().getDescriptionId().replace("block.", "").replace("item.", "").replace(".", "__"));

        if (entry.isDamageableItem()) {
            item_data.addProperty("type", "damageable");

            item_data.addProperty("max_durability", entry.getMaxDamage());
            item_data.addProperty("durability_left", entry.getDamageValue() - entry.getDamageValue());
        } else {
            if (entry.isStackable()) {
                item_data.addProperty("type", "block/item");
            } else {
                item_data.addProperty("type", "other");
            }
        }

        if (entry.isEnchanted()) {
            for (var enchanted_entry : entry.getEnchantmentTags()) {
                enchants.add(enchanted_entry.toString().replace("s}", "}").replace("id", "\"id\"").replace("lvl", "\"lvl\""));
            }
        }

        item_data.add("enchants", enchants);


        return item_data;
    }

    public static JsonArray getPlayerInventory(Player player) {



        JsonArray inventory = new JsonArray();
        JsonArray enchants = new JsonArray();

        for (var entry : player.getInventory().items) {
            JsonObject single_item_data = new JsonObject();

            String nbt_data = entry.getTags().toString();

            single_item_data.addProperty("display_name", new ItemStack(entry.getItem()).getDisplayName().getString());
            single_item_data.addProperty("amount", entry.getCount());

            single_item_data.addProperty("registry_name", entry.getItem().getDescriptionId().replace("block.", "").replace("item.", "").replace(".", "__"));

            player.sendSystemMessage(Component.literal(nbt_data));

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

        var curios_equipped = CuriosApi.getCuriosHelper().getEquippedCurios(player).cast();
        player.sendSystemMessage(Component.literal(curios_equipped.toString()));

        return curios;
    }

    public static String categoryHandler(ItemStack item) {

        String[] tool_criteria = {"pick", "pickaxe", "axe", "truncator", "paxel", "shatterer", "shovel", "hoe" , "hammer", "tool", "spyglass", "flint and steel", "compass" };
        String[] weapons_criteria = { "bow", "crosbow", "sword", "blade" };
        String[] armor_criteria = { "chestplate", "helmet", "leggings", "helmet" };
        String[] tech_mod_criteria = { "Applied Energistics 2" };


        for (String i : tool_criteria) {
            if (item.getHoverName().toString().toLowerCase().contains(i.toLowerCase())) {
                return "Tool";
            }
        }
        for (String i : armor_criteria) {
            if (item.getHoverName().toString().toLowerCase().contains(i.toLowerCase())) {
                return "Armor";
            }
        }
        for (String i : weapons_criteria) {
            if (item.getHoverName().toString().toLowerCase().contains(i.toLowerCase())) {
                return "Weapon";
            }
        }
        for (String i : tech_mod_criteria) {
            if (item.getItem().getItemCategory().getDisplayName().getString().toLowerCase().contains(i.toLowerCase())) {
                return "Tech";
            }
        }

        return "Other";
    }

    public static String NBTHandler(ItemStack item, String base_nbt) {

        if (base_nbt.contains("forbidden")) {

            System.out.println("here");

            // Forbidden & Arcanus

            final String final_nbt = base_nbt.
                     replace("Damage", "\"Damage\"".toUpperCase()).
                     replace("\"forbidden_arcanus:fiery\"", "\"fiery\"".toUpperCase()).
                     replace("\"forbidden_arcanus:eternal\"", "\"eternal\"".toUpperCase()).
                     replace("\"forbidden_arcanus:demolishing\"", "\"terra\"".toUpperCase()).
                     replace("Enchantments", "\"Enchantments\"".toUpperCase()).
                     replace("Modifier", "\"Modifier\"".toUpperCase()).
                     replace("id", "\"id\"".toUpperCase()).
                     replace("Repair", "\"Repair\"".toUpperCase()).
                     replace("1s", "1".toUpperCase()).replace("2s", "2".toUpperCase()).replace("3s", "3".toUpperCase()).replace("4s", "4".toUpperCase()).replace("5s", "5".toUpperCase()).replace("6s", "6".toUpperCase()).replace("7s", "7".toUpperCase()).replace("8s", "8".toUpperCase()).replace("9s", "9".toUpperCase()).replace("10s", "10".toUpperCase()).
                     replace("1b", "1".toUpperCase()).replace("2b", "1".toUpperCase()).replace("3b", "3".toUpperCase()).replace("4b", "4".toUpperCase()).replace("5b", "5".toUpperCase()).replace("6b", "6".toUpperCase()).replace("7b", "7".toUpperCase()).replace("8b", "8".toUpperCase()).replace("9b", "9".toUpperCase()).replace("10b", "10".toUpperCase()).
                     replace(".0d", "").
                     replace("lvl", "\"lvl\"".toUpperCase());

            return final_nbt;

        } else {
            final String final_nbt = base_nbt.
                     replace("internalCurrentPower", "\"internalCurrentPower\"".toUpperCase()).
                     replace("internalMaxPower", "\"internalMaxPower\"".toUpperCase()).
                     replace("id", "\"id\"".toUpperCase()).
                     replace("mana", "\"mana\"").
                     replace("Damage", "\"Damage\"".toUpperCase()).
                     replace("Enchantments", "\"Enchantments\"".toUpperCase()).
                     replace("lvl", "\"lvl\"".toUpperCase()).
                     replace("Count", "\"Count\"".toUpperCase()).
                     replace("inv", "\"inv\"".toUpperCase()).
                     replace("1s", "1".toUpperCase()).replace("2s", "2".toUpperCase()).replace("3s", "3".toUpperCase()).replace("4s", "4".toUpperCase()).replace("5s", "5".toUpperCase()).replace("6s", "6".toUpperCase()).replace("7s", "7".toUpperCase()).replace("8s", "8".toUpperCase()).replace("9s", "9".toUpperCase()).replace("10s", "10".toUpperCase()).
                     replace("1b", "1".toUpperCase()).replace("2b", "1".toUpperCase()).replace("3b", "3".toUpperCase()).replace("4b", "4".toUpperCase()).replace("5b", "5".toUpperCase()).replace("6b", "6".toUpperCase()).replace("7b", "7".toUpperCase()).replace("8b", "8".toUpperCase()).replace("9b", "9".toUpperCase()).replace("10b", "10".toUpperCase()).
                     replace(".0d", "").
                     replace("Slot", "\"Slot\"".toUpperCase()).
                     replace("Repair", "\"Repair\"".toUpperCase()).
                     replace("Modifier", "\"Modifier\"".toUpperCase()).
                     replace("oulinUUID", "\"oulinUUID\"".toUpperCase());
            return final_nbt;
        }


    }

}
