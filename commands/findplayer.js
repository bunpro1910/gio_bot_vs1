


const { CommandType } = require('wokcommands')
const { ApplicationCommandOptionType } = require('discord.js')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ChannelType, PermissionsBitField } = require('discord.js')
async function createVoiceChannel(guild, channelName, channel, limit) {

    const newChannel = await guild.channels.create({
        type: ChannelType.GuildVoice,
        name: channelName,
        parent: channel,
        userLimit: limit,
        permissionOverwrites: [
            {
                move_members: true,
                id: guild.id,
                deny: [] // Don't allow everyone to view the channel
            }
        ]
    });

    return newChannel;
}
let listid = [{
    id: "1080256302812516392",
    name: "LOL"
},
{
    id: "1080237345980305468",
    name: "Valorant"
}, {

    id: "1088638227423965224",
    name: "Other"
}
]
let listimage = [{
    name: "LOL",
    rank: "iron",
    image: "https://cdn3.emoji.gg/emojis/7574-iron.png"
}, {
    name: "LOL",
    rank: "bronze",
    image: "https://cdn3.emoji.gg/emojis/1184-bronze.png"
}, {
    name: "LOL",
    rank: "silver",
    image: "https://cdn3.emoji.gg/emojis/7455-silver.png"
}, {
    name: "LOL",
    rank: "gold",
    image: "https://cdn3.emoji.gg/emojis/1053-gold.png"
}, {
    name: "LOL",
    rank: "platinum",
    image: "https://cdn3.emoji.gg/emojis/3978-platinum.png"
}, {
    name: "LOL",
    rank: "diamond",
    image: "https://cdn3.emoji.gg/emojis/1053-diamond.png"
}, {
    name: "LOL",
    rank: "master",
    image: "https://cdn3.emoji.gg/emojis/9231-master.png"
}, {
    name: "LOL",
    rank: "grand master",
    image: "https://cdn3.emoji.gg/emojis/9476-grandmaster.png"
}, {
    name: "LOL",
    rank: "challange",
    image: "https://cdn3.emoji.gg/emojis/9476-challenger.png"
}, {
    name: "LOL",
    rank: "unrank",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088905367213326406/s8_unranked.png"
},
{
    name: "Valorant",
    rank: "radiant",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897194280624168/latest.png"
}, {
    name: "Valorant",
    rank: "immotal",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897194498740345/latest.png"
}, {
    name: "Valorant",
    rank: "silver",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897195547304056/latest.png"
}, {
    name: "Valorant",
    rank: "gold",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897195236921415/latest.png"
}, {
    name: "Valorant",
    rank: "platinum",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897195035611176/latest.png"
}, {
    name: "Valorant",
    rank: "diamond",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897194771353652/latest.png"
}, {
    name: "Valorant",
    rank: "iron",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897196050616393/latest.png"
}, {
    name: "Valorant",
    rank: "bronze",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088897195765420062/latest.png"
}, {
    name: "Valorant",
    rank: "unrank",
    image: "https://cdn.discordapp.com/attachments/1087825339738243103/1088905366928105624/unrated.png"
},



]
module.exports = {

    callback: async ({ interaction, message, member, args, guild, client }) => {
        if (interaction) {
            console.log(args)
            const channel = guild.channels.cache.get(listid.filter((e) => e.name == args[0])[0].id);
            let image = guild.iconURL()
            if (args[0] == "LOL") {
                if(args[1]){
                    if (listimage.filter((e) => args[1].includes(e.rank) && e.name == "LOL").length > 0) { image = listimage.filter((e) => args[1].includes(e.rank) && e.name == "LOL")[0]?.image }
                }
           
            } else if (args[0] == "Valorant") {
                if(args[1]){
                    if (listimage.filter((e) => args[1].includes(e.rank) && e.name == "Valorant").length > 0) { image = listimage.filter((e) => args[1].includes(e.rank) && e.name == "Valorant")[0]?.image }
                }
               
            } else if (args[0] == "Other") {

                image = member.displayAvatarURL()
            }
            let voice = await createVoiceChannel(guild, member.user.username, channel, 16)
            let invite = await voice.createInvite({
                maxAge: 86400, // 24 hours in seconds
                maxUses: 0, // unlimited uses
                unique: true, // unique code
                reason: `Join for ${member.user.username}` // optional reason
            })

            const edit = new EmbedBuilder()
            
                .setColor('#eb34d5')
                .setTitle(`${args[0]} game${args[1]?",rank : "+args[1]+'\n':""}${args[2]?"```"+args[2]+"```":""}`)
                .setAuthor({ name: `${member.user.username}` })
                .setDescription(`#team 0/5 [Bấm để tham gia](${invite.url})`)
                .setThumbnail(image)
            interaction.channel.send({ embeds: [edit] }).then(async (msg1) => {

                client.on('voiceStateUpdate', (oldState, newState) => {
                    const channelid = newState.channel?.id
                    const channel = oldState.channel || newState.channel;
                    console.log(channelid)
                    if (channelid == voice.id) {
                        edit.setDescription(+ voice.members.size + "/5" + `click link to join room [Bấm để tham gia](${invite.url})`)
                        msg1.edit({ embeds: [edit] })
                    }
                    if (channel && channel.members.size === 0 && channel.type === ChannelType.GuildVoice && channel.id == voice.id) {
                        edit.setDescription(`ended`)
                        channel.delete()
                        msg1.edit({ embeds: [edit] })
                            .then(() => console.log(`Channel ${channel.name} deleted successfully.`))
                            .catch(console.error);
                    }
                })


            })
            return ({ content: "create successfully", ephemeral: true })
        }
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('LOL')
                    .setLabel('LOL')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('Valorant')
                    .setLabel('Valorant')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('Other')
                    .setLabel('Other!')
                    .setStyle(ButtonStyle.Primary),
            )

        const exampleEmbed = new EmbedBuilder()
            .setColor('#eb34d5')
            .setTitle(`Thông tin của ${message.author.username}`)
            .setAuthor({ name: message.author.username })
            .setDescription("#team ")
            .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEuDOcLUV0kwJUZEvLrvJD-Iz1T6QDYy73Mw&usqp=CAU")

            .setFooter({ text: 'choose type of game' });


        if (message) {
            message.reply({ embeds: [exampleEmbed], components: [row] }).then((mess) => {
                client.on('interactionCreate', async (interaction) => {
                    if (!interaction.isButton()) return; // Ignore non-button interactions

                    if (interaction.message.id !== mess.id) return; // Ignore buttons in other messages


                    if (interaction.user.id != message.author.id) return
                    const button = interaction.customId; // Get the ID of the clicked button
                    let messfinal
                    let options
                    if (button === 'LOL') {
                        options = 'LOL'
                        messfinal = await interaction.reply('Bạn đã chọn LOL nhập rank');
                    } else if (button === 'Valorant') {
                        options = 'Valorant'
                        messfinal = await interaction.reply('Bạn đã chọn Valorent nhập rank');
                    } else if (button === 'Other') {
                        options = 'Other'
                        messfinal = await interaction.reply('Bạn đã chọn Other');
                    } else {
                        return
                    }
                    const filter = (msg) => {

                        return msg.author.id == message.author.id;
                    };
                    const channel = guild.channels.cache.get(listid.filter((e) => e.name == options)[0].id);
                    if (options == "Other") {

                        let image = guild.iconURL()
                        let arg = args.reduce((init, item, i) => {
                            init += item + ' '
                            return init
                        }, '')
                        const edit = new EmbedBuilder()
                            .setColor('#eb34d5')
                            .setTitle(`Custom game `)
                            .setAuthor({ name: message.author.username })
                            .setDescription(`Open custom ${arg} <@${message.author.id}>`)
                            .setThumbnail(image)

                        message.channel.send({ embeds: [edit] }).then(async (msg1) => {
                            let voice = await createVoiceChannel(guild, message.author.username, channel, 16)
                            let invite = await voice.createInvite({
                                maxAge: 86400, // 24 hours in seconds
                                maxUses: 0, // unlimited uses
                                unique: true, // unique code
                                reason: `Join for ${message.author.username} ${message.conent}` // optional reason
                            })

                            const inviteurl = new EmbedBuilder()
                                .setDescription(`#team <@${message.author.id}> Custom click link to join room [Click this link](${invite.url})`)

                            client.on('voiceStateUpdate', (oldState, newState) => {
                                console.log(oldState)
                                console.log(newState)
                                const channelid = newState.channel?.id
                                const channel = oldState.channel || newState.channel;
                                console.log(channelid)
                                if (channelid == voice.id) {
                                    edit.setDescription(+ voice.members.size + "/5" + + `click link to join room [Click this link](${invite.url})`)
                                    msg1.edit({ embeds: [edit] })
                                }
                                if (channel && channel.members.size === 0 && channel.type === ChannelType.GuildVoice && channel.id == voice.id) {
                                    edit.setDescription(`ended`)
                                    channel.delete()
                                    msg1.edit({ embeds: [edit] })
                                        .then(() => console.log(`Channel ${channel.name} deleted successfully.`))
                                        .catch(console.error);
                                }
                            })
                            msg1.channel.send({ embeds: [inviteurl] })

                        })
                        return
                    }

                    const colecter = message.channel.createMessageCollector({ filter, time: 1500 * 6 })
                    colecter.on('collect', async (msg) => {
                        let arg = msg.content.split('')
                        if (!msg.content) {
                            message.reply('yêu cầu nhập <rank>')
                            return
                        }
                        let rank = arg.reduce((init, item, i) => {
                            init += item
                            return init
                        }, '')
                        let image = guild.iconURL()
                        console.log(listimage.filter((e) => e.rank.includes(rank)))
                        if (listimage.filter((e) => rank.includes(e.rank) && e.name == "LOL").length > 0) { image = listimage.filter((e) => rank.includes(e.rank) && e.name == "LOL")[0].image }
                        const edit = new EmbedBuilder()
                            .setColor('#eb34d5')
                            .setTitle(`rank : ${rank}`)
                            .setAuthor({ name: message.author.username })
                            .setDescription("#team " + 5 + ` <@${message.author.id}>`)
                            .setThumbnail(image)

                        msg.channel.send({ embeds: [edit] }).then(async (msg1) => {
                            console.log(channel)
                            let voice = await createVoiceChannel(guild, message.author.username, channel, 5)

                            let invite = await voice.createInvite({
                                maxAge: 86400, // 24 hours in seconds
                                maxUses: 0, // unlimited uses
                                unique: true, // unique code
                                reason: `Join for ${message.author.username} ${message.conent}`
                            })
                            console.log(colecter)
                            const inviteurl = new EmbedBuilder()
                                .setDescription(`#team 5 <@${message.author.id}>` + `click link to join room [Click this link](${invite.url})`)



                            client.on('voiceStateUpdate', (oldState, newState) => {
                                console.log(oldState)
                                console.log(newState)
                                const channelid = newState.channel?.id
                                const channel = oldState.channel || newState.channel;
                                console.log(channelid)
                                if (channelid == voice.id) {
                                    edit.setDescription(+ voice.members.size + "/5" + + `click link to join room [Click this link](${invite.url})`)
                                    msg1.edit({ embeds: [edit] })
                                }
                                if (channel && channel.members.size === 0 && channel.type === ChannelType.GuildVoice && channel.id == voice.id) {
                                    edit.setDescription(`ended`)
                                    channel.delete()
                                    msg1.edit({ embeds: [edit] })
                                        .then(() => console.log(`Channel ${channel.name} deleted successfully.`))
                                        .catch(console.error);
                                }
                            })
                            msg1.channel.send({ embeds: [inviteurl] })
                            colecter.stop()
                        })

                    })



                });


            })
        }


    },

    description: 'cách dùng ;findplayer',
    expectedArgs: "",
    minArgs: 1,
    maxArgs: 3,
    type: CommandType.SLASH,
    options: [
        {
            name: "game",
            description: "Choose type of game",
            type: ApplicationCommandOptionType.String,
            required: true,
            // Required for autocomplete to work
            autocomplete: true,

        },
        {
            name: "rank",
            description: "You need enter rank",
            type: ApplicationCommandOptionType.String,
            required: false,

            // Required for autocomplete to work
            autocomplete: true,

        }, {
            name: "text",
            description: "Optional",
            type: ApplicationCommandOptionType.String,
            required: false,
            // Required for autocomplete to work
            autocomplete: false,

        }
    ],
    correctSyntax: "Correct syntax: +findplayer",
    delete: false,
    autocomplete: (command, argument, instance) => {

        if (instance.options._hoistedOptions.filter((e) => e.name == "game" && e.value == "Other").length > 0) {
            return ["none"]
        }
        if (instance.options._hoistedOptions.filter((e) => e.name == "game" && e.value == "Valorant").length > 0) {
            return ["radiant", "immotal", "unrank", "iron", "bronze", "silver", "gold", "platinum", "diamond"]
        }
        if (instance.options._hoistedOptions.filter((e) => e.name == "game" && e.value == "LOL").length > 0) {
            return ["unrank", "iron", "bronze", "silver", "gold", "platinum", "diamond", "master", "grand master", "challange"]
        }
        if (argument == "game") {
            return ['LOL', "Valorant", "Other"]
        }
    },
}
