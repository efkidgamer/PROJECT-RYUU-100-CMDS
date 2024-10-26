const axios = require('axios');

module.exports = {

  name: "time",

  description: "Fetches the current time for a specified location.",

  prefixRequired: false, // Command does not require a prefix

  adminOnly: false, // Command is not restricted to admins only

  async execute(api, event, args) {

    const threadID = event.threadID;

    const messageID = event.messageID;

    const location = args.join(' '); // Get location from arguments

    // Validate location

    if (!location) {

      return api.sendMessage("Please provide a location. Example: 'New York', 'London', 'Tokyo'", threadID, messageID);

    }

    const url = `https://romeo-time.onrender.com/timezone?location=${encodeURIComponent(location)}`;

    try {

      // Fetch time from the API

      const response = await axios.get(url);

      const { date_time_txt, timezone } = response.data;

      if (!date_time_txt) {

        return api.sendMessage("Could not retrieve time for the specified location. Please check the location name.", threadID, messageID);

      }

      // Format the response

      const responseMessage = `🌍 Current Time:\n\n` +

        `🕒 Location: ${location}\n` +

        `🕰 Current Time: ${date_time_txt}\n` +

        `🌐 Time Zone: ${timezone}`;

      // Send the response

      await api.sendMessage(responseMessage, threadID, messageID);

    } catch (error) {

      console.error("Failed to fetch time:", error);

      await api.sendMessage("⚠ | An error occurred while fetching the time.", threadID);

    }

  },

};