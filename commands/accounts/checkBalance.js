const { SlashCommandBuilder } = require('discord.js');
const { admins } = require('../../config.json');
const { parseJSON, compareVersions } = require('../../handyman');
const fs = require('node:fs');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('checks account balance')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the name of the user')
        ),
    async execute(interaction) {
        const economy = await parseJSON('economy.json');
        let pass = false;
        const uuid = interaction.user.id;
        const user = interaction.options.getUser('user');
        if (user === null || user.id === interaction.user.id) {
            if (uuid in economy) {
                if (await compareVersions(economy[uuid]) != 0){ economy[uuid] = await compareVersions(economy[uuid]); await fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});}
                await interaction.reply(`You have ${economy[uuid].money} money!`);
                pass = true;
            } else {
                await interaction.reply("You don't have an account yet! Type /register to register an account.");
            }
        } else {
            if (economy[user.id]?.publicBalanceVisibility === true || admins.includes(user.id)) {
                if (user.id in economy) {
                    if (await compareVersions(economy[user.id])!= 0) { economy[user.id] = await compareVersions(economy[user.id]); await fs.writeFile('economy.json', JSON.stringify(economy), err => {if (err) throw err;});}
                    await interaction.reply(`${user} has ${economy[user.id].money} money!`);
                    pass = true;
                } else {
                    await interaction.reply(`${user} does not have an account!`);
                }
            } else {
                if (compareVersions(economy[user.id])!= 0) { economy[user.id] = compareVersions(economy[user.id]); await fs.writeFile('economy.json', JSON.stringify(economy), err => {if (err) throw err;});}
                await interaction.reply(`${user} does not allow others to view their account balance!`);
            }
        }
        console.log(`${interaction.user.username} (${interaction.user.id}) used command /balance; pass: ${pass}`);
    }
};
