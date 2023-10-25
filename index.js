const { Client, GatewayIntentBits, Partials, Collection, ActivityType, GuildChannel, channelLink} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const Jimp = require('jimp');
const sharp = require('sharp');
const fs = require('fs');
const request = require('request-promise');
const request2 = require('request');
const client = new Client({
   intents: [Guilds, GuildMembers, GuildMessages],
   partials: [User, Message, GuildMember, ThreadMember]
});


client.config = require("./config.json")
client.events = new Collection();
client.commands = new Collection();   

const { loadEvents } = require("./Handlers/eventHandler")

//Cuando el bot está listo
client.once('ready', (bot) => {
    client.user?.setStatus('dnd')
    client.user?.setActivity('Not Lewd Development', { type: ActivityType.Competing});
});

async function convertWebpToJpeg(webpUrl) {
    // Hacer una solicitud HTTP a la URL de la imagen
    const response = await request.get({
      url: webpUrl,
      encoding: null // Esto es importante para que la respuesta se devuelva como un buffer en lugar de una cadena de texto
    });
  
    // Escribir el buffer en un archivo en formato JPEG
    await _.writeFile('imagen.jpg', response, 'binary');
  }

//Cuando se une alguien al servidor
client.on('guildMemberAdd', async (member) =>{
  /*const imageUrl = `${member.user.displayAvatarURL()}`
  const requestOptions = {
    encoding: null // Esto indica que la respuesta debe ser interpretada como una cadena de datos binaria
  };
  request.get(imageUrl, requestOptions, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
  });
  const image = sharp('./welcome.jpg');
  const avatar = await sharp(imageUrl)
     .resize(128, 128)
     .toBuffer()
     .catch(err => console.error(err));
  if (!avatar) return;
  // Redimensionar la foto de perfil y añadirla a la imagen
  const avatarBuffer = await avatar
    .resize(128, 128)
    .toBuffer();

  const imageWithAvatar = await image
    .composite([{ input: avatarBuffer, top: 32, left: 32 }])
    .toBuffer();

  const canvas = Canvas.createCanvas(300, 300);
  const ctx = canvas.getContext('2d');

  ctx.font = '32px sans-serif';
  ctx.fillText(`Welcome ${member.user.username}`, 32, 32);

  const textBuffer = await Sharp(canvas.toBuffer())
    .toBuffer();

  const finalImage = await imageWithAvatar
    .composite([{ input: textBuffer, top: 200, left: 200 }])
    .toBuffer();  

  const channel = member.guild.channels.cache.find(ch => ch.id === '1010644626660659280');
      if (!channel) return;
         channel.send(``, {
            files: [{
            attachment: finalImage,
            name: 'welcome.png'
        }]
    });*/
});

//Cuando sale alguien del servidor
client.on('guildMemberRemove', async (member) =>{
  /*const image = await Jimp.read('./welcome.jpg');
  const avatar = await Jimp.read(member.user.displayAvatarURL({ format: 'jpg' }));

  // Redimensionar la foto de perfil y añadirla a la imagen
  avatar.resize(128, 128);

  // Añadir el nombre del usuario a la imagen
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
  image.print(font, 200, 200, `Welcome${member.user.username}`);

  // Convertir la imagen a una cadena de datos en formato PNG
  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  // Enviar la imagen al canal de bienvenida del servidor
  const channel = member.guild.channels.cache.find(ch => ch.id === '1010644641047138365');
  if (!channel) return;
  channel.send(``, {
    files: [{
      attachment: buffer,
      name: 'welcome.png'
    }]
  });*/
});

//Cuando alguien boostea el servidor
client.on('guildMemberUpdate', async (oldMember, newMember) => { 
    //Si boostea el server 
  /*  if (oldMember.premiumSince !== newMember.premiumSince) { 
        const image = await Jimp.read('./boost.jpg');
  const avatar = await Jimp.read(member.user.displayAvatarURL({ format: 'jpg' }));

  // Redimensionar la foto de perfil y añadirla a la imagen
  avatar.resize(128, 128);
  image.composite(avatar, 32, 32);

  // Añadir el nombre del usuario a la imagen
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
  image.print(font, 200, 200, `Welcome${member.user.username}`);

  // Convertir la imagen a una cadena de datos en formato PNG
  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  // Enviar la imagen al canal de bienvenida del servidor
  const channel = member.guild.channels.cache.find(ch => ch.id === '1010644655832055939');
  if (!channel) return;
  channel.send(``, {
    files: [{
      attachment: buffer,
      name: 'welcome.png'
    }]
  });*/
});


loadEvents(client);
client.login(client.config.token);
 