const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('')
        .setDescription(''),
    async execute(interaction) {
        // interaction here
    },
};