
let c 
const {CommandType} = require('wokcommands')

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ChannelType, PermissionsBitField } = require('discord.js')
module.exports ={
    callback: ({ instance,message,args,client,guild  }) => {
        let commands = instance.commandHandler.commands
     
        const exampleEmbed = new EmbedBuilder()
        .setColor('#eb34d5')
        .setTitle(`Thông tin của ${message.author.username}`)
        .setAuthor({ name: message.author.username })
        .setDescription("Đây là các Câu lệnh của bot gió")
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .setFooter({ text: 'Prefix ;<tên lệnh>' });
        let arr=[]
        commands.forEach(obj => {
            console.log(obj)
            arr.push({name:`;${obj.commandName}`,value:`${obj.commandObject.description};`})
           
        });

  
        exampleEmbed.setFields(JSON.parse(JSON.stringify(arr)))
    
        // message is provided only for a legacy command
        if(message){
            message.reply({embeds:[exampleEmbed]})
        }
        
		
      },
    description: 'Cách dùng ;help',

    type:CommandType.BOTH,

    correctSyntax: "Correct syntax: ;help",
    delete: false
    
    
}
