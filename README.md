<h3 align="left" margin="20px">Technologies used:</h3>
<div align="center">
<p align="center"> 
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="25" height="25"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="20" height="20"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="25" height="25"/> </a> <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="25" height="25"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="25" height="25"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="25" height="25"/> </a> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://www.openxcell.com/wp-content/uploads/2021/11/dango-inner-2.png" alt="nextjs" width="20" height="20"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="25" height="25"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="25" height="25"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="20" height="20"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="25" height="25"/> </a> <a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="25" height="25"/>
<a href="https://www.prisma.io/" target="_blank" rel="noreferrer"> <img src="https://i.pinimg.com/originals/39/b2/e4/39b2e4ad77c23a2c11e5950a7dfa2aec.png" alt="prisma" width="20" height="20"/> </a>
<a href="https://trpc.io/" target="_blank" rel="noreferrer"> <img src="https://avatars.githubusercontent.com/u/78011399?s=280&v=4" alt="trpc" width="25" height="25"/> </a>
</a>
<a href="https://zustand-demo.pmnd.rs/" target="_blank" rel="noreferrer"> <img src="https://img.stackshare.io/service/11559/zustand.png" alt="zustand" width="25" height="25"/> </a>
</p>
</div> 
(my biggest project for sure)

#### Dashboard Screenshot

<img src="https://i.imgur.com/jgIZeIk.png"/>


</p>

# Intrudaction
I always have thoughts, why there is no centralized wiki page about modded minecraft? Whenever I look at information about a given item, the wiki on which the item is located has either old data or no complete information. I want to change it. The main idea of the website is to make it easier for people to search for "what can I do with this item?", "how can I use i?" etc. Also i want to add <a href="https://www.curseforge.com/minecraft/mc-mods/jei">JEI</a> (Just Enough Items), it will make easier to search for specific item. The idea of the <a href="https://www.curseforge.com/minecraft/mc-mods/jei">JEI</a> builded inside web is to make all crafting trees possible (Furnace, Crafting, Anvil etc). There is a lot to do. No more old wikis about nothing!

# Minecraft Mod "Invsee"
The next thing that will be added to the site is a mod that will allow players to view the inventory of players on the server. The mod will send it to the server so that anyone can see it. another thing is live chat, which will allow players to interact with people from the site (sending messages, leaving, entering players, etc.). The mod will be compatible with logistics mods like: <a href="https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2">Applied Energistics 2</a> and <a href="https://www.curseforge.com/minecraft/mc-mods/refined-storage">Refined Storage</a>. More things will be added soon

### Mod compatibility
All things on the website will have their image. Feel free to use them in your project if you want :)

### API

You can also use the API to put data on your website or other application. To do this, go to the user panel and copy the TOKEN and simply paste it into each request. The free version allows users to complete 1000 requests per hour. What data can you get from our public api:


<ul>
<li>Player Data (<a href="https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2">AE2</a>, <a href="https://www.curseforge.com/minecraft/mc-mods/refined-storage">Refined Storage</a>, Inventory)</li>
<li>Item Data (Item image, usage, description etc.)</li>
<li>Mod Data - comes with all items and author/contributors if you need</li>
<li>Author Data (All links, information about author)</li>
<li>Information about your minecraft server - you need to add mod/plugin to your server to do that</li>
</ul>

<a href="https://www.invsee.com/api_usage">More Information about API (reference not done yet)</a>

### Example Requests (only <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET">GET</a>)


#### Get Informaion about the player
```javascript
const request = "https://www.invsee.com/api/server/player?token=<YOUR_TOKEN>&server_token=<SERVER_TOKEN>&player_uuid=<PLAYER_UUID>"
```

#### Get all players
```javascript
const request = "https://www.invsee.com/api/server/player?token=<YOUR_TOKEN>&server_token=<SERVER_TOKEN>&action=get_all"
```

#### Get Logistical Storage (AE2, Refined Storage)
(mod only)
```javascript
const request = "https://www.invsee.com/api/server/storage?token=<YOUR_TOKEN>&server_token=<SERVER_TOKEN>&player_uuid=<PLAYER_UUID>"
```

#### Get item info
```javascript
const request = "https://www.invsee.com/api/item?token=<YOUR_TOKEN>&item_tag=minecraft:stick"
```

#### Get modder/author info
```javascript
const request = "https://www.invsee.com/api/user?token=<YOUR_TOKEN>&modder_name=thetechnici4n"
```

#### Get Update README.md info
```javascript
const request = "https://www.invsee.com/api/user?token=<YOUR_TOKEN>&readme.md=thetechnici4n"
```

Update README.md -
Create .env - 
git rm .env - 
Create important_passwords.json

#### Get mod info
```javascript
const request = "https://www.invsee.com/api/mod?token=<YOUR_TOKEN>&mod_name=applied-energistics-2"
```

#### More HTTP methods like <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST">POST</a> are only for moderation on dashboard. If you are author/contributor of the mod you can edit page about your mod

### Multiple Server characters
On the website you will be able to connect account from the server to interact on the <b>Live Chat</b> as user from the server. Simply write to chat <b>/sync account</b> and then copy code from the chat and put into website. You can have multiple accounts and switch between them simply in the account settings. How cool is that?

### Manage your server on the website
As operator logged into website you can basically ban players, adding to whitelist, adding ops and more. Make sure to select your main account as <b>"Owner"</b> account to prevent OPs doing inappropriate things, if you added wrong person. <b>DO NOT</b> give owner to non-trusted players!

### Trading System
As a player you can put an item up for sale on your trading section and other players from that server can buy that on the website. Trading system works on the minecraft server aswell. The main concept of the trading system is to make the space more accessible for players and their hard work on the server.


# Contribution

Feel free to fork if you want. If you have issue please report this to Issues

The web application is made in Next.js, the mod is made in Forge and plugin in Spigot

#### 1. Clone repo
```git
git clone https://github.com/fairdev2003/invsee.git
```



#### 2. Change Directory
```git
cd Website
cd client
```

#### 3. Install dependecies
```git
npm install
```

#### 4. Run the application

```git
npm run dev
```

# License
<a href="https://github.com/fairdev2003/invsee/blob/master/LICENSE.txt">here</a>
(i dont care)

(this is concept, no api route will work!)
