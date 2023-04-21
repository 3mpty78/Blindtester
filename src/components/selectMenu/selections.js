module.exports = {
  data: {
    name: "selections",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You select: ${interaction.values[0]}`,
    });
  },
};
