disc = require('discord.io')
auth = require('./auth.json')
var bot = new disc.Client({
  token:auth.token,
  autorun:true
})

funcs = new Map()
funcs.set("ping",function(args){return "pong"})
nums = new Map()
funcs.set("size",function(args){
  if (!nums.get(args)){
    nums.set(args,Math.round(Math.random()*5)+3)
  }
  return nums.get(args)
})

bot.on('message',function(user,userid,channelid,msg,evt) {
  if (msg.substring(0,1)=="!") {
    msg = msg.substring(1)
    space = msg.indexOf(" ")
    if (space==-1) {
      cmd = msg
      args = ""
    } else {
      cmd = msg.substring(0,space)
      args = msg.substring(space+1)
    }
    func = funcs.get(cmd)
    if (func){
      bot.sendMessage({to:channelid,message:func(args)})
    }
  }
})
