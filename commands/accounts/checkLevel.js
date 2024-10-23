const {SlashCommandBuilder} = require('discord.js');
const {parseJSON} = require('../../handyman');
const fs = require('node:fs');


module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('checks Level and XP')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the name of the user')
        ),
    async execute(interaction) {
        let economy = await parseJSON('economy.json');
        let pass = false;
        const uuid = interaction.user.id;
        const user = interaction.options.getUser('user');
        if (user == undefined || user.id == interaction.user.id) {
            if(uuid in economy) {
                await interaction.reply(`you are level **${economy[uuid].level}** and you have **${economy[uuid].xp}**XP (**${economy[uuid].xp}**/**${economy[uuid].level * 100}**XP for level **${economy[uuid].level + 1}**)`);
                pass = true;
            } else {
                await interaction.reply('You don\'t have an account yet! type /register to register an account!');
            }
        } else {
            if (user.id in economy) {
                await interaction.reply(`**${user}** is level **${economy[user.id].level}** and they have **${economy[user.id].xp}**XP (**${economy[user.id].xp}**/**${economy[user.id].level * 100}**XP for level **${economy[user.id].level + 1}**)`);
                pass = true;
            } else {
                await interaction.reply(`${user} does not have an account!`);
            }
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /level; pass: ${pass}`);
    }
}