const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Register this server into the database"),
  async execute(interaction, client) {
    // Vérification du rôle de Modération ->

    const moderator = "MODERATOR_ROLE_ID";
    if (!interaction.member.roles.cache.some((role) => role.id === moderator)) {
      interaction.reply({
        content: "Sorry, only 'moderator' can use this command",
        ephemeral: true,
      });
      return;
    }

    let guildProfile = await Guild.findOne({
      guildId: interaction.guild.id,
    });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: new mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None",
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `✅ Registered as : **${guildProfile.guildName}**`,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply("*Already in the database !*");
    }
    console.log(guildProfile);
  },
};
