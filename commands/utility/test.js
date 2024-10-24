const { SlashCommandBuilder } = require('discord.js');
const { admins } = require('../../config.json');
const { parseJSON } = require('../../handyman');
const fs = require('node:fs');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command for the bot'),
    async execute(interaction) {
        let pass = false;

        if (admins.includes(interaction.user.id)) {
            let economy = parseJSON('economy.json');
            economy[interaction.user.id].stats.commandsExecuted++;
            await fs.writeFile('../../economy.json', JSON.parse(economy), err => {if (err) throw err;});
            await interaction.reply('test!');
            pass = true;
        } else {
            await interaction.reply('you dont have perms to use this command :c');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /test; pass: ${pass}`);
    },
};