package com.inv.invsee.utils;

import com.google.gson.JsonObject;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.world.item.ItemStack;

public class ItemInfo {

    public static JsonObject NBTHandler(ItemStack item) {

        CompoundTag compound = item.getOrCreateTag();

        JsonObject object = new JsonObject();

        for (var o : compound.getAllKeys()) {
            if (o.equals("Modifier")) {
                object.addProperty("Modifier", compound.getString("Modifier"));
            }
            if (o.equals("mana")) {
                object.addProperty("mana", compound.getInt("mana"));
            }

        }

        return object;
    }

}
