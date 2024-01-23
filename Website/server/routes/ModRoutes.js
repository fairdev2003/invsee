const ModModel = require('../models/ModModel')
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {

    const items = await ModModel.find({});

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
            mod_owner,
            mod_authors,
            mod_loaders,
            mod_name,
            mod_description,
            mod_tag,
            mod_image,
            release_data,
            categories,
            level_of_complexity
        } = req.body;

        const items = ModModel.insertMany({
            mod_owner: mod_owner,
            mod_authors: mod_authors,
            mod_loaders: mod_loaders,
            mod_name: mod_name,
            mod_description: mod_description,
            mod_tag: mod_tag,
            mod_image: mod_image,
            release_data: release_data,
            categories: categories,
            level_of_complexity: level_of_complexity
        })

        res.status(200).send(items);
    } catch (error) {
        res.status(400).send({error: error.message});
    };

})

module.exports = router
