const express =require('express');
const app = express();
const url  =require('url');
require('dotenv').config()
const path = require('path')
const bodyParser =require('body-parser')
const  cookieParser =require("cookie-parser");
const sessions =require("cookie-session")
const cors =require("cors")

const port = process.env.PORT || 3000;


const { dirname } =require('path')
const { fileURLToPath } =require('url')
const morgan =require('morgan')
const axios = require("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(express.urlencoded({ extended: true })); 
app.use('/public',express.static((__dirname+ '/public')))
const { Client, GatewayIntentBits, Partials ,ActivityType,Events,ChannelType  } =require('discord.js');
const fs =require('fs')
const mongoose=require('mongoose')

const imagerp = require('./replace.json')

const WOKCommands =require('wokcommands')
const {Schema}=require('mongoose')
let s = new Schema({
    _id : String,
    time : Number
} )


const time = mongoose.model("cooldown_time", s);
const Connection =require('pg');
var connection = Connection.Pool


app.use(cors())
app.use(morgan('dev'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const con =  mongoose.connect("mongodb+srv://gokuhieu:Taolabun123@cluster0.rk3z6.mongodb.net/?retryWrites=true&w=majority")

app.get('/',(req,res)=>{
	
       res.send("hello world !")
       let date= new Date();
       if(date.getHours()==0&&date.getMinutes()>=0&&date.getMinutes()<5){
        
       }
})


app.post("/webhook",(req,res)=>{
 
    
})

const bot = new Client({
    // intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.DIRECT_MESSAGES],
    intents: [
    
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
     
      ],
      partials: [Partials.Channel],
    disableEveryone: false
});



bot.on('voiceStateUpdate', (oldState, newState) => {
   
   
  });
  
bot.on('ready', () => {
    let status = `ấn +help xem lệnh`
    setInterval(()=>{
        
        bot.user.setPresence({activities: [{ name: status, type: ActivityType.Watching }]});
    },5000)

	new WOKCommands({
        client :bot, 
	  // The name of the local folder for your command files
	  commandsDir: path.join(__dirname, 'commands'),
	  testServers:"748811361534083092",
	  mongoUri:"mongodb+srv://gokuhieu:Taolabun123@cluster0.rk3z6.mongodb.net/?retryWrites=true&w=majority",
      dbOptions:{keepAlive:true},
      botOwners:`619133446719012866`
	})    
})


// bot.on(Events.InteractionCreate, async (interaction) => {


// });

bot.login(process.env.DISCORD_TOKEN);
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    