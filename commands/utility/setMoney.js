const { SlashCommandBuilder } = require('discord.js');
const { admins } = require('../../config.json');
const fs = require('node:fs');
let economy;
fs.readFile('economy.json', 'utf-8', function (err, data) {
    if (err) throw err;
    economy = JSON.parse(data);
});

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('setmoney')
        .setDescription('set the money of a member to a certain variable.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('the user id of the target')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('moneyamount')
                .setDescription('The amount of money you want to set')
                .setRequired(true)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const moneyAmount = interaction.options.getNumber('moneyamount');

        if (admins.includes(interaction.user.id)) {
            if (target.id in economy) {
                economy[target.id].money = moneyAmount;
                fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});
                await interaction.reply(`Set ${target}'s money to ${moneyAmount}!`);
            } else {
                await interaction.reply(`${target} does not have an account`);
            }
        } else {
            await interaction.reply('you do not have perms to use this command :c');
        }
    },
};