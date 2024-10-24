const { SlashCommandBuilder } = require('discord.js');
const {admins} = require('../../config.json');
const {parseJSON} = require('../../handyman');
const fs = require('node:fs')

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('vieweconomy')
        .setDescription('view Economy JSON'),
    async execute(interaction) {
        if(admins.includes(interaction.user.id)) {
            let economy = await parseJSON('economy.json');
            economy[interaction.user.id].stats.commandsExecuted++;
            await fs.writeFile('../../economy.json', JSON.parse(economy), err => {if (err) throw err;});
            interaction.reply({content: `\`\`\`json\n${JSON.stringify(economy)}\n\`\`\``, ephemeral: true});
        } else {
            interaction.reply('you don\'t have perms to use this command :c');
        }
    },
};