const { ChatInputCommandInteraction, SlashCommandBuilder, userMention, TextInputStyle, PermissionFlagsBits, Client } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send a message or a embed")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
    .addStringOption(option => option
      .setName("message")
		  .setDescription("The message you want to send")
		  .setRequired(true))
    .setName('msg')
    .setDescription("Send a message"))
    .addSubcommand((options) => options
    .setName("embed")
    .setDescription("Send a embed message")
    .addStringOption(option => option
      .setName("title")
      .setDescription("Title for your embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("description")
      .setDescription("Description for your embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field1")
      .setDescription("1st field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field1content")
      .setDescription("1st field of the embed")
      .setRequired(true)) 
    .addStringOption(option => option
      .setName("field2")
      .setDescription("2nd field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field2content")
      .setDescription("1st field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field3")
      .setDescription("3rd field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field3content")
      .setDescription("1st field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field4")
      .setDescription("4th field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field4content")
      .setDescription("4th field of the embed")
      .setRequired(true))  
    .addStringOption(option => option
      .setName("field5")
      .setDescription("5th field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("field5content")
      .setDescription("4th field of the embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("subtitle")
      .setDescription("Set a subtitle")
      .setRequired(false))
    .addStringOption(option => option
      .setName("thumbnail")
      .setDescription("Set a image by using a url")
      .setRequired(false))
    .addStringOption(option => option
      .setName("color")
      .setDescription("Set a color for your embed")
      .setRequired(false))
    .addStringOption(option => option
      .setName("subimage")
      .setDescription("Set a image to the subtitle")
      .setRequired(false))),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */ 
    execute(interaction) {
      const subCommand = interaction.options.getSubcommand();
      const message = interaction.options.getString('message');  
      const embed = new EmbedBuilder();
      const title = interaction.options.getString('title');
      const description = interaction.options.getString('description');
      const f1 = interaction.options.getString('field1');
      const f2 = interaction.options.getString('field2');
      const f3 = interaction.options.getString('field3');
      const f4 = interaction.options.getString('field4');
      const f5 = interaction.options.getString('field5');
      const field1cont = interaction.options.getString('field1content');
      const field2cont = interaction.options.getString('field2content');
      const field3cont = interaction.options.getString('field3content');
      const field4cont = interaction.options.getString('field4content');
      const field5cont = interaction.options.getString('field5content');
      var subtitle = interaction.options.getString('subtitle') || " "
      var subimage = interaction.options.getString('subimage');
      var color = interaction.options.getString('color') || 0xee0000
      var thumbnail = interaction.options.getString('thumbnail');

      switch (subCommand) {
        case "msg" :{
            interaction.reply({content: message, ephemeral: false})
          }
          break;
        case "embed" :{
          embed
          .setTitle(title)
          .setDescription(description)
          .setThumbnail(thumbnail)
          .setAuthor({name: subtitle, iconURL: subimage})
          .setTimestamp(Date.now())
          .setColor(color)
          .addFields(
           {
            name: f1,
            value: field1cont,
            inline: true
           },
           {
            name: f2,
            value: field2cont,
            inline: true
           },
           {
            name: f3,
            value: field3cont,
            inline: true
           },
           {
            name: f4,
            value: field4cont,
            inline: true
           },
           {
            name: f5,
            value: field5cont,
            inline: false
           }
          ),
            interaction.reply({
              embeds: [embed], 
              ephemeral: false
            });
          }
          break;
        }
    }
}   