const { SlashCommandBuilder } = require('discord.js');
const {parseJSON, compareVersions, updatePlayerStats} = require('../../handyman');
const fs = require('fs');

module.exports = {
    cooldown: 3600,
    data: new SlashCommandBuilder()
        .setName('earnmoney')
        .setDescription('generates a certain amount of money depending on your level'),
    async execute(interaction) {
        let pass = false;
        let economy = await parseJSON('economy.json');
        let uuid = interaction.user.id;
        let leveledUp = false;
        let rewards = {
            "1": [20, 25],
            "2": [25, 30],
            "3": [35, 35],
        }; 
        if (uuid in economy) {
            if (await compareVersions(economy[uuid]) != 0){ economy[uuid] = await compareVersions(economy[uuid]); await fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});}
            economy[uuid].money += rewards[economy[uuid].level][0];
            economy[uuid].xp += rewards[economy[uuid].level][1];

            if (economy[uuid].xp >= (economy[uuid].level * 100)) {
                economy[uuid].xp -= (economy[uuid].level *100);
                economy[uuid].level++;
                leveledUp = true;
            }
            await interaction.reply((leveledUp) ? `you earned **${rewards[economy[uuid].level - 1][0]}** money and gained **${rewards[economy[uuid].level - 1][1]}** XP, which leveled you up to level **${economy[uuid].level}**!` : `you earned **${rewards[economy[uuid].level][0]}** money and gained **${rewards[economy[uuid].level][1]}** XP!`);
            await updatePlayerStats(economy[uuid]);
            economy[uuid].stats.commandsExecuted++;
            await fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});
            pass = true;
        } else {
            interaction.reply('You need an account to earn money! type /register to register your account!');
        }
        console.log(`${interaction.user.username} (${interaction.user.id}) used command /balance; pass: ${pass}`);
    },
};