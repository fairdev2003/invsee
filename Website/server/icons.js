const express = require('express')
const glintGenerator = require('minecraft-glint-generator')

const router = express.Router()

router.get('/icon/:iconname/:isenchanted', (req, res) => {
    
    const iconname = req.params.iconname;

    const isenchanted = req.params.isenchanted;

    console.log(iconname);



    const mod_name = iconname.split("__")[0];
    const item_name = iconname.split('__')[1];
    
    let icon = __dirname + `/mc_assets/${mod_name}/${iconname}${isenchanted === "true" ? "_enchanted.gif" : ".png" }`;
    

    res.sendFile(icon);
})

router.get('/create_icon/:iconname', (req, res) => {
    
    const iconname = req.params.iconname;

    console.log(iconname)

    const mod_name = iconname.split("__")[0]
    const item_name = iconname.split('__')[1]

    let icon = __dirname + `/mc_assets/${mod_name}/${iconname}`;
    let asset_name = `${iconname.split(".png")[0]}_enchanted`;

    glintGenerator({
        image: icon,
        name: asset_name,
        size: 32,
        sequence: 'long',
        output: 'images/output',
        compressed_output: 'images/compressed_output',
        show_progress: true
    })
    res.send("ok")
})

module.exports = router