const { SlashCommandBuilder } = require('discord.js');
const { admins } = require('../../config.json');
const fs = require('node:fs');
const {parseJSON, updatePlayerStats} = require('../../handyman');

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
        let economy = await parseJSON('economy.json');
        let pass = false;
        const target = interaction.options.getUser('target');
        const moneyAmount = interaction.options.getNumber('moneyamount');

        if (admins.includes(interaction.user.id)) {
            if (target.id in economy) {
                economy[target.id].money = moneyAmount;
                await updatePlayerStats(economy[target.id]);
                economy[interaction.user.id].stats.commandsExecuted++;
                await fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});
                await interaction.reply(`Set ${target}'s money to ${moneyAmount}!`);
                pass = true;
            } else {
                await interaction.reply(`${target} does not have an account`);
            }
        } else {
            await interaction.reply('you do not have perms to use this command :c');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /setmoney ${target.username} \(${target.id}\) ${moneyAmount}; pass: ${pass}`);
    },
};