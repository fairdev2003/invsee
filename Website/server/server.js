const express = require('express');

const nbt = require("nbt-js")

const images = require('./icons')

const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io')
require('dotenv').config()
const cors = require("cors")
const { Client, IntentsBitField, EmbedBuilder } =  require("discord.js")
const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
  })

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });


  

const app = express();

app.use("/images", images)

app.use(express.json())
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders: ["Access-Control-Allow-Origin"],
        rejectUnauthorized: false
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.post('/send', (req, res) => {
    const message = req.body.message;
    console.log(message)

    const channelId = '1176199719660290128';

    channel.send(message);

    io.emit("hello", message)
    res.send("Message sent!")
});

io.on('connection', (socket) => {

    client.on("messageCreate", (mess) => {
        if(!mess.author.bot) {
            io.emit("hello", `<From discord ${mess.author.displayName}> ${mess.content}`)
            io.emit("send_message", "chuj")
        }
    })

    socket.on("authentication", (userid) => {
        
    })
    
    socket.on("send", message => {
        console.log(message.name)

        const channelId = '1176199719660290128';

        io.emit("hello", message)
    })

    // socket.on("send_ae2", array => {
    //     console.log(array);
        
    //     const parser = JSON.parse(array);
    //     const author = parser[0];
    //     const inventory = parser[1];

    //     const channelId = '1176199719660290128';

    //     const channel = client.channels.cache.get(channelId);

    //     var all_items_names = [];
        
    //     inventory.map((item, num) => {
    //         all_items_names.push(`${num + 1}. ${item}`)
    //     })

    //     var message = all_items_names.join("\n")
    //     channel.send(`======================\nAe2 System Storage of ${author}:\n\n${message}\n======================`);
    // })
    socket.on("send_inv", object => {
        const parser = JSON.parse(object);

        const user_name = parser.user_name;
        const uuid = parser.uuid;
        const type = parser.type;
        var item_data = parser.item_data;
        
        const parsed_enchants = parser.item_data.enchants.map((item) => {
            return JSON.parse(item);
        });

        item_data.enchants = parsed_enchants;

        const message_info = {
            user_name: user_name,
            uuid: uuid,
            type: type,
            item_data: item_data
        };


        console.log(message_info.item_data);

        io.emit("receive_message", message_info);
    })

    socket.on("test_message", object => {
        const parser = JSON.parse(object);

        console.log(parser)

        const message_info = {
            message: object,
            user_name: "Dev",
            uuid: "chuj",
            type: "player_chat"
        }

        io.emit("receive_message", message_info);
    })
        

    socket.on("send_message", object => {

        const parser = JSON.parse(object);
        const message = parser.message;
        const user_name = parser.user_name;
        const uuid = parser.uuid;
        const type = parser.type;

        const message_info = {
            message: message,
            user_name: user_name,
            uuid: uuid,
            type: type
        };

        io.emit("receive_message", message_info);

    })
    socket.on("player_death", object => {

        const parser = JSON.parse(object)
        const user_name = parser.user_name
        const message = parser.message
        const uuid = parser.uuid

        console.log(uuid)
        console.log(message)
        console.log()
        
        const embed = new EmbedBuilder()
        .setAuthor({name: user_name, iconURL: `https://mc-heads.net/avatar/${uuid}`}).setTitle("Player dead").setDescription(message)

        const channelId = '1176199719660290128';

        const channel = client.channels.cache.get(channelId);

        channel.send({embeds: [embed]})
        
    })

    socket.on("server_info", () => {
        io.emit("get_server_info")
    })



    socket.on("send_server_data", data => {

        const parser = JSON.parse(data)

        io.emit("receive_server_info", parser)
    })

    
    
});



app.post("print_data", (req, res) => {
    
})
app.get("send_message", (req, res) => {
    
})

// client.login(process.env.DISCORD_TOKEN);

server.listen(3005, () => {
  console.log('server running at http://localhost:3005');
});

