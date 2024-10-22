const { SlashCommandBuilder, Client } = require('discord.js');
const { admins } = require('../../config.json');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('kills the bot'),
    async execute(interaction) {
        let pass = false;
        if(admins.includes(interaction.user.id)) {
            await interaction.reply('ni ni :3');
            pass = true;
            console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /kill; pass: ${pass}`);
            process.exit();
        } else {
            await interaction.reply('you dont have perms to use this command :c');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /kill; pass: ${pass}`);
    },
};