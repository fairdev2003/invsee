const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io')
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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (mess) => {
    if(!mess.author.bot) {
        io.emit("hello", `<From discord ${mess.author.displayName}> ${mess.content}`)
    }
})
  

const app = express();
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

    // Replace 'Hello, this is a message!' with your actual message

    // Find the channel by ID
    const channel = client.channels.cache.get(channelId);

    // Send the message to the channel
    channel.send(message);

    io.emit("hello", message)
    res.send("Message sent!")
});

io.on('connection', (socket) => {

    socket.on("authentication", (userid) => {
        
    })

    const id = socket.handshake.query.id
    socket.join(id)
    console.log(socket.id)
    
    socket.on("send", message => {
        console.log(message.name)

        const channelId = '1176199719660290128';

        // Replace 'Hello, this is a message!' with your actual message

        // Find the channel by ID
        const channel = client.channels.cache.get(channelId);

        // Send the message to the channel
        channel.send(message);
    })

    socket.on("send_ae2", array => {
        console.log(array)
        
        const parser = JSON.parse(array)
        const author = parser[0]
        const inventory = parser[1]

        const channelId = '1176199719660290128';

        const channel = client.channels.cache.get(channelId);

        var all_items_names = []

        
        inventory.map((item, num) => {
            all_items_names.push(`${num + 1}. ${item}`)
        })

        var message = all_items_names.join("\n")
        channel.send(`======================\nAe2 System Storage of ${author}:\n\n${message}\n======================`);
    })
    socket.on("send_inv", array => {
        const parser = JSON.parse(array)
        const inventory = parser.inventory
        const name = parser.name
        var all_items_names = []

        inventory.map((item, num) => {
            all_items_names.push(`${num + 1}. ${item.amount}x ${item.display_name.replace("[", "").replace("]", "")}`)
        })

        var message = all_items_names.join("\n")

        const channelId = '1176199719660290128';

        const channel = client.channels.cache.get(channelId);
        channel.send(`======================\nInventory items of ${name}:\n\n${message}\n======================`)
    })
    socket.on("send_message", message => {

        io.emit("receive_message", message);

        console.log(message);

        const id = '1176199719660290128';

        const chuj = client.channels.cache.get(id);
        chuj.send(message);
    })
    socket.on("player_death", object => {

        const parser = JSON.parse(object)
        const name = parser.name
        const message = parser.message
        const uuid = parser.uuid

        console.log(uuid)
        console.log(message)
        console.log()
        
        const embed = new EmbedBuilder()
        .setAuthor({name: name, iconURL: `https://mc-heads.net/avatar/${uuid}`}).setTitle("Player dead").setDescription(message)

        const channelId = '1176199719660290128';

        const channel = client.channels.cache.get(channelId);

        channel.send({embeds: [embed]})
        
    })

    socket.on("server_info", () => {
        io.emit("get_server_info")
    })



    socket.on("send_server_data", data => {
        socket.broadcast.emit("receive_server_info", data)
    })

    
    
});



app.post("print_data", (req, res) => {
    
})
app.get("send_message", (req, res) => {
    
})

client.login('MTAzMjM1OTUxMzY3MzcwNzU5MQ.Gmv7fN.9HrczpVBPTRseRBswBymXQJp4zGNYr3RB0oVDM');

server.listen(3005, () => {
  console.log('server running at http://localhost:3005');
});

