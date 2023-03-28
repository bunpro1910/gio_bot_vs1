
let c 
const {CommandType} = require('wokcommands')

module.exports ={
    callback: ({ interaction,message,args,client  }) => {


        console.log(1)
        // message is provided only for a legacy command
        if(message){
            message.reply(`🏓Tốc độ xử lý hiện tại ${Date.now() - message.createdTimestamp}ms. Tốc độ rest API ${Math.round(client.ws.ping)}ms`)
        }
        
		
      },
    description: 'Cách dùng ;ping',

    type:CommandType.BOTH,

    correctSyntax: "Correct syntax: ;ping",
    delete: false
    
    
}
