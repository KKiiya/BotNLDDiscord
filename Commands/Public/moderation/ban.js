const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addMentionableOption(option => option
        .setName("user")
        .setDescription("User you want to ban")
        .setRequired(true)),        
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
      const member = interaction.options.getMentionable("user")
      const reasonModal = new ModalBuilder()
        .setCustomId(`banModal-${member.user.id}`)
        .setTitle("Ban Reason");
      const reasonInput = new TextInputBuilder()
        .setCustomId("reasonInput")
        .setLabel("Why are you banning this user?")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder("Provide a reason for banning this user (Leave blank if you want)")
        .setRequired(false)  

      if (member.roles.highest.position >= interaction.member.roles.highest.position) {
        interaction.reply({content: "You cannot ban this user!", ephemeral: true})
        return;
      }

      const reasonActionRow = new ActionRowBuilder().addComponents(reasonInput);

      reasonModal.addComponents(reasonActionRow);
      await interaction.showModal(reasonModal);

      const filter = (interaction) => interaction.customId === `banModal-${member.user.id}`;

      interaction
      .awaitModalSubmit({ filter, time: 30_000})
      .then((modalInteraction) => {
        const banReasonValue = modalInteraction.fields.getTextInputValue("reasonInput");

        try {
          member.ban({
            reason: banReasonValue
          })
        } catch (err) {
          
        }
        modalInteraction.reply({content: `<@${member.id}> didn't stick the landing`, ephemeral: true});
      })
    }
}