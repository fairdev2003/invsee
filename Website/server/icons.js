const express = require('express')

const router = express.Router()

router.get('/icon/:iconname', (req, res) => {
    const iconname = req.params.iconname

    const mod_name = iconname.split("__")[0]
    const item_name = iconname.split('__')[1]
    
    let icon = __dirname + `/mc_assets/${mod_name}/${iconname}`.split("{")[0]

    res.sendFile(icon)
})

module.exports = router