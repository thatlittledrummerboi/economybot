const { SlashCommandBuilder } = require('discord.js');
const { admins } = require('../../config.json');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command for the bot'),
    async execute(interaction) {
        let pass = false;

        if (admins.includes(interaction.user.id)) {
            await interaction.reply('test!');
            pass = true;
        } else {
            await interaction.reply('you dont have perms to use this command :c');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /test; pass: ${pass}`);
    },
};