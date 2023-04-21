const { ActivityType } = require("discord.js");

// Set the activity status of the bot
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [
        {
          type: ActivityType.Listening,
          name: "everything",
        },
      ],
      status: "online",
    });

    //Log to see if the bot is connected to the server
    console.log(`${client.user.tag} is connected !`);
  },
};
