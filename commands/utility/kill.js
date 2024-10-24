const { SlashCommandBuilder } = require('discord.js');
const { admins } = require('../../config.json');
const fs = require('node:fs');
const {parseJSON} = require('../../handyman');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('kills the bot'),
    async execute(interaction) {
        let pass = false;
        if(admins.includes(interaction.user.id)) {
            let economy = parseJSON('economy.json');
            await interaction.reply('ni ni :3');
            economy[interaction.user.id].stats.commandsExecuted++;
            await fs.writeFile('../../economy.json', JSON.parse(economy), err => {if (err) throw err;});
            pass = true;
            console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /kill; pass: ${pass}`);
            process.exit();
        } else {
            await interaction.reply('you dont have perms to use this command :c');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /kill; pass: ${pass}`);
    },
};