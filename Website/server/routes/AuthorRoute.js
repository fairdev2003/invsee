const AuthorModel = require('../models/AuthorModel');
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {

    res.send({response: "Get all authors"})
})

router.post("/", async (req, res) => {
    
    const { author_name, author_pfp } = req.body

    try {
        const author = await AuthorModel.insertMany({
            author_name: author_name,
            author_pfp: author_pfp
        })

        res.status(200).send({message: "successfully posted a user"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
    

})

module.exports = router