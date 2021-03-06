const Discord = require('discord.js');
const os = require('os');

module.exports.run = (_bot, msg) => {
  const infoEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('System Info')
    .setURL('https://github.com/ibveecnk/iven.js')
    .setDescription('Information about the host system')
    .setThumbnail(
      'https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg',
    )
    .addFields(
      { name: 'Platform', value: os.platform() },
      { name: 'Architecture', value: os.arch() },
      { name: 'Hostname', value: os.hostname() },
      { name: 'Memory', value: Math.floor(os.totalmem() / 10e8) + 'GB' },
      { name: 'CPU Cores', value: os.cpus().length + ' Cores' },
      { name: 'Uptime', value: os.uptime() + 's' },
    )
    .setTimestamp();

  msg.channel.send(infoEmbed);
};

module.exports.help = {
  name: 'sys',
  description: 'Returns basic information about the underlying os',
  perms: '',
  syntax: 'sys',
};
