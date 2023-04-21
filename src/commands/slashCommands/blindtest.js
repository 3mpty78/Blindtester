const quiz = require("./quiz.json");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blindtest")
    .setDescription("Blindtest game"),

  async execute(interaction) {
    if (interaction.replied) {
      return;
    }

    // Checks if the user has the 'MODERATOR' role

    if (
      !interaction.member.roles.cache.some((role) => role.name === "MODERATOR")
    ) {
      interaction.reply({
        content:
          "Sorry, you must have the 'MODERATOR' role to use this command.",
        ephemeral: true,
      });
      return;
    }

    // Get a random sentence in the 'blindtest.json' file
    const blindtest = blindtest[Math.floor(Math.random() * blindtest.length)];

    // Creating the question embed message
    const questionEmbed = new EmbedBuilder()
      .setTitle("Guess the song :")
      .setDescription(`${blindtest.questions} 🎶`)
      .setColor(0x4f6ddb);

    // Creating the 'Time's up' embed message
    const timesUpEmbed = new EmbedBuilder()
      .setTitle(`Time's up !`)
      .setDescription(`The answer was :  ${blindtest.final}`)
      .setColor(0xec2b2b);

    // Creating the winner embed message
    const congratsEmbed = new EmbedBuilder()
      .addFields({ name: "The answer was", value: `${blindtest.final}` })
      .setColor(0x65dc65);
    const filter = (response) => {
      return (
        Array.isArray(blindtest.answers) &&
        blindtest.answers.some((answer) => {
          return answer.toLowerCase() === response.content.toLowerCase();
        })
      );
    };

    // Making the bot reply with embeds
    interaction.reply({ embeds: [questionEmbed] }).then(() => {
      // Filter messages sent during last 15 seconds et collect the first one
      interaction.channel
        .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then((collected) => {
          // Get the first message and set the author as the winner
          const winner = collected.first().author;
          if (filter(collected.first())) {
            congratsEmbed
              .setTitle(`Good job !`)
              .setDescription(`Congratulations to ${winner}`);
            congratsEmbed.setThumbnail(winner.displayAvatarURL());
            interaction.followUp({ embeds: [congratsEmbed] });
          }
        })
        // Sends the 'Time's up' embed message after 15 seconds if no one has the answer
        .catch(() => {
          interaction.followUp({ embeds: [timesUpEmbed] });
        });
    });
  },
};
