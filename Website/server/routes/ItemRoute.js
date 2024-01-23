const ItemModel = require('../models/ItemModel')
const express = require("express")

const router = express.Router()

router.get("/:selected", async (req, res) => {

    const { selected } = req.params

    console.log(selected)

    const items = await ItemModel.find(
        {mod_tag: selected}
    );

    try {
        
        res.status(200).send(items)
    }catch (error) {
        res.status(400)
    }
})

router.post("/", async (req, res) => {
    
    console.log(req)

    try {
        const {
            item_name,
            tag_name,
            item_image,
            crafting_recipes,
            wiki_elements,
            mod_tag
        } = req.body;

        const items = ItemModel.insertMany({
            item_name: item_name,
            tag_name: tag_name,
            item_image: item_image,
            crafting_recipes: crafting_recipes,
            wiki_elements: wiki_elements,
            mod_tag: mod_tag
        })

        res.status(200).send(items);
    } catch (error) {
        res.status(400).send({error: error.message});
    };

})

module.exports = router