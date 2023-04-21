const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("Menu")
    .setDescription("This is a select menu"),

  async execute(interaction) {
    // Cheks if the interaction has already been replied
    if (interaction.replied) {
      return;
    }

    const menu = new StringSelectMenuBuilder()
      .setCustomId(`selections`)
      .setPlaceholder("Here are your options")
      .addOptions(
        new StringSelectMenuOptionBuilder({
          label: "OPTION_1",
          description: "OPTION_DESCRIPTION",
          value: "OPTION_VALUE_(ex: website URL)",
        }),
        new StringSelectMenuOptionBuilder({
          label: "OPTION_2",
          description: "OPTION_DESCRIPTION",
          value: "OPTION_VALUE_(ex: website URL)",
        })
      );

    const row = new ActionRowBuilder().addComponents(menu);
    await interaction.reply({
      content: "Make a selection",
      components: [row],
    });
  },
};
