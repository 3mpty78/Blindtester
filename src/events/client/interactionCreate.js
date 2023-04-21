module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    // Checks if the interaction is a chat input command
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `An error occured with this command ...`,
          ephemeral: true,
        });
      }

      // Checks if the interaction is a selection menu
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenu } = client;
      const { customId } = interaction;
      const menu = selectMenu.get(customId);
      if (!menu) return new Error("No code for this menu");

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
