const { SlashCommandBuilder } = require('discord.js');
const { admins } = require('../../config.json');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command for the bot'),
    async execute(interaction) {
        if (admins.includes(interaction.user.id)) {
            await interaction.reply('test!');
        } else {
            await interaction.reply('you dont have perms to use this command :c');
        }
    },
};