/**
 * @Author: Iven Beck
 * @Date:   2019-05-25T16:17:50+02:00
 * @Email:  ivenbeck@outlook.de
 * @Last modified by:   Iven Beck
 * @Last modified time: 2019-07-25T23:12:52+02:00
 */



const index = require("../index");
const botconfig = require("../botconfig");

module.exports.run = (client, msg, args) => {
  let helpstring = "";
  let commands = index.commandcollection;
  let prefix = process.env.PREFIX || prefix;
  let empty = " ";
  let assocStr = " " + ">>" + " ";

  if (args.length === 0) {
    commands.forEach(c => {

      // Check and format if name/desc is too long
      let name;
      let desc = (c.help.description ? c.help.description : "-");

      if (c.help.name.length > 20) {
        name = c.help.name.substr(0, 20);
        name += "...";
      } else {
        name = c.help.name;
      }
      if (desc.length > 60) {
        desc = c.help.description.substr(0, 60);
        desc += "...";
      }


      // Generate empties
      let count = 30 - (prefix.length + name.length);
      helpstring += `${prefix}${name}${empty.repeat(count)}${assocStr}${desc}\n`;
    });

    if (helpstring.length > 1950) return msg.channel.send("ERROR, pls contact owner!");

    msg.channel.send("```" +
      helpstring +
      "\nFor more info on a command use " + prefix + "help [command]```");
  }

  if (args.length === 1) {
    try {
      let searchedcmd = commands.find(c => c.help.name === args[0]);
      let perm = (searchedcmd.help.perms ? searchedcmd.help.perms : "none");
      let desc = (searchedcmd.help.description ? searchedcmd.help.description : "UNDEFINED");
      let syntax = (searchedcmd.help.syntax ? searchedcmd.help.syntax : "UNDEFINED");

      let helpstring = "```" +
        `Help for '${prefix}${searchedcmd.help.name}'\n` +
        "Info: [] = optional, {} = obligatory\n\n" +
        `Required Perms: ${perm}\n\n` +
        `Description: ${desc}\n\n` +
        `Syntax: ${prefix}${syntax}` +
        "```";
      msg.channel.send(helpstring);
    } catch (e) {
      msg.channel.send("Error: `Invalid Search Query`\nTry listing available commands with `" + prefix + "help`");
    }
  } else if (args.length > 1) {
    msg.channel.send("Invalid Syntax: Use `" + prefix + "help help` to see the syntax");
  }
};

module.exports.help = {
  name: "help",
  description: "Lists all commands with their descriptions and syntax",
  perms: "",
  syntax: "help [command]"
};