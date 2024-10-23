const { SlashCommandBuilder } = require('discord.js');
const {parseJSON} = require('../../handyman');
const fs = require('fs');

module.exports = {
    cooldown: 3600,
    data: new SlashCommandBuilder()
        .setName('earnmoney')
        .setDescription('generates a certain amount of money depending on your level'),
    async execute(interaction) {
        let economy = await parseJSON('economy.json');
        let uuid = interaction.user.id;
        let leveledUp = false;
        let rewards = {
            "1": [5, 5],
            "2": [7, 10],
            "3": [10, 15],
        }; 
        if (await compareVersions(economy[uuid]) != 0){ economy[uuid] = await compareVersions(economy[uuid]); await fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});}
        if (uuid in economy) {
            economy[uuid].money += rewards[economy[uuid].level][0];
            economy[uuid].xp += rewards[economy[uuid].level][1];

            if (economy[uuid].xp >= (economy[uuid].level * 100)) {
                economy[uuid].xp -= (economy[uuid].level *100);
                economy[uuid].level++;
                leveledUp = true;
            }
            await interaction.reply((leveledUp) ? `you earned **${rewards[economy[uuid].level - 1][0]}** money and gained **${rewards[economy[uuid].level - 1][1]}** XP, which leveled you up to level **${economy[uuid].level}**!` : `you earned **${rewards[economy[uuid].level][0]}** money and gained **${rewards[economy[uuid].level][1]}** XP!`);
            await fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});
        } else {
            interaction.replt('You need an account to earn money! type /register to register your account!')
        }
    },
};